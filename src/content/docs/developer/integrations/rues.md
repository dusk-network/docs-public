---
title: RUES
description: Dusk's node event system explained.
---

The <a href="https://github.com/dusk-network/rusk/wiki/RUES-%28Rusk-Universal-Event-System%29" target="_blank">**Rusk Universal Event System (RUES)**</a> is an integral part of the architecture of Dusk, providing a powerful mechanism for handling real-time communication with an event-driven approach.

RUES is designed to handle binary proofs, binary streams, and on-demand event-driven data, making it ideal for applications that need to process binary proofs or continuous binary data streams.
It also enables on-demand data dispatching and real-time notifications, supporting applications like wallet operations that require high-performance binary data handling.
This is achieved by avoiding the need to convert data to JSON or base64.

## Session Management

Before interacting with RUES, clients must establish a WebSocket session with a Rusk node. This session forms the backbone of real-time event streaming between the client and the node.

### Session Initialization

To start a session, initiate a WebSocket connection to the node. Upon connection, the server responds with a `Rusk-Session-Id`, a 16 byte random nonce that is essential for event subscriptions and dispatches.

```
wss://[node-address]
```

### Session Persistence 

Ensure that your WebSocket connection remains open for as long as you require real-time event streaming. In a load-balanced environment, consistent routing is required to maintain session persistence.

### Session Termination

Sessions can be terminated by either the client or the server. When the WebSocket connection is closed, all event subscriptions are automatically canceled.

## Event Identification

Every event in RUES is identified by a unique URL structure, which allows for fine-grained interaction with blockchain components.

### Event URL Structure

```
/on/[target]/[topic]
```

- **target**: The blockchain component (e.g., `contracts`, `transactions`, `blocks`, `node`, `graphql`).
- **topic**: The event type (e.g., `accepted`, `statechange`, `propagate`).

**Example URLs**:
- **General Event**: `/on/contracts/deploy`
- **Specific Event**: `/on/contracts:contract_id/[topic]`

In more granular cases, the `target` can represent specific elements within components. For example:

```
/on/transactions:transaction_id/included
/on/blocks:block_hash/accepted
```

## Event Subscriptions

RUES enables clients to subscribe to specific events on a node. Subscriptions use the HTTP `GET` method and require the `Rusk-Session-Id` for authentication.

### Subscribe

#### Request

```
GET https://[node-address]/on/[target]/[topic]
```

#### Example

```
GET https://nodes.dusk.network/on/contracts:efda355bc94a3be09006dc90f3714a0ee22c586c5e577e429ef3b5e3e464a8da/item-added
```

#### Headers

| Name              | Description                           |
| ----------------- | ------------------------------------- |
| `Rusk-Version`    | Specifies the compatible Rusk version |
| `Rusk-Session-Id` | Identifies the current session        |

#### Response Codes

| Status code             | When                                  |
| ----------------------- | ------------------------------------- |
| `200 OK`                | Successful subscription               |
| `400 Bad Request`       | `Rusk-Version` incompatibility        |
| `424 Failed Dependency` | `Rusk-Session-Id` issues              |
| `404 Not Found`         | `[component]` or `[target]` not found |

### Unsubscribe

To unsubscribe from an event, use the HTTP `DELETE` method.

#### Request

```
DELETE https://[node-address]/on/[target]/[topic]
```

#### Example 

```
DELETE https://nodes.dusk.network/on/contracts:efda355bc94a3be09006dc90f3714a0ee22c586c5e577e429ef3b5e3e464a8da/item-removed
```

#### Headers

| Name              | Description                           |
| ----------------- | ------------------------------------- |
| `Rusk-Version`    | Specifies the compatible Rusk version |
| `Rusk-Session-Id` | Identifies the current session        |

#### Response Codes

| Status code             | When                                             |
| ----------------------- | ------------------------------------------------ |
| `200 OK`                | Successful unsubscription                        |
| `400 Bad Request`       | `Rusk-Version` incompatibility                   |
| `424 Failed Dependency` | `Rusk-Session-Id` issues                         |
| `404 Not Found`         | `[component]`, `[target]` or `[topic]` not found |

## Event Dispatch

Dispatching events allows clients to send specific data to the node and request data. The `POST` method is used for this purpose, often including a request body with the event payload.

### Dispatch

#### Request

```
POST https://[node-address]/on/[target]/[topic]
```

#### Example

```
POST https://nodes.dusk.network/on/contracts:efda355bc94a3be09006dc90f3714a0ee22c586c5e577e429ef3b5e3e464a8da/sync
```

#### Headers

| Name              | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `Rusk-Version`    | Specifies the compatible Rusk version                       |
| `Rusk-Session-Id` | Identifies the current session                              |
| `Content-Type`    | Usually `application/json` or `application/octet-stream`    |
| `Content-Length`  | The length of the message body in octets (8-bit bytes)    |
| `Accept`          | Media type(s) that is/are acceptable for a response message |

#### Response Codes

| Status code                 | When                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| `200 OK`                    | Event received succesfully, response generated |
| `202 Accepted`              | Event accepted for processing                                      |
| `400 Bad Request`           | `Rusk-Version` mismatch                                                   |
| `424 Failed Dependency`     | `Rusk-Session-Id` mismatch                                          |
| `404 Not Found`             | `[component]`, `[target]`, or `[topic]` not found          |
| `422 Unprocessable Content` | Payload cannot be processed with the  given `Content-Type`        |

## Event Endpoints

RUES provides access to multiple key blockchain components through event-driven interactions. Below are the primary event categories.

### GraphQL Queries

**Endpoint**: `/on/graphql/query`

Enables GraphQL-style queries against the Dusk blockchain.

**Method**: `POST`

**Example Request**: 

```
POST https://nodes.dusk.network/on/graphql/query
```

**Request Body**:

Example query for requesting the latest block.

```json
{
  "query": "query { block(height: -1) { header { height } } }"
}
```

**Example Response**:

```json
{
    "block": {
        "header": {
            "height": 20241015
        }
    }
}
```

### Node

#### Node Info

**Endpoint**: `/on/node/info`

Retrieves general information about the node.

**Method**: `POST`

**Example Request**: 

```
POST https://nodes.dusk.network/on/node/info
```

**Example Response**:

```json
{
    "bootstrapping_nodes": [
        "173.212.198.91:9000",
        "188.34.201.78:9000",
        "94.72.105.11:9000",
        "64.44.41.61:9000",
        "158.220.83.234:9000"
    ],
    "chain_id": 48,
    "kadcast_address": "127.0.0.1:9000",
    "version": "0.8.0",
    "version_build": "0.8.0 (027b9787 2024-09-14)"
}
```

#### Provisioners

**Endpoint**: `/on/node/provisioners`

Fetches the list of provisioners (validators).

**Method**: `POST`

**Example Request**: 

```
POST https://nodes.dusk.network/on/node/provisioners
```

**Example Response**:

```json
[
    {
        "amount": 0,
        "eligibility": 0,
        "key": "mvft6AXjR1mDtg1Qo3GzGBKZAvvxY1S6h41DSEPh9Ewj9GFR61rPQnjVaM1W9nqkHijRC2d5Yo4FSBwU8wf9eHeEJYXuMSrB7eJxvsY6HjCeDJ9pKfJLdjayAfrxEyudvx2",
        "reward": 943226500000
    },
    {
        "amount": 1000000000000,
        "eligibility": 0,
        "key": "oCqYsUMRqpRn2kSabH52Gt6FQCwH5JXj5MtRdYVtjMSJ73AFvdbPf98p3gz98fQwNy9ZBiDem6m9BivzURKFSKLYWP3N9JahSPZs9PnZ996P18rTGAjQTNFsxtbrKx79yWu",
        "reward": 8485066974496
    }
]
```

#### Common Reference String (CRS)

**Endpoint**: `/on/node/crs`

Retrieves the CRS used by the network.

**Method**: `POST`

**Example Request**: 

```
POST https://nodes.dusk.network/on/node/crs
```

**Example Response**:

```
a9909cd1...580a0000
```

### Blocks

#### Gas Price

This endpoint retrieves the gas price for the latest blocks.

**Endpoint**: `/on/blocks/gas-price`

**Method**: `POST`

**Example Request**:

```bash
POST https://nodes.dusk.network/on/blocks/gas-price
```

**Example Response**:

```json
{
    "average": 1,
    "max": 1,
    "median": 1,
    "min":1
}
```

### Transactions

#### Preverify

#### Propagate

### Contracts

### Network

#### Peers

This endpoint retrieves a list of peers connected to the node, where the given value is the amount of peers to return, if available.

**Endpoint**: `/on/network/peers`

**Method**: `GET`

**Example Request**:

```bash
POST https://nodes.dusk.network/on/network/peers
```

**Request Body**:

```
5
```

**Example Response**:

```bash
[
    "173.212.198.91:9000",
    "188.34.201.78:9000",
    "94.72.105.11:9000",
    "64.44.41.61:9000",
    "158.220.83.234:9000"
]
```

### Prover

#### Prove

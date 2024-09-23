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

## General Endpoints

These are endpoints accessible regardless of the node role. They include queries for general blockchain state and node information.

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

Retrieves general information about the node, like the chain ID of the network the node operates on, its bootstrapping nodes, the Rusk version it uses and its Kadcast IP address.

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

#### Block Events

**Endpoint**: `/on/blocks:[block-hash]/[topic]`, where `[topic]` is optional. Block events can have the topic `accepted`, or `statechange`.

- **accepted**: Indicates that a block has been accepted into the chain.
- **statechange**: Represents a change in the state of a block. The state of a block can be either `finalized` or `confirmed`.

**Method**: `GET`

**Example Request**:

This example request listens to the `accepted` topic for a given block.

```
GET https://nodes.dusk.network/on/blocks:041e52089c69321eee12d6035917fc916e0c32f2457944d28060c95bb3dd231a/accepted
```

**Example Event**:

```json
[
    {
        "event": {
            "target": "blocks:041e52089c69321eee12d6035917fc916e0c32f2457944d28060c95bb3dd231a",
            "topic": "accepted",
            "data": "a7d4f3b300143398de3bb3dbd8bc028c9c3dc3f96ef4232d90f56f50792cc06099d8ac05b26c31b719101434867af30322223d12e05a86423fb2b34624098dea043e30f8c6b8a3ae6e6a34f9307727bef4bbee8f9e14682300a6a5ba0a21180c711ce0dc6fc302522e18e9ad64a18881a2c2cfc636ffbd2c78cfd4d902986e167004ef61290902e259f3a10751742a0506f85a74dcc53877d60249427b3420bed341d11b3f56a61be4262bc87abd55ba651033583772d46147f1d7996cb9da05000000000000000020ea833c03000000000000000000000094d8bbc772a39dee8e2663d11fd067a0a90b68876acc4e316cd5fff2ea4b7cd068cdacd77d1434ba7cf7fb8bf0897f043b86208c6110fdf2996d01e26513d256abb5fd42ae9b91a116b347ef3ca3c4510b85f9e2f038092e39cc0e1d0e9b940f5b001d28ef68e5f68aa9edda93c8d1bbf1e47124b1ecf4825f0c169e0e35c37a5daed454a1375d8eba851df1c851fc0030abeeb9f7efd3150b4f50590ea5788f0f4e68b4c750d0201a9c17354a86f8bc031bfe4b955a698400276be5a2a8ef070000000000000000e0fc5b7600000000030000000000000050feffff02000000"
        }
    }
]
```

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

#### Transaction Events

**Endpoint**: `/on/transactions:[transaction-id]/[topic]`, where `[topic]` is optional. Transaction events can have the topic `Removed`, `Included`, or `Executed`.

- **Removed**: Indicates that the transaction has been removed from the mempool.
- **Included**: A transaction has been included in the mempool.
- **Executed**: A transaction that has been executed in an accepted block.

**Method**: `GET`

**Example Request**:

This example request listens to the `Executed` topic for a given transaction.

```
GET https://nodes.dusk.network/on/transactions:04786a6678b376588bc74868879c6f07db2a19933082173ea4898570a9514709/Executed
```

**Example Event**:

```json
[
    {
        "event": {
            "target": "0100000000000000000000000000000000000000000000000000000000000000",
            "topic": "moonlight",
            "data": "a7d4f3b300143398de3bb3dbd8bc028c9c3dc3f96ef4232d90f56f50792cc06099d8ac05b26c31b719101434867af30322223d12e05a86423fb2b34624098dea043e30f8c6b8a3ae6e6a34f9307727bef4bbee8f9e14682300a6a5ba0a21180c711ce0dc6fc302522e18e9ad64a18881a2c2cfc636ffbd2c78cfd4d902986e167004ef61290902e259f3a10751742a0506f85a74dcc53877d60249427b3420bed341d11b3f56a61be4262bc87abd55ba651033583772d46147f1d7996cb9da05000000000000000020ea833c03000000000000000000000094d8bbc772a39dee8e2663d11fd067a0a90b68876acc4e316cd5fff2ea4b7cd068cdacd77d1434ba7cf7fb8bf0897f043b86208c6110fdf2996d01e26513d256abb5fd42ae9b91a116b347ef3ca3c4510b85f9e2f038092e39cc0e1d0e9b940f5b001d28ef68e5f68aa9edda93c8d1bbf1e47124b1ecf4825f0c169e0e35c37a5daed454a1375d8eba851df1c851fc0030abeeb9f7efd3150b4f50590ea5788f0f4e68b4c750d0201a9c17354a86f8bc031bfe4b955a698400276be5a2a8ef070000000000000000e0fc5b7600000000030000000000000050feffff02000000"
        },
        "origin": "txID01010101"
    }
]
```

#### Preverify

This endpoint pre-verifies a transaction without executing or propagating it. The transaction is checked to ensure it conforms to network rules before being propagated or executed.

**Endpoint**: `/on/transactions/preverify`

**Method**: `POST`

**Example Request**:

```
POST https://nodes.dusk.network/on/transactions/preverify
```

**Request Body**:

The request body should contain the raw binary representation of a transaction.

```
a9909cd1...580a0000
```

**Example Response**:

Upon success, the transaction will be pre-verified, but no specific data is returned unless there is an error.

#### Propagate

This endpoint propagates a transaction across the network.

**Endpoint**: `/on/transactions/propagate`

**Method**: `POST`

**Example Request**:

```
POST https://nodes.dusk.network/on/transactions/propagate
```

**Request Body**:

The request body should contain the raw binary representation of a transaction.

```
a9909cd1...580a0000
```

**Example Response**:

Upon success, the transaction will be propagated across the network. This endpoint returns a response indicating success but no specific data.

### Contracts

#### Contract Events

**Endpoint**: `/on/contracts:[contract-id]/[event-name]`, where `[event-name]` is optional. If the event name is not provided, the connection will listen to all events on the given contract.

**Method**: `GET`

**Example Request**:

This example request listens to `stake` events from the stake contract.

```
GET https://nodes.dusk.network/on/contracts:0200000000000000000000000000000000000000000000000000000000000000/stake
```

**Example Event**: 

```json
[
    {
        "event": {
            "target": "0200000000000000000000000000000000000000000000000000000000000000",
            "topic": "reward",
            "data": "a7d4f3b300143398de3bb3dbd8bc028c9c3dc3f96ef4232d90f56f50792cc06099d8ac05b26c31b719101434867af30322223d12e05a86423fb2b34624098dea043e30f8c6b8a3ae6e6a34f9307727bef4bbee8f9e14682300a6a5ba0a21180c711ce0dc6fc302522e18e9ad64a18881a2c2cfc636ffbd2c78cfd4d902986e167004ef61290902e259f3a10751742a0506f85a74dcc53877d60249427b3420bed341d11b3f56a61be4262bc87abd55ba651033583772d46147f1d7996cb9da05000000000000000020ea833c03000000000000000000000094d8bbc772a39dee8e2663d11fd067a0a90b68876acc4e316cd5fff2ea4b7cd068cdacd77d1434ba7cf7fb8bf0897f043b86208c6110fdf2996d01e26513d256abb5fd42ae9b91a116b347ef3ca3c4510b85f9e2f038092e39cc0e1d0e9b940f5b001d28ef68e5f68aa9edda93c8d1bbf1e47124b1ecf4825f0c169e0e35c37a5daed454a1375d8eba851df1c851fc0030abeeb9f7efd3150b4f50590ea5788f0f4e68b4c750d0201a9c17354a86f8bc031bfe4b955a698400276be5a2a8ef070000000000000000e0fc5b7600000000030000000000000050feffff02000000"
        }
    }
]
```

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

## Archiver Endpoints

These endpoints provide access to historical data and events stored by Archivers.

### Moonlight Transaction History

This endpoint provides access to the Moonlight transaction history stored by archivers in an efficient way. 

Details to be filled in based on implementation.

### Historical Events

This endpoint provides access to other historical events in the blockchain. 

Details to be filled in based on implementation.

## Prover Endpoints

The Provers in the network are responsible for generating Zero-Knowledge proofs. These endpoints offer proof-related functionality.

### Prove

This endpoint triggers the prover to generate a Zero-Knowledge proof for the provided data.

**Endpoint**: `/on/prover/prove`

**Method**: `POST`

**Example Request**:

```
POST https://nodes.dusk.network/on/prover/prove
```

**Request Body**:

The request body should contain raw binary data 

```
a9909cd1...580a0000
```

**Example Response**:

Upon success, the prover will return the generated proof, likely as raw binary data.

```
a9909cd1...580a0000
```

---
title: RFP-01
description: Learn about Dusk’s archive node RFP, designed to enhance historical data access on Dusk.
---

# Archive Nodes APIs Infrastructure

**Status:** Open

**Category:** Infrastructure

**Date Created:** 03/06/2024

## Project Overview

Archive nodes are nodes responsible for maintaining a comprehensive record of all transactions, blocks, and events ever recorded on the blockchain, from the genesis block. Archive nodes are a critical piece of infrastructure because they provide access to extensive historical data. Applications can query these nodes for detailed historical information, enabling complex analyses and queries.

In Dusk, archive nodes are available under a feature flag. This means that when setting up a node on Dusk, users can configure their node as an archive node. This configuration allows the node to record and store all events witnessed on the Dusk blockchain in a database.

Unlike other types of nodes, archive nodes in Dusk are not involved in the consensus mechanism as they do not participate in block generation. Additionally, they do not perform any zero-knowledge computations or create proofs.

Instead, archive nodes listen to all events emitted in Dusk and store them in a database, enabling efficient indexing and retrieval. 

These events include:

- Events emitted on the Dusk blockchain (e.g. transactions)
- <a href="https://github.com/dusk-network/rusk/wiki/RUES-(Rusk-Universal-Event-System)" target="_blank">RUES</a> events (e.g. events emitted by a contract). 

Archive nodes serve as a reliable source for historical data, as they are the only type of nodes that not only listen and broadcast events, but also store them. 

Applications can also verify the legitimacy of stored events by hashing them and comparing the results against a block hash, ensuring data integrity and accuracy.

There is currently no simple way to access the data stored by archive nodes. The scope for this RFP is to leverage the existing APIs and expand on them to make data easily consumable. The project should provide comprehensive APIs that improve the accessibility and usability of the data stored in Dusk archive nodes, enabling clients to perform detailed and efficient queries.

## Scope of Work

Since Dusk's archive nodes already incorporate the logic for storing events, this RFP requests leveraging that existing logic by adding extensive API infrastructure.
The solution should be compatible with the different networks provided by Dusk (e.g., mainnet, testnet, devnet…), and comprehensive documentation is expected.
Dusk invites grant applicants to submit proposals providing the following elements:

##### Extensive APIs

Expand on and develop comprehensive APIs, to enable clients to access events stored by archive nodes. This should include both <a href="https://github.com/dusk-network/rusk/tree/4b37ab5c1f6c0635c549c932270d01090e183217/rusk/src/lib/http/chain/graphql" target="_blank">GraphQL</a> and <a href="https://github.com/dusk-network/rusk/wiki/RUES-(Rusk-Universal-Event-System)l" target="_blank">RUES</a> entrypoints, providing flexible querying options for specific events, transactions, and contracts' state.

To provide precise data retrieval, the <a href="https://github.com/dusk-network/rusk/blob/4b37ab5c1f6c0635c549c932270d01090e183217/rusk/src/lib/http/chain/graphql/data.rs" target="_blank">GraphQL schema</a> needs to allow queries by relevant attributes (e.g. event type, timestamp, emitter...). More specifically, the APIs should enable querying of all historical data stored by archive nodes at any block height, including both events recorded on the blockchain and events emitted by smart contracts. These APIs need to allow the GraphQL server to act as an intermediary between clients and the archive nodes' database, so that when a query is received, the server processes it, fetches the necessary data from the archive nodes and serves it.

To facilitate these APIs it is necessary to store additional data in local storage. An example of this would be including a get_failed_txn_count function in <a href="https://github.com/dusk-network/dusk-blockchain/tree/7031c8eb1efb77003c316ca25dd49a42325dd011/pkg/gql" target="_blank">gql</a>, which may require adding a counter in RocksDB/SQLite to track this metric and support the API.

##### Failover Support and Load Balancing

Failover support procedures and load balancing network requests should be implemented, to ensure that the least overloaded archive nodes handle data provision. This can be achieved by an API gateway between the client and the archive Nodes (servers). 

An API rate limiter middleware should be integrated into the current HTTP server to mitigate DoS attacks.

##### Real-Time Updates

Real-time data access should be available through GraphQL subscriptions, allowing clients to receive immediate notifications of new events as they are recorded by the archive nodes. These notifications should be delivered via RUES by using existing websockets.

##### Event Recording and Storage Limits

Archive nodes should have the ability to define limits on the types or volumes of events to be stored, to manage storage requirements and avoid the necessity of storing all events since the genesis block. 

On-disk data compression supported by RocksDB, such as Snappy and LZ4, should be enabled.

## Envisioned Timelines

8 weeks

## Proposal Submission

Please submit applications through the Thesan grants form.

## Resources

Relevant repositories can be found here:

- https://github.com/dusk-network/rusk/tree/4b37ab5c1f6c0635c549c932270d01090e183217/rusk/src/lib/http/
- https://github.com/dusk-network/rusk/tree/4b37ab5c1f6c0635c549c932270d01090e183217/rusk/src/lib/http/chain/graphql
- https://github.com/dusk-network/rusk/wiki/RUES-(Rusk-Universal-Event-System)
- https://github.com/dusk-network/node-installer

## Additional Information

##### Vendor Qualifications

Dusk seeks applicants with the necessary experience and expertise to ensure successful implementation of the proposed solutions. 

For this reason, Dusk will mainly consider applicants that have provable experience/knowledge in developing and deploying GraphQL and REST APIs in the context of blockchain technology. Applicants should rely on strong programming skills and expertise in database management. Competence in implementing failover support and load balancing mechanisms is a plus.

###### Evaluation Criteria

We evaluate all applications in a fair and unbiased manner. All proposals will be considered in the light of standard factors including, but not limited to:
- Project approach
- Cost
- Timeline
- Technical expertise of the individual/team
- Reputation of the individual/team

##### Confidentiality

All proposals will be treated as confidential.

##### Open Source

Code should be provided with the necessary licenses for open-source use (e.g. Apache 2.0, MPL, MIT).

## How to apply

Fill out the [Thesan application form](https://qfisyyuui1g.typeform.com/to/uAucnWFJ) by taking your your time to answer all the relevant questions in detail. Please make sure to follow the general and <a href="http://docs.dusk.network/grants/#selection-process" target="_blank">requirements and guidelines</a>.

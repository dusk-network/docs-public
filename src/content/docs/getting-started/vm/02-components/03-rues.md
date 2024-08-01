---
title: RUES
---

# Rusk Universal Events System (RUES)

The <a href="https://github.com/dusk-network/rusk/wiki/RUES-%28Rusk-Universal-Event-System%29" target="_blank">Rusk Universal Event System (RUES)</a> is an integral part of the architecture of Dusk, providing a powerful mechanism for handling real-time communication with an event-driven approach.

RUES is designed to handle binary proofs, binary streams, and on-demand event-driven data, making it ideal for applications that need to process binary proofs or continuous binary data streams.
It also enables on-demand data dispatching and real-time notifications, supporting applications like wallet operations that require high-performance binary data handling.
This is achieved by avoiding the need to convert data to JSON or base64.

## Use of RUES

RUES is deeply integrated into Dusk’s architecture, playing a critical role in various components.

##### Smart Contracts

Contracts in Dusk can emit arbitrary events following a state change, heavily depending on transaction execution. This capability allows contracts to trigger events based on their internal logic and interactions, facilitating complex workflows and state management.

##### Consensus Mechanism

The consensus layer can emit events associated with failed iterations, particularly when transactions are not executed. This functionality helps in diagnosing and responding to consensus-related issues, providing insights and triggers for corrective actions.

##### Mempool Management

The mempool, which temporarily holds transactions before they are included in a block, can emit events after certain conditions are met, such as transaction expiration or reaching a memory/space threshold. These events help manage the mempool’s state and ensure efficient transaction processing.

##### Interoperability

Exogenous events from another chain can trigger endogenous events within Dusk. These events can lead to the creation of new transactions by clients or a set of validators, facilitating seamless cross-chain operations and data exchange.

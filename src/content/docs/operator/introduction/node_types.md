---
title: Types of Nodes
description: Learn about the different configurations available for running a node on Dusk.
---

[Rusk](https://github.com/dusk-network/rusk) is the repository where the software of the Dusk node is maintained. A Dusk node can take many different roles, from being a Provisioner and participating in consensus, to proving transactions, to storing historical data. The node is designed to be efficient, decentralized, and able to run on a wide-variety of hardware and platforms. Dusk nodes can assume different roles by compiling Rusk with different features enabled or disabled.

## Types of Nodes

Dusk supports several types of node configurations. Of the three node types, only Provisioners are directly incentivized by the protocol through staking rewards. Provers and Archivers contribute critical services to the network, but rely on external agreements or use-case driven services like providing ZK-proof generation (for Provers) or historical data and API access (for Archivers).

- **Provisioner**: Provisioners are the only node type that requires staking and participates in the consensus process, earning staking rewards. Provisioners play a vital role as they are responsible for validating transactions, as well as processing and appending new blocks to Dusk blockchain.
- **Prover**: Provers carry on the computation-heavy task of creating Zero-Knowledge proofs (ZKP), which are a requirement for privacy-preserving transactions on Dusk and for certain ZK-powered applications.
- **Archiver**: While Provisioners generally only keep the current state of the blockchain, Archivers instead maintain the full history of the blockchain accessible to applications, users, researchers and auditors. By maintaing and serving this data, Archivers can provide value to services and dApps that require long-term historical access. They normally don't actively engage in consensus related tasks and do not require a stake.

---
title: Getting Started
description: This resource outlines the hardware and software requirements for the node. Explore the different node types and different ways to setup a node.
---

A Dusk node can take many different [roles](#types-of-nodes), from being a Provisioner and participating in consensus, to proving transactions, to storing historical data. The node is designed to be efficient, decentralized, and able to run on a wide-variety of hardware and platforms. 

:::tip[What is Rusk]
Rusk is the [repository where the software of the Node is maintained](https://github.com/dusk-network/rusk). Dusk nodes can assume different roles by compiling Rusk with different features enabled or disabled.
:::

## Types of Nodes

Dusk supports several types of node configurations, depending on the preference of the users and their intended setup. 

- **Provisioner**: Provisioners are specialized in directly participating in the consensus. They play a vital role as they are responsible for validating transactions, as well as processing and appending new blocks to Dusk blockchain.
- **Prover**: Provers carry on the computation-heavy task of creating Zero-Knowledge proofs (ZKP), which are a requirement for transactions on Dusk.
- **Full Node**: A full node combines the capabilities of a provisioner node and prover node. 
- **Archiver**: While Provisioners and full nodes generally only keep the current state of the blockchain, Archivers instead maintain a complete copy of the blockchain. They normally don't actively engage in consensus related tasks and do not require a valid Stake.

:::tip[Recommended Setup]
The recommended setup for network participants is to run a Provisioner node on a VPS or server, and a Prover locally on their machine/laptop. This ensures the most efficient configuration where the full resources of your machine is at disposal to the consensus, while maximizing privacy.
:::

## DUSK Requirement

To run a Dusk provisioner, at least **1000 DUSK** must be staked.

### Why stake?

Dusk uses a *pure proof-of-stake* algorithm to provide sybil-resistance and as such it is a cornerstone of Dusk's security and consensus mechanism. By staking DUSK, participants actively contribute to the network's integrity. 

Stakers have the right to participate in the [Succinct Attestation](../../learn/economic-information/succinct-attestation) and accrue rewards for generating blocks and participating in block validation activities. These rewards are an incentive for creating blocks and voting, and compensate users for locking their assets while their node performs such operations.

## Software 

We recommend using a stable operating system with long-term support, such as [Ubuntu 22.04](https://releases.ubuntu.com/jammy/) or [Debian Bookworm](https://www.debian.org/releases/bookworm/). 

## Hardware

The node software has been tested on x86-64/AMD64 and ARM architectures.

### Provisioner Specifications

These specifications are set to comfortably accommodate provisioner and full nodes, with limited proving capabilities.

For increased network throughput, the node benefits from highly performant single-threaded performance.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 2 cores; 2 GHz | 4 GB | 50 GB | 10 Mbps |

### Prover Specifications

Prover requirements are dependant on the amount of workers a server can run in parallel. Single-threaded performance is key to generate proofs as quickly as possible. 

**Minimum**

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 4 cores; +2 GHz | 8 GB | 20 GB | 20 Mbps |

**Per Worker**

The specifications listed below are per worker.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 1 core; +2 GHz | 1 GB | 2 GB | 5 Mbps |

### Archiver Specifications

Archivers store and provide access to historical data. As such, they benefit from the capability to process multiple concurrent data requests, fast internet connectivity, and enough storage. The following specs are a reference point for archivers. For an archiver, the beefier the configuration, the higher the amount of concurrent requests they can handle.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 8 cores; 2 GHz | 16 GB | 250 GB | 100 Mbps |

## Networking

Dusk makes use of the ultra-efficient P2P network protocol [Kadcast](https://eprint.iacr.org/2019/876.pdf). As such, the internet service requirements are relatively low, but they should be symmetrical and stable, with low latency.

### Port Forwarding

For the node to be accessible to the outside world, a number of ports need to be open to allow for inbound and outbound messages.

- **9000/udp**: Required for Kadcast consensus messages.
- **8080/tcp**: Optional HTTPS API for querying the node.

:::note[Note]
The ports are configurable either as option to the node binary or by setting them in the configuration files.
:::

## Server Security

Maintaining a secure and stable node is paramount for the proper functioning of Dusk. We advise using a firewall, locking down unused APIs, performing regular updates and using a static IP for an uninterrupted service.

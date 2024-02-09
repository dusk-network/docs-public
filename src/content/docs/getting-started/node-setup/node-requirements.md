---
title: Node Requirements
description: This resource outlines the hardware and software requirements for the node
---

The Dusk node is the software that downloads and verifies every block and transaction. 

The node is designed to be efficient and decentralized, able to run on consumer hardware. 

A Dusk node can take many different roles, from being a provisioner and participating in consensus, to proving transactions, to being a historical data node.

# DUSK Requirement

To run a Dusk provisioner, at least 1000 DUSK must be staked. A user will need the 1000 DUSK and enough DUSK to execute the stake transaction.

## Why stake?

Staking is a cornerstone of Dusk's security and consensus mechanism. By staking DUSK, participants actively contribute to the network's integrity. 

In return, stakers receive rewards proportional to their stake, as an incentive for their contribution (creating blocks and voting) and to compensate for locking their assets.

# Software 

We recommend using a stable operating system with long-term support, such as [Ubuntu 22.04](https://releases.ubuntu.com/jammy/) or [Debian Bookworm](https://www.debian.org/releases/bookworm/).

# Hardware

The node software has been tested on x86-64/AMD64 and ARM architectures.

## Provisioner Node Specifications

These specifications are set to comfortably accommodate provisioner and full nodes, with limited proving capabilities.

For increased network throughput, the node benefits from highly performant single-threaded performance.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 2 cores; 2 GHz | 4 GB | 50 GB | 10 Mbps |

## Prover Node Specifications

Prover node requirements are dependant on the amount of workers a server can run in parallel. Single-threaded performance is key to generate proofs as quickly as possible. 

**Minimum**

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 4 cores; +2 GHz | 8 GB | 20 GB | 20 Mbps |

**Per Worker**

The specifications listed below are per worker.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 1 core; +2 GHz | 1 GB | 2 GB | 5 Mbps |

## Archiver Node Specifications

Archiver nodes store and provide access to historical data. As such, they benefit from the capability to process multiple concurrent data requests, fast internet connectivity, and enough storage. The following specs are a reference point for archiver nodes. For an archiver, the beefier the configuration, the more concurrent requests they can handle.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 8 cores; 2 GHz | 16 GB | 250 GB | 100 Mbps |

# Networking

Dusk makes use of the ultra-efficient P2P protocol [Kadcast](https://eprint.iacr.org/2019/876.pdf).  As such, the internet service requirements are relatively low, but they should be symmetrical and stable, with low latency.

## Port Forwarding

For the node to be accessible to the outside world, a number of ports need to be open to allow for inbound and outbound messages.

- **9000/udp**: Required for Kadcast consensus messages.
- **8080/tcp**: Optional HTTPS API for querying the node.

:::note[Note]
The ports are settable either by passing them as an option to the node binary or by setting them in the configuration files.
:::

# Server Security

Maintaining a secure and stable node is paramount for the proper functioning of Dusk. We advise following best practices for system security and network configuration, including using a firewall, locking down unused APIs, performing regular updates and using a static IP for uninterrupted service.
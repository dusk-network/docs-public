---
title: Requirements
description: Learn about hardware and software requirements for running a node.
---


## Software 

We recommend using a stable operating system with long-term support, such as [Ubuntu 22.04](https://releases.ubuntu.com/jammy/) or [Debian Bookworm](https://www.debian.org/releases/bookworm/). 

## Hardware

The node software has been tested on x86-64/AMD64 and ARM architectures.

### Provisioner Specifications

These specifications are set to comfortably accommodate provisioner nodes, with limited proving capabilities.

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



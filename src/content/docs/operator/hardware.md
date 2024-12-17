---
title: Hardware Requirements
description: Learn about the hardware requirements for each Dusk node.
---

## Provisioner Specifications

The following specifications support Provisioner nodes with limited proving capacity. It is always recommended to have at least 2 cores available.

| CPU            | RAM  | Storage | Network Connection |
| :------------- | :--- | :------ | :----------------- |
| 2 cores; 2 GHz | 4 GB | 50 GB   | 10 Mbps            |

## Archive Node Specifications

Archive nodes store and serve historical data and require large storage capacity, efficient processing for concurrent requests, and fast Internet connectivity. The following recommended specifications serve as a baseline for Archive Nodes. Over time, storage requirements will increase.

| CPU            | RAM  | Storage | Network Connection |
| :------------- | :--- | :------ | :----------------- |
| 4 cores; 2 GHz | 8 GB | 500 GB  | 100 Mbps           |

## Prover Specifications

The performance of a Prover largely depends on the number of workers that the server can manage simultaneously. Since generating ZK proofs is a single-threaded process, having strong single-core performance is vital to complete proofs efficiently and reduce transaction finalization time.

**Minimum**

| CPU             | RAM  | Storage | Network Connection |
| :-------------- | :--- | :------ | :----------------- |
| 4 cores; +2 GHz | 8 GB | 20 GB   | 20 Mbps            |

**Per Worker**

The specifications listed below are per worker.

| CPU            | RAM  | Storage | Network Connection |
| :------------- | :--- | :------ | :----------------- |
| 1 core; +2 GHz | 1 GB | 2 GB    | 5 Mbps             |

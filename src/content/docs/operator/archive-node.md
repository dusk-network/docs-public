---
title: Archive nodes
description: Learn about Dusk archive nodes that store and give access to Dusk’s historical data.
---

Archive nodes extend the functionality of [Provisioners](/operator/provisioner) by also preserving a complete historical record of the Dusk blockchain. While Provisioners are focused solely on the current state, archive nodes provide essential long-term data access that supports applications, users, researchers, and auditors who need comprehensive historical information.

Archive nodes play a unique role in the Dusk Network by focusing on data storage and accessibility, rather than participating in consensus. This means they are not required to stake DUSK, as they serve an entirely supportive function for dApps and services that rely on historical records.

In short, archive nodes:
- Provide additional historical data (such as events emitted by contracts) that is not stored by a Provisioner node
- Can participate in consensus, by staking DUSK. However, they are not required to.

:::tip[Run an Archive node]
If you want to quickly launch & run an archive node, you can use the <a href="https://github.com/dusk-network/node-installer" target="_blank">node installer</a> by following [the archive guide](/operator/guides/archive-node).
:::

## Archive Node Specifications

Archive nodes store and serve historical data and require large storage capacity, efficient processing for concurrent requests, and fast Internet connectivity. The following recommended specifications serve as a baseline for Archive Nodes. Over time, storage requirements will increase.

| CPU            | RAM  | Storage | Network Connection |
| :------------- | :--- | :------ | :----------------- |
| 4 cores; 2 GHz | 8 GB | 500 GB  | 100 Mbps           |

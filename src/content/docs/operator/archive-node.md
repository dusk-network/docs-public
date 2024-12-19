---
title: Run an archive node
description: Learn how to set up a Dusk archive node to store and give access to Dusk’s historical data.
---

Archive nodes extend the functionality of [Provisioners](/operator/provisioner) by also preserving a complete historical record of the Dusk blockchain. While Provisioners are focused solely on the current state, archive nodes provide essential long-term data access that supports applications, users, researchers, and auditors who need comprehensive historical information.

Archive nodes play a unique role in the Dusk Network by focusing on data storage and accessibility, rather than participating in consensus. This means they are not required to stake DUSK, as they serve an entirely supportive function for dApps and services that rely on historical records.

In short, archive nodes:
- Provide additional historical data (such as events emitted by contracts) that is not stored by a Provisioner node
- Can participate in consensus, by staking DUSK. However, they are not required to.

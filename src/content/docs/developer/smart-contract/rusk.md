---
title: Rusk
description: What is Rusk?
---

<a href="https://github.com/dusk-network/rusk" target="_blank">Rusk</a> is the official Dusk protocol node client and smart contract platform.

The`rusk-abi` crate has the following two features: 
-`abi`: to create contracts that are compliant with the ABI (used by smart contracts developers)
-`host`: to create binaries that run contracts compliant to the ABI (used by host functions developers).

These features are mutually exclusive since each of them needs to implement the same functions in very different ways. 

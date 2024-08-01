---
title: Slashing
description: Learn about slashing conditions and their gravity
---

Slashing is a mechanism used in consensus mechanisms using Proof-of-Stake (PoS), to penalize validators (provisioners) that engage in malicious or dangerous behavior. The primary purpose of slashing is to maintain the security and integrity of the network by disincentivizing harmful actions and ensuring that participants adhere to the protocol's rules.

Slashing penalties can be categorized into two main types, depending on the severity of the violation: hard slashing and soft slashing.

## Hard slashing

Hard slashing is applied for serious violations that can significantly undermine the security or stability of the network. Here are some of the scenarios that qualify for hard slashing:

- Block Generators sending around multiple different candidates
- Block Generators sending around a candidate with invalid transactions
- Block Generators missing the slots to propagate a candidate block multiple times in a row
- Provisioners casting different votes for the same round or iteration
- Provisioners casting votes for lower priority blocks after having voted for higher priority one in the same round

## Soft slash cases

Soft slashes are applied for less severe violations that still negatively impact the network but have minor consequences. For this reason, the penalties for soft slashes are typically smaller. A scenario that qualifies for a soft slashing is:

- Block Generator occasionally missing his slot

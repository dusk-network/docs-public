---
title: Slashing
description: Learn about slashing conditions and their gravity
---

Slashing is a mechanism used in consensus mechanisms using Proof-of-Stake (PoS), to penalize validators (Provisioners) who engage in malicious or dangerous behavior. The primary purpose of slashing is to maintain the security and integrity of the network by disincentivizing harmful actions and ensuring that participants adhere to the protocol's rules.

Slashing penalties can be categorized into two main types depending on the severity of the violation: hard slashing and soft slashing.

## Hard slashing

Hard slashing is applied for serious violations that can significantly undermine the security or stability of the network. Here are some of the scenarios that qualify for hard slashing:
- Producing a block attested as Invalid;
- Producing two different candidates for the same round/iteration;
- Producing two conflicting votes for a single candidate;

The slashed amounts depend on the specific case:
- **Invalid block**: incremental slashes of 10%, 20%, 60% (of the initial stake), for consecutive invalid blocks;
- **Double candidate/vote**: 25% of the initial stake.

The slashed amount gets burned, and the provisioner is also suspended for an incremental number of epochs (similarly to the soft-slashing mechanism).

## Soft slashing

Soft slashing encourages provisioners to act honestly and efficiently without imposing overly harsh penalties for minor infractions. This mechanism reduces the impact of a provisioner’s stake rather than decreasing the actual stake.

A scenario that qualifies for soft slashing is, for example, a Block Generator occasionally missing his slot.

The type of soft slashing in Dusk includes two primary mechanisms:
- **Suspension**: temporarily disables the eligibility of a misbehaving Provisioner after a certain number of warnings received. Each fault decreases the warning count, and when warnings reach zero the Provisioner’s stake is suspended for one epoch. After this period, the stake becomes eligible again. If the Provisioner produces a block or a vote, the warning count is restored. If another fault occurs, the suspension period increases incrementally (e.g., two epochs for the second fault). This progressive suspension system gives Provisioners a chance to correct their behavior before facing harsher penalties.
- **Penalization**: reduces a portion of the misbehaving Provisioner’s stake, moving the portion to the claimable rewards, to prevent the loss of DUSK. The penalty amount increases with consecutive suspensions, starting at 10% for the first suspension and increasing by an additional 10% for each subsequent suspension. This method incrementally reduces the Provisioner’s weight in the sortition process without entirely forfeiting their stake. If the stake falls below the minimum value (1000 DUSK), it is frozen and must be recovered by un-staking and re-staking.

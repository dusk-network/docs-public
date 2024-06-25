---
title: Circuits
---


Circuits allow for optimized ZK operations on Dusk.

There are 4 circuits that are currently available, each for different permutations of number of input notes, up to a max of 4, which is the maximum number that a user can spend/transfer at once. Nothing stops a user from aggregating these notes by transferring them to himself, which is basically what the wallet does (it aggregates the user’s notes).

This library contains the implementation of the Phoenix-circuits, to prove, in zero-knowledge, that the following conditions hold true:

1. Membership: every note that is about to be spent is included in the Merkle tree of notes.
2. Ownership: the sender holds the note secret key for every note that is about to be spent.
3. Nullification: the nullifier is calculated correctly.
4. Minting: the value commitment for the newly minted notes are computed correctly.
5. Balance integrity: the sum of the values of all spent notes is equal to the sum of the values of all minted notes + the gas fee + a deposit, where a deposit refers to funds being transfered to a contract.
---
title: Circuits
---



Circuits allow for optimized ZK operations on Dusk, and are targeted for specific use-cases:

- Phoenix: to spend notes and pay for gas
- Citadel: to use SSI features
- Zedger: to use the XSC standard

# Phoenix
This library contains the implementation of the Phoenix-circuits, to prove, in zero-knowledge, that the following conditions hold true:

1. Membership: every note that is about to be spent is included in the Merkle tree of notes.
2. Ownership: the sender holds the note secret key for every note that is about to be spent.
3. Nullification: the nullifier is calculated correctly.
4. Minting: the value commitment for the newly minted notes are computed correctly.
5. Balance integrity: the sum of the values of all spent notes is equal to the sum of the values of all minted notes + the gas fee + a deposit, where a deposit refers to funds being transfered to a contract.


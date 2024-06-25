---
title: Transactions on Dusk
---

# Transactions


## Addresses
On Dusk, there is no built-in variable like ```msg.sender``` which identifies the caller of a contract function. The reason of this is that Dusk is a privacy-focused blockchain, and therefore Dusk's main transaction model (Phoenix) is UTXO based. To guarantee full privacy and regulatory compliance, Dusk's main transaction model is design is that by dealing with nodes

On Dusk, what constitutes an "address" must be defined by the developer within the contract's logic. This approach offers developers more control over the privacy and compliance features of their application, but also increases their responsibility to securely identify and authenticate users and transactions.

Even if in theory users could be seen as a collection of unspent notes associated with a key, these notes are not linkable to each other to maintain privacy and security.
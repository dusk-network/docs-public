---
title: Multisig example
---

## Multisig on Phoenix

When dealing with privacy-preserving transaction models like Phoenix, implementing multisig becomes significantly more complex due to the cryptographic requirements involved.

While a multisig requires multiple private keys signing a single transaction, Phoenix handles transactions by using obfuscated notes. This obfuscation ensures high levels of privacy but complicates the process of validating multisig transactions, where multiple parties need to collaborate without revealing their private keys or the transaction details.

Implementing multisig on obfuscated notes requires additional cryptographic techniques such as Multi-Party Computation (MPC). However, MPC is complex and computationally intensive, making it challenging to implement it efficiently. The overhead associated with MPC would make transactions slow and resource-intensive.

## Multisigs on Moonlight

For developers looking to implement a multisig on Dusk, using the [Moonlight](/learn/dusk-protocol/transaction_models/moonlight) transaction model is a more viable solution. Unlike [Phoenix](/learn/dusk-protocol/transaction_models/phoenix), Moonlight does not obfuscate transactions, making multisig implementations straightforward and efficient.

In the Moonlight model, standard multisig techniques can be used. These involve multiple parties signing the same transaction with their private keys, which is then validated by the network.

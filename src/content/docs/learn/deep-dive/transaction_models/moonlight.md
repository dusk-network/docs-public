---
title: Moonlight
description: Learn how the Dusk’s account-based model ensure full transparency.
---

<a href="https://github.com/dusk-network/rusk/blob/a46f5ab5e6e66054decd95003e7ccdfa7ca1dfc0/core/src/transfer.rs#L532" target="_blank">Moonlight</a>, Dusk’s transparent, account-based transaction model, is managed by the [Transfer Contract](/learn/deep-dive/transaction_models/transactions) to provide complete transparency.


Moonlight uses a BTreeMap to efficiently store user accounts, mapping addresses or BLS keys to their respective balances. An example implementation for a transparent token can be found <a href="https://github.com/dusk-network/transparent-token" target="_blank">here</a>.

Moonlight is fully compatible with Phoenix, meaning that users can seamlessly convert between Phoenix notes and Moonlight balances.


# Moonlight in the Transfer Contract


The [Transfer Contract](/learn/deep-dive/transaction_models/transactions) integrates Moonlight as an account-based transaction model. Each user has an account tied to a public-private key pair, and balances are directly managed by the Transfer Contract. This ensures seamless execution of Moonlight transactions, such as transferring DUSK or paying gas fees.

Moonlight transactions are public, making them ideal for fully transparent applications. The Transfer Contract processes Moonlight transactions by verifying digital signatures, confirming sufficient balances, and executing transfers securely.


# Moonlight Workflow in the Transfer Contract

The Transfer Contract operates Moonlight through the following steps:

1) A user initiates a Moonlight transaction by signing it with their private key and sending it to the Transfer Contract.
2) The Transfer Contract calculates gas fees and verifies that the sender’s balance can cover them.
3) The contract verifies the transaction signature using the sender's public key to confirm ownership and prevent malleability.
4) The Transfer Contract updates the sender’s account balance and ensures funds cannot be spent twice.
5) The transaction is finalized, and the recipient's account balance is updated accordingly.

Moonlight is ideal for applications where full transparency is needed.


# Implementation details

For the complete implementation details you can refer to the [Whitepaper](https://dusk-cms.ams3.digitaloceanspaces.com/Dusk_Whitepaper_2024_4db72f92a1.pdf).

In Moonlight, each user account is identified by a public key, with a corresponding private key used for authorizing transactions. The relationship between the keys is as follows:

- **Public Key:** `pk = A`, where `A ∈ G` (the largest subgroup of points of prime order of the BLS12-381 elliptic curve).  
- **Secret Key:** `sk = a`, such that `A = aG`.

Each account is associated with the following attributes:
- **Nonce:** A counter to track the number of transactions sent from the account and prevent replay attacks.  
- **Balance:** The amount of **DUSK** held in the account.


## Moonlight Transactions

A Moonlight transaction includes the following fields:  
`txmoonlight = {from, to, value, nonce, deposit, data, gas_limit, gas_price, signature}`  

The parameters correspond to:  
- `sender`: Public key of the sender.  
- `receiver`: Public key of the recipient.  
- `value`: Amount of $DUSK to transfer.  
- `nonce`: Ensures transaction uniqueness and prevents replay attacks.  
- `deposit`: Optional; amount sent to a contract or function.  
- `data`: Optional; used for deploying or interacting with contracts or attaching metadata to a transaction.  
- `gas_limit`: Maximum gas the transaction is allowed to consume.  
- `gas_price`: Amount the user is willing to pay per unit of gas.  
- `signature`: Sender’s signature on the transaction hash, ensuring authenticity.  


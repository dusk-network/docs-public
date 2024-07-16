---
title: Overview
---

A transaction model defines how transactions are structured, verified, and recorded. Consequently, a transaction model specifies the rules that allow assets to be transferred between participants on a network.

The structure of a transaction tipically includes inputs and outputs. Each transaction must be cryptographically signed by the sender to verify authenticity and prevent tampering.

Transactions must comply with network rules (e.g. no double-spending), and nodes validate transactions before they are added to the blockchain.

## Types of Transaction Models
Usually, transaction models are based on UTXOs or accounts.

#### UTXOs
In a UTXO model each transaction creates new outputs that can be used as inputs in future transactions. The sum of inputs must equal or exceed the sum of outputs. If there are outputs that have not been used as inputs in other transactions, it means that they have not been "spent". This implies that the "unspent" outputs are actually available funds, as they can be spent by using them as inputs in another transaction. This model is useful to preserve privacy, as users are handling notes (inputs/outputs) rather than a balance associated to an account.

#### Account model
In the account model instead, each account has a balance that increases or decreases with each transaction. Transactions modify the account's balance directly, and the funds can be spent if the balance allows for it.

Dusk introduced innovative transaction models to protect user's privacy and enable flexibility when complying with regulations.

## Transaction Models on Dusk
Dusk can rely on different transaction models, each of them optimized for its purpose.

#### Phoenix
[Phoenix](/learn/dusk-protocol/transaction_models/phoenix) is UTXO-based and privacy preserving transaction model. Phoenix is a primitive of Dusk, and it's used in the transfer of native $DUSK. With Phoenix, there are no balances connected to users' addresses. Instead, users can spend "notes" in a completely private manner by leveraging Zero Knowledge Proofs.


#### Moonlight
[Moonlight](/learn/dusk-protocol/transaction_models/moonlight) is an account-based transaction model, which keeps track of account and contracts. Moonlight is fully transparent, making it easy to interact with external protocols that do not preserve privacy.
Users can deposit funds into Moonlight from Phoenix (and vice-versa), making Moonlight a completely integrated transparent model on Dusk.


#### Zedger
[Zedger](/learn/dusk-protocol/transaction_models/zedger) is the transaction model that combines aspects of UTXO and the account model to allow for lifecycle management and regulatory compliance.

Zedger allows for the digital representation and management of fund shares in a privacy-preserving manner. This includes both open and closed-end funds, where fund managers are able to issue, manage, and trade fund shares as tokens. Zedger supports a range of fund structures, aiming to increase transparency and reduce costs associated with fund management. The emphasis on regulatory compliance and privacy ensures that all operations meet the highest standards required by financial authorities and stakeholders.


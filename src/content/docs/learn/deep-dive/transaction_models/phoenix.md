---
title: Phoenix
description: Learn how Dusk’s UTXO-based transaction model ensures privacy and compliance.
---

<a href="https://github.com/dusk-network/phoenix/blob/master/docs/v2/protocol.pdf" target="_blank">Phoenix</a>, Dusk’s privacy-preserving transaction model, is managed by the [Transfer Contract](/learn/deep-dive/transaction_models/transactions) to ensure secure, private, and compliant transactions. Accounts within Phoenix are referred to as shielded accounts.

It uses a UTXO-based system to prioritize user privacy, where funds, referred to as "notes", are spent by the validation of specific zk-proof criteria.

In privacy-preserving blockchains like Dusk, there are no accounts or wallets at the protocol layer. Instead, funds are stored as a list of UTXOs (unspent transaction outputs), each with a specific quantity and spending criteria. Transactions are created by consuming existing UTXOs and producing new ones in their place.

Phoenix operates alongside [Moonlight](/learn/deep-dive/transaction_models/moonlight), Dusk’s transparent, account-based model. While Moonlight offers transparency, Phoenix balances privacy with regulatory compliance. 


:::note[Note]
Unlike anonymity protocols that completely obscure transaction details, Phoenix ensures that only the receiver can identify the sender, enabling compliance with regulations while maintaining privacy from external observers. More information about compliance can be found [here](#privacy--compliance).
:::


# Notes and Merkle Tree

The [Transfer Contract](/learn/deep-dive/transaction_models/transactions) uses a Merkle tree to store obfuscated notes, which represent unspent transaction outputs (UTXOs). The network tracks these notes by storing their hashes in the tree's leaves, adding new hashes whenever transactions are validated.

Phoenix relies on the Transfer Contract to validate transactions through zero-knowledge proofs (zk-proofs), ensuring that notes can be spent without revealing sensitive details. 
Additionally, the Transfer Contract ensures gas fees are included securely within the zk-proof.

Upon verifying the zk-proof, the contract updates the Merkle tree to reflect the spent note and records the corresponding nullifier.

Each transaction generates two new notes: one for the recipient and another as change for the sender. While the Transfer Contract can accept up to four notes as inputs, it consistently provides two notes as outputs.

## Phoenix transfer contract flow

The [Transfer Contract](/learn/deep-dive/transaction_models/transactions) operates Phoenix through the following steps:

1) A user initiates a transaction by sending it to the transfer contract. This transaction includes the necessary zk-proof to demonstrate ownership of the note to be spent.

2) The contract calculates the gas required for the transaction and ensures the sender has enough funds to cover these fees. This ensures that the transaction can be processed without any issues.

3) The Transfer Contract verifies the zk-proof to ensure it is valid. This verification process confirms that the user possesses a legitimate note without revealing any specific information about the note itself.

4) The Transfer Contract identifies the transaction type (Phoenix or Moonlight) and directs the payload to the corresponding logic for further processing.

5) Once the proof is verified, the transfer contract updates the Merkle tree to mark the note as spent and records the nullifier. It then generates two new notes—one for the recipient and another as change for the sender.

## Implementation details

For the complete implementation details you can refer to the [Whitepaper](https://dusk-cms.ams3.digitaloceanspaces.com/Dusk_Whitepaper_2024_4db72f92a1.pdf).

All notes in the network have the same structure:
`N = {type, com, enc, npk, R, encsender }.`

The parameters above correspond to the following:
- `type` indicates the type of the note, either transparent or obfuscated;
- `com` is a commitment to the value of the note; 
- `enc` is an encryption of the opening of `com` that can be decrypted using the recipient’s view key; 
- `npk` is the note’s public key, whose associated private key `nsk` can only be computed by the recipient of the note
- `R` is a point in the Jubjub subgroup `J` that allows the recipient to compute `nsk` and also identify that he is the recipient of the transaction. 
- `encsender` is the encryption of a public key owned by the sender of the note that allows the recipient of the note to identify them.

To prevent double spending, transactions include a list of deterministic values called nullifiers, one for each note being spent. The network nodes must check that nullifiers were not used before. This ensures that the network knows that some notes are nullified and can no longer be spent, but without linking the nullifiers to specific notes.

## Transactions

Phoenix transactions consist of two parts, a header (`txmetadata`) which includes metadata, and the payload (`txpayload`) with the actual contents of the transaction that have been set by the transaction sender.

A transaction in Dusk is composed by the following elements:
- `tx_skeleton` = `[root, nullifiers, notes, deposit, max_fee]`
- `tx_payload` = `[txskeleton,data]`
- `tx` = `[txpayload,payload_hash, tx_proof]`
- `tx_metadata` = `[timestamp, block_height, status, type, tx_hash, gas_price, gas_spent, tx_fee, positions]`

The sender first sets `txskeleton`, which contains the following data:
- `root` is a recent root of the Merkle tree of notes
- `nullifiers` is the list of deterministic values that nullify the notes being spent
- `notes` is the list of new notes being minted (each of them with the structure as described above);
- `deposit` is the amount that will be sent to a contract - `max_fee` is the maximum fee the sender is willing to pay for the execution of the transaction.

The `tx_payload` includes all the above information, plus a `data` field that contains additional information needed for transaction execution, such as smart contract IDs, call data, or the stealth address for fee change.

Once `tx_payload` is set, the sender calculates `payload_hash`, which is the hash of all elements in `tx_payload`. These elements, along with the hash, are used to compute `tx_proof`, a zero-knowledge proof that verifies the transaction's adherence to network rules.

`tx` consists of all the parameters that are set by the sender of the transaction, `txmetadata` contains the information set by the network once the transaction is processed and included in a block: 
- `timestamp` is the the date and time the transaction was processed
- `block_height` is the number of the block the transaction was included in
- `status` indicates if the transaction was successful or not
- `tx_hash` is the hash of tx
- `gas_price` is the price at which gas was paid
- `gas_spent` is the amount of gas spent
- `fee` is the amount of $DUSK spent in the transaction, which is the result of `gas_price` × `gas_spent`
- `positions` is the list of positions of the newly minted notes in the Merkle tree of notes.

## Protocol keys

Each note in Phoenix is associated with a unique public key instead of using the static public key of the recipient. Phoenix uses two-element keys, allowing users to delegate the process of scanning for notes addressed to them.

Keys in Phoenix can be categorized into **user's static keys** and **note keys**.

### User static keys

- **Secret key**: `sk = (a,b)` - used for decryption and signing data.
- **Publickey**: `pk=(A,B)` - derived from the secret key, used to encrypt data or verify signatures.
- **View key**: `vk = (a, B)` - enables viewing but not spending of funds.

### Note keys

In addition to the **user static keys**, Phoenix assigns a one-time key pair to each note issued in the network, computed using the Diffie–Hellman key exchange protocol. The recipient’s Diffie–Hellman partial key will be the first part of its public key, `A`, whereas the sender will use a fresh key.

The sender of a note will attach to it the note public key `npk` and the partial Diffie–Hellman `R` used to create `npk`.

The recipient can identify whether the note was sent to them using only the recipient’s view key, and not its whole secret key.

By using the note's public key, a user can delegate the job of scanning the different transactions of the network to retrieve their notes by sharing their view key `vk` with an external entity, which we call a network-listening helper. Thus, the user could delegate the scanning of all transactions to a different entity by sharing `(a,B)` with the helper. Even with that information, such an entity could not spend `R`’s money, since they can not derive `skR` without the second part of `R`’s private key.
 
On the other hand, the note's secret key can only be computed by the recipient of the note, since they are the only ones holding the whole secret key `sk = (a,b)`. The recipient can use the note secret key to spend the note.

## Privacy & Compliance

Phoenix ensures that transaction details, such as the sender's public key, are accessible only to the intended recipient, enabling users to prove the origin of their funds without public disclosure. This approach aligns with regulations like TRF, AMLD5, MiCA, and GDPR, mitigating compliance risks associated with public transactions.

Phoenix transactions include a zero-knowledge proof that the sender is indeed the owner of the associated private key and wallet. If the sender’s key was incorrect or if they were not the actual initiator of the transaction, the transaction would be invalid and discarded by the network.

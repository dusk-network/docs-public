---
title: Phoenix
description: A UTXO-based transaction model on Dusk.
---

<a href="https://github.com/dusk-network/phoenix/blob/master/docs/protocol.pdf" target="_blank">Phoenix</a> is the privacy-preserving transaction model used by Dusk. In privacy-preserving blockchains there are no accounts or wallets at the protocol layer. Instead, coins are stored as a list of UTXOs with specific quantities and criteria for spending. Transactions are created by consuming existing UTXOs and producing new ones in their place. In the Phoenix model, UTXOs are called notes.

:::note[Important]
Dusk makes use of a UTXO and account-based transaction model. 
:::

Phoenix is designed to balance privacy with regulatory compliance. Unlike anonymity protocols, where transaction dertails are entirely hidden, Phoenix ensures that the receiver van provably see who the sender is, but no one else can. This allows users to comply with regulations while maintaining their privacy from external observers.

The network track all notes ever created by storing their hashes in the leaves of a Merkle tree of notes. When a transaction is validated, the network includes the hashes of the new notes in the leaves of this tree.

All notes in the network have the same structure:
`N = {type, com, enc, npk, R, encsender }.`

The parameters above correspond to the following:
- `type` indicates the type of the note, either transparent or obfuscated;
- `com` is a commitment to the value of the note; 
- `enc` is an encryption of the opening of `com` that can be decrypted using the recipient’s view key; 
`npk` is the note’s public key, whose associated private key `nsk` can only be computed by the recipient of the note
`R` is a point in the Jubjub subgroup `J` that allows the recipient to compute `nsk` and also identify that he is the recipient of the transaction. 
`encsender` is the encryption of a public key owned by the sender of the note that allows the recipient of the note to identify them.

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

– **Secret key**: `sk = (a,b)` - used for decryption and signing data.
– **Publickey**: `pk=(A,B)` - derived from the secret key, used to encrypt data or verify signatures.
– **View key**: `vk = (a, B)` - enables viewing but not spending of funds.

### Note keys

In addition to the **user static keys**, Phoenix assigns a one-time key pair to each note issued in the network, computed using the Diffie–Hellman key exchange protocol. The recipient’s Diffie–Hellman partial key will be the first part of its public key, `A`, whereas the sender will use a fresh key.

The sender of a note will attach to it the note public key `npk` and the partial Diffie–Hellman `R` used to create `npk`.

The recipient can identify whether the note was sent to them using only the recipient’s view key, and not its whole secret key.

By using the note's public key, a user can delegate the job of scanning the different transactions of the network to retrieve their notes by sharing their view key `vk` with an external entity, which we call a network-listening helper. Thus, the user could delegate the scanning of all transactions to a different entity by sharing `(a,B)` with the helper. Even with that information, such an entity could not spend `R`’s money, since they can not derive `skR` without the second part of `R`’s private key.
 
On the other hand, the note's secret key can only be computed by the recipient of the note, since they are the only ones holding the whole secret key `sk = (a,b)`. The recipient can use the note secret key to spend the note.

## Privacy & Compliance

Phoenix ensures that transaction details, such as the sender's public key, are accessible only to the intended recipient, enabling users to prove the origin of their funds without public disclosure. This approach aligns with regulations like TRF, AMLD5, MiCA, and GDPR, mitigating compliance risks associated with public transactions.

Phoenix transactions include a zero-knowledge proof that the sender is indeed the owner of the associated private key and wallet. If the sender’s key was incorrect or if they were not the actual initiator of the transaction, the transaction would be invalid and discarded by the network.

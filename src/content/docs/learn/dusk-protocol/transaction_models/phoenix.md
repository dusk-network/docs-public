---
title: Phoenix
---

# Phoenix

<a href="https://github.com/dusk-network/phoenix/blob/master/docs/protocol.pdf" target="_blank" >Phoenix</a> is main transaction model used by Dusk. To understand Phoenix, it is important to note that in privacy-preserving blockchains there are no accounts or wallets at the protocol layer. Instead, coins are stored as a list of UTXOs with a quantity and some criteria for spending it. In this approach, transactions are created by consuming existing UTXOs and producing new ones in their place. In Phoenix's model, UTXOs are called notes.


Unlike transparent transaction models,  where it is easy to monitor which notes were spent, the details of the notes must be kept hidden. In this case, the network must keep track of all notes ever created by storing their hashes in the leaves of a Merkle tree of notes. When a transaction is validated, the network includes the hashes of the new notes to the leaves of this tree.

All notes in the network have the same structure:
``N = {type, com, enc, npk, R, encsender }.```


The parameters above correspond to the following:
- ```type``` indicates the type of the note, either transparent or obfuscated;
- ```com``` is a commitment to the value of the note; 
- ```enc``` is an encryption of the opening of ```com``` that can be decrypted using the recipient’s view key; 
```npk``` is the note’s public key, whose associated private key ```nsk``` can only be computed by the recipient of the note
```R``` is a point in the Jubjub subgroup ```J``` that allows the recipient to compute ```nsk``` and also identify that he is the recipient of the transaction. 
```encsender``` is the encryption of a public key owned by the sender of the note that allows the recipient of the note to identify them.


To prevent double spending, transactions include a list of deterministic values called nullifiers, one for each note being spent, which invalidates these notes. The network nodes must check that nullifiers were not used before. The idea here is that the nullifier is computed in such a way that an external observer cannot link it to any specific note. This way, when a transaction is accepted, the network knows that some notes are nullified and can no longer be spent, but does not know which ones.

### Transactions

At a technical level, transactions consist of two parts, a header txmetadata which includes metadata, and the payload txpayload with the actual contents of the transaction that have been set by the transaction sender.

More specifically, a transaction in Dusk is composed by the following elements:
- ```tx_skeleton``` = ```[root, nullifiers, notes, deposit, max_fee]```
- ```tx_payload``` = ```[txskeleton,data]```
- ```tx``` = ```[txpayload,payload_hash, tx_proof]```
- ```tx_metadata``` = ```[timestamp, block_height, status, type, tx_hash, gas_price, gas_spent, tx_fee, positions]```


The sender first sets ```txskeleton```, which contains the following data:
- ```root``` is a recent root of the Merkle tree of notes
- ```nullifiers``` is the list of deterministic values that nullify the notes being spent
- ```notes``` is the list of new notes being minted (each of them with the structure as described above);
- ```deposit``` is the amount that will be sent to a contract - ```max_fee``` is the maximum fee the sender is willing to pay for the execution of the transaction.

The ```txpayload``` contains all the previous information together with a field called ```data``` that represents all the other information needed for the correct execution of the transaction. This field is a simplification of the real data structure, that may contain several elements, such as the IDs of the smart contracts that need to be called, the call data, or the stealth address where the change of the fee should be sent back to. For the sake of clarity, we consider that all this information is represented in the data field.

Once ```txpayload``` is set, the sender of the transaction calculates ```payload_hash```, which is the hash of all elements in ```txpayload```. All these elements together with this hash are used to compute ```tx_proof```, which is a zero-knowledge proof that proves that the transaction has been performed following the network rules and that the list encryptions do encrypt correctly a sender’s public key owned by the sender. 

While ```tx``` consists of all the parameters that are set by the sender of the transaction, ```txmetadata``` contains the information set by the network once the transaction is processed and included in a block: - ```timestamp``` is the the date and time the transaction was processed
- ```block_height``` is the number of the block the transaction was included in
- ```status``` indicates if the transaction was successful or not
- ```tx_hash``` is the hash of tx
-  ```gas_price``` is the price at which gas was paid
-  ```gas_spent``` is the amount of gas spent
-  ```fee``` is the amount of $DUSK spent in the transaction, which is the result of ```gas_price``` × ```gas_spent```
-  ```positions``` is the list of positions of the newly minted notes in the Merkle tree of notes.



### Protocol keys
As Phoenix is a privacy-preserving protocol, each note is associated with a unique public key, instead of using the static public key of the recipient. In addition to this, Phoenix uses two-element keys, which allows users of the network to delegate the process of scanning for the notes addressed to them.

Keys in Phoenix can be categorized into **user's static keys** and **note keys**.

##### User static keys
Every user keeps the following static keys:

– **Secret key**: ```sk = (a,b)```. This key is used for decryption and signing data.

– **Publickey**: ```pk=(A,B)```. This is derived from the secret key, and it's used to encrypt data or verify signatures.

– **View key**: ```vk = (a, B)```. This key enables allows for the viewing but not spending of funds.

##### Note keys
In addition to the **user static keys**, Phoenix assigns a one-time key pair to each note issued in the network, computed using the Diffie–Hellman key exchange protocol. The recipient’s Diffie–Hellman partial key will be the first part of its public key, ```A```, whereas the sender will use a fresh key.

The sender of a note will attach to it the note public key ```npk```` and the partial Diffie–Hellman ```R``` used to create ```npk```.

The recipient can identify whether the note was sent to them using only the recipient’s view key, and not its whole secret key.

By using the note's public key, a user can delegate the job of scanning the different transactions of the network to retrieve their notes by sharing their view key ```vk``` with an external entity, which we call a network-listening helper. Thus, the user could delegate the scanning of all transactions to a different entity by sharing ```(a,B)``` with the helper. Even with that information, such an entity could not spend ```R```’s money, since they can not derive ```skR``` without the second part of ```R```’s private key.
 
On the other hand, the note's secret key can only be computed by the recipient of the note, since they are the only ones holding the whole secret key ```sk = (a,b)```. The recipient can use the note secret key to spend the note.


### Phoenix 2.0 release

As Phoenix has been updated to Phoenix 2.0, transactions also specify an encrypted sender’s public key that only the recipient can decrypt. 

Moreover, transactions include a zero-knowledge proof that the sender is indeed the owner of the associated private key and wallet that generated the transaction. If the sender’s key was incorrect in any way or the sender was not the actual initiator of the transaction, the whole transaction would be invalid and discarded by the network.

The protocol does not resort to publishing user data in clear in order to guarantee sender’s correctness since the sender field can only be decrypted by the recipient. On the other hand, the sender is always known by the recipient. In particular, if such recipient is a crypto asset service provider (CASP), the CASP can verify if the recipient passed an anti-money laundering (AML) and/or a know-your-customer (KYC) process, and if not, they can return the funds to the sender. Even more, all users are always able to prove the origin of their funds by disclosing the senders’ keys of the transactions they were recipients of.

As a result, Phoenix 2.0 ensures users’ privacy while preventing them from involuntarily engaging in illicit activities, such as money laundering.
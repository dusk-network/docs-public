---
title: Transaction Models
---

# Phoenix

Phoenix is main transaction model used by Dusk. To understand Phoenix, it is important to note that in privacy-preserving blockchains there are no accounts or wallets at the protocol layer. Instead, coins are stored as a list of UTXOs with a quantity and some criteria for spending it. In this approach, transactions are created by consuming existing UTXOs and producing new ones in their place. In Phoenix's model, UTXOs are called notes.


Unlike transparent transaction models, such as the Bitcoin network, where it is easy to monitor which notes were spent, this task is much harder in a privacy-preserving network, since the details of the notes must be kept hidden. In this case, the network must keep track of all notes ever created by storing their hashes in the leaves of a Merkle tree of notes. When a transaction is validated, the network includes the hashes of the new notes to the leaves of this tree.

All notes in the network have the same structure:
```N = {type, com, enc, npk, R}```


The parameters above correspond to the following:
- ```type``` indicates the type of the note, either transparent or obfuscated;
- ```com``` is a commitment to the value of the note; 
- ```enc``` is an encryption of the opening of ```com``` that can be decrypted using the recipient’s view key; 
```npk``` is the note’s public key, whose associated private key nsk can only be computed by the recipient of the note
```R``` is a point in the Jubjub subgroup ```J``` that allows the recipient to compute ```nsk``` and also identify that he is the recipient of the transaction. A note will have an associated position, but we do not consider the position part of the note, as the position cannot be assigned by the sender.
To prevent double spending, transactions include a list of deterministic values called nullifiers, one for each note being spent, which invalidates these notes. The network nodes must check that nullifiers were not used before. The idea here is that the nullifier is computed in such a way that an external observer cannot link it to any specific note. This way, when a transaction is accepted, the network knows that some notes are nullified and can no longer be spent, but does not know which ones.

### Transactions

At a technical level, transactions consist of two parts, a header txmetadata which includes metadata, and the payload txpayload with the actual contents of the transaction that have been set by the transaction sender.

More specifically, a transaction in Dusk is composed by the following elements:
- ```tx_skeleton``` = ```[root, nullifiers, notes, crossover, fee]```
- ```tx_payload``` = ```[txskeleton,skeleton_hash,tx_proof]```
- ```tx_metadata``` = ```[timestamp, block_height, status, type, tx_hash, gas_price, gas_spent, tx_fee, positions]```


The sender first sets ```txskeleton```, which contains the following data:
- ```root``` is a recent root of the Merkle tree of notes
- ```nullifiers``` is the list of deterministic values that nullify the notes being spent
- ```notes``` is the list of new notes being minted (each of them with the structure as described above);
- ```crossover``` contains the details of the values that are sent to a contract. More specifically, ```cross``` is the amount that will be sent, ```comcross``` is the commitment to that amount, and ```smart_contract_ID``` is the ID of the contract where funds will be sent to
- ```fee``` contains the transaction fee's conditions set by the user, where ```gas_change_stealth_address``` is a stealth address (a pair of the form (```npk```, ```R```)) that will be used to return to the user the difference between ```gas_limit``` and ```gas_spent```.

Once ```txskeleton``` is set, the sender calculates ```skeleton_hash```, which is the hash of all elements in ```txskeleton```. All these elements together with the ```skeleton_hash``` is used to compute ```tx_proof```, which is a zero-knowledge proof that proves that the transaction has been performed following the network rules.

While the ```txpayload``` consists of all the parameters that are set by the user sending the transaction, ```txmetadata``` contains the information that is set by the network once the transaction is processed and included in a block.

To be more specific:
- ```timestamp``` is the the date and time the transaction was processed
- ```block_height``` is the number of the block the transaction was included in
- ```status``` indicates if the transaction was successful or not
- ```tx_hash``` is the hash of ```txpayload```
- ```gas_price``` is the price at which gas was paid
- ```gas_spent``` is the amount of gas spent
- ```tx_fee``` is the amount of DUSK spent in the transaction, which is the result of ```gas_price``` **×** ```gas_spent```; 
- ```positions``` is the list of positions of the newly minted notes in the Merkle tree of notes.


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

By using the note's public key, a user can delegate the job of scanning the different transactions of the network to retrieve their notes by sharing their view key ```vk``` with an external entity, which we call a network-listening helper. Thus, the user could delegate the scanning of all transactions to a different entity by sharing ```(a,B)``` with the helper. Even with that information, such an entity could not spend ```R```’s money, since they can not derive ```skR``` without the second part of ```R```’s private key.
 
On the other hand, the note's secret key can only be computed by the recipient of the note, since they are the only ones holding the whole secret key ```sk = (a,b)```.


# Moonlight

TBD

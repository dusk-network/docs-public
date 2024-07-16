---
title: Cryptographic Keys
---

Developers are free to choose any cryptographic signature algorithm when building on Dusk, as they can use various cryptographic primitives, as long as they are compatible to WASM. As an example, developers can choose BLS, JubJub Schnorr, ECDSA, Bitcoin's Secp256k1 and much more. The choice usually depends on requirements for security, signature size, and transaction efficiency.

For developers opting to use BLS signatures, it is recommended to leverage the ```rusk_abi::verify_bls``` host function provided by Dusk. This function enables signature verification to be offloaded to the host, minimizing the gas consumption and execution time of contracts. Directly including complex cryptographic operations within the contract is still possible but less efficient in terms of gas usage.

For those beginning token development on Dusk, it might be beneficial to start with an available ECDSA scheme that easily compiles to WASM, optimizing the development process. As the project progresses, developers can switch to a more suitable or advanced cryptographic algorithm based on the evolving needs and security requirements of their application.

## Types of keys

Dusk uses three types of SecretKeys: 
- <a href="https://github.com/dusk-network/bls12_381-sign" target="_blank" >bls12_381-bls</a>: used in the consensus and stake contract.
- <a href="https://github.com/dusk-network/jubjub-schnorr" target="_blank" >jubjub-schnorr</a>: used to handle ```Dusk```.
- <a href="https://github.com/dusk-network/phoenix-core" target="_blank" >phoenix-core</a>: not used for signing.

Also, keys in Dusk work slighly different compared to other protocols:

```PublicSpendKeys``` and ```SecretSpendKeys``` are equivalent to the traditional key-pairs used in other blockchains to manage transactions.

```PublicKeys``` and ```SecretKeys``` are instead single-use keys derived from ```PublicSpendKeys``` and ```SecretSpendKeys```. They are specifically used to prove and assign note ownership during transactions.



## Keys creation and verification
The process for handling transactions in Dusk involves few key generation and verification steps:

1) Generate Phoenix private key.
2) Derive Phoenix public key.
3) Generate stealth address from Phoenix public key and a JubJubScalar.
4) Generate Schnorr private key from Phoenix private key combined with the stealth address.
5) Sign the claims with the Schnorr private key and verify with the Phoenix public key.  

More specifically, a ```jubjub-schnorr::SecretKey``` can be created with ```phoenix-core::SecretKey``` by calling ```SecretKey::gen_note_sk```. A message can be signed with that ```jubjub-schnorr::SecretKey``` and verified with a ```jubjub-schnorr::PublicKey```.

Creation and verification of signatures (both schnorr signatures and bls signatures) roughly follow this flow:
```rust
// get a random secret key
let sk = SecretKey::random(rng);
// generate public key from secret key
let pk = PublicKey::from(sk);

// sign a message with the secret key
let signature = sk.sign(message);

// verify the signature with the public key
assert!(pk.verify(signature));
```

#### Considerations

It is important to understand that for the final step, the ```verify_schnorr``` function expects a ```NotePublicKey``` instead of a ```phoenix``` public key. This implies that a ```NotePublicKey``` needs to be added in the contract, because considering that the owner of the contract is a ```phoenix``` public key,  the method ```verify_schnorr``` cannot be called with only that public key.
This implies that a Schnorr signature cannot be verified with only a ```phoenix``` public key. 

Anyways, the ```schnorr-sk``` is derived from ```phoenix-sk``` using a random value ```r```. If the same ```r``` is used to generate a stealth address from a ```phoenix-pk```, then the ```note-pk``` (which is a ```schnorr-pk```) in that stealth address can be used to verify the ```schnorr-sig``` signed with the ```schnorr-sk```.

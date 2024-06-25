---
title: Cryptographic Keys
---

Developers are free to choose any cryptographic signature algorithm when building on Dusk, as they can use various cryptographic primitives, as long as they are compatible to WASM. As an example, developers can choose BLS, JubJub Schnorr, ECDSA, Bitcoin's Secp256k1 and much more. The choice usually depends on requirements for security, signature size, and transaction efficiency.

For developers opting to use BLS signatures, it is recommended to leverage the ```rusk_abi::verify_bls``` host function provided by Dusk. This function enables signature verification to be offloaded to the host, minimizing the gas consumption and execution time of contracts. Directly including complex cryptographic operations within the contract is still possible but less efficient in terms of gas usage.

For those beginning token development on Dusk, it might be beneficial to start with an available ECDSA scheme that easily compiles to WASM, optimizing the development process. As the project progresses, developers can switch to a more suitable or advanced cryptographic algorithm based on the evolving needs and security requirements of their application.

## Types of keys
Dusk uses BLS keys in the consensus and consequently the stake contract. They are called private and public keys. The keys used to handle Dusk are <a href="https://github.com/dusk-network/jubjub-schnorr" target="_blank" >JubJub-Schnorr</a> keys. Here there are ```PublicSpendKeys``` and ```SecretSpendKeys```, as well as ```PublicKeys``` and ```SecretKeys```. These are the ones used by the transfer contract. The former are the equivalent to the normal key-pairs one would hold, while the latter are single-use keys used to prove and assign note ownership, and are derived from the former. Dusk guarantees that the ```contract_id``` is a valid BLS scalar, but it’s not a <a href="https://github.com/dusk-network/bls12_381-sign" target="_blank" >BLS key</a>. Even if a BLS secret key is just a scalar in the BLS field, this doesn't mean that one should see any scalar in the BLS field as a secret key in general. In the case of Dusk, contract IDs are not secret keys because if the secret key is the contract ID the "secret" key would not be so secret


The repositories where they are defined are the following:

https://github.com/dusk-network/jubjub-schnorr
https://github.com/dusk-network/phoenix-core
https://github.com/dusk-network/bls12_381-sign

Anyways, developers should feel free to use any signature algorithm they want for their as there are no restrictions on the algorithm they need to use. Developers are able to use any primitive they like, as long as they can compile it to WASM. This means that developers are not forced to use BLS or JubJub Schnorr, and could even use RSA or Bitcoin's Secp256k1 if they wanted to. It should be noted that the reason why no project uses RSA is because the signatures are fairly large, and it is therefore less than optimal to put them on-chain (and keys are also fairly large themselves). For a faster development it could make sense something that is readily available in rust and compiles to WASM. It might be easier to use some ECDSA scheme at first and then switch to the algorithm you deem the best in the end.

If using BLS signatures, it is recommended to use the host function available through rusk_abi::verify_bls to verify the signature. The reason is that it minimizes the gas used by the contract by essentially offloading the running of the verification code onto the host. If developers want to include the code directly on their contract, it would still run fine.


## How to verify a SecretKey from phoenix-core?

Which method can be used to verify a  SecretKey signature from phoenix-core, considering that  the contract owner is a PublicKey?
Dusk has three SecretKeys: 
- one in <a href="https://github.com/dusk-network/bls12_381-sign" target="_blank" >bls12_381-bls</a>
- one in <a href="https://github.com/dusk-network/jubjub-schnorr" target="_blank" >jubjub-schnorr</a>
- one in <a href="https://github.com/dusk-network/phoenix-core" target="_blank" >phoenix-core</a>


The one in phoenix-core is the only one that is not used for signing. 
A ```jubjub-schnorr::SecretKey``` can be created with ```phoenix-core::SecretKey``` by calling ```SecretKey::gen_note_sk```. A message can be signed with that ```jubjub-schnorr::SecretKey``` and verified with a ```jubjub-schnorr::PublicKey```.

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

In ```jubjub-schnorr``` double signatures can be created and both libs have the capabilities for multi-sigs but the general structure mostly remains.

## Keys creation flow
The flow would be something like:

1) Generate phoenix private key
2) Derive phoenix public key
3) Generate stealth address from phoenix public key and JubJubScalar
4) Generate schnorr private key from phoenix private key + stealth address
5) Sign claims with the schnorr private key and verify with the PHOENIX public key.  

It is important to understand that for the final step, the ```verify_schnorr``` function expects a ```NotePublicKey``` instead of a ```phoenix``` public key. This implies that a ```NotePublicKey``` needs to be added in the contract, because considering that the owner of the contract is a ```phoenix``` public key,  the method ```verify_schnorr``` cannot be called with only that public key.
This implies that a Schnorr signature cannot be verified with only a ```phoenix``` public key. 
Anyways, the ```schnorr-sk``` is derived from ```phoenix-sk``` using a random value r. If the same r is used to generate a stealth address from a ```phoenix-pk```, then the ```note-pk``` (which is a ```schnorr-pk```) in that stealth address can be used to verify the ```schnorr-sig``` signed with the ```schnorr-sk```.

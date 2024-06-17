---
title: Hashing
---

In the hash source file of the rusk-abi folder in the rusk repo there is written that the hashing cannot be proved inside a circuit, but if proving is desired, then `poseidon_hash` can be used  instead. The reason is that it is possible that developers may want to use hashes in a zero-knowledge proof (e.g to prove that someone signed a message).

The following is an example of how a poseidon hash can be computed:

```rust



       let stct_message =
            stct_signature_message(&crossover, value, contract_id);
        let stct_message = dusk_poseidon::sponge::hash(&stct_message);

```
Developers are free to use any hash they prefer, as long as it can be compiled to WASM. That said, Dusk supports computing a blake2 hash costlessly (to the contract), but the API is based around BlsScalar.


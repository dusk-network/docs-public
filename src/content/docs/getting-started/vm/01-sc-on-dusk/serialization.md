---
title: Serialization / Deserialization
---

Serialization and deserialization are allow smart contracts to be compiled to WASM and be executed by Piecrust.

Serialization converts data structures of a smart contract into a format that can be easily transmitted or stored across different environments, while deserialization converts this data back into a usable form.

While different serialization / deserialization frameworks can be used, Dusk uses ```rkyv``` to serialize and deserialize data across smart contracts. 

## rkyv
```rkyv``` is a zero-copy deserialization framework that serializes data structures in-place. This means that once data is serialized, it can be deserialized without copying, which makes it very efficient.

For a type to be passable through the VM boundary automatically, developers need to implement the ```rkyv traits```, for example by deriving them them. 

As an example, here it can be seen how the traits for a ```Note```have been implemented:

```rust
#[cfg_attr(
    feature = "rkyv-impl",
    derive(Archive, Serialize, Deserialize),
    archive_attr(derive(bytecheck::CheckBytes))
)]
pub struct Note {
    pub(crate) note_type: NoteType,
    pub(crate) value_commitment: JubJubExtended,
    pub(crate) nonce: BlsScalar,
    pub(crate) stealth_address: StealthAddress,
    pub(crate) pos: u64,
    pub(crate) encrypted_data: PoseidonCipher,
}
```
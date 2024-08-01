---
title: Host Calls
---

This page provides an overview on how to handle host calls, by using as an example the implementation of a ZKP circuit.

Developers are encouraged to have a deeper look at the <a href="https://github.com/dusk-network/piecrust/blob/main/contracts/host/src/lib.rs" target="_blank">host contract</a>, and its <a href="https://github.com/dusk-network/piecrust/blob/main/piecrust/tests/host.rs" target="_blank">test file</a>.


It is common for the contract itself to only deal with the operations that directly modify its state, while complex computations and verifications are delegated to external host queries.

The test code includes the implementations of host queries (`hash`, `verify_proof`, and `very_expensive`), and the contract code interacts with these queries as if they were external calls.

The test code also contains the code to generate public parameters and compiling the circuit using <a href="https://github.com/dusk-network/plonk" target="_blank">PLONK</a>.

## Registration, Implementations and Calls

The host query integration demonstrates how to register and use custom host queries by using `vm.register_host_query`:

```rust
fn new_ephemeral_vm() -> Result<VM, Error> {
    let mut vm = VM::ephemeral()?;
    vm.register_host_query("hash", hash);
    vm.register_host_query("verify_proof", verify_proof);
    vm.register_host_query("very_expensive", VeryExpensiveQuery);
    Ok(vm)
}
```

Then, custom logic is defined for each query. For instance, the hash query computes a Blake3 hash of the input data:

```rust
fn hash(buf: &mut [u8], len: u32) -> u32 {
    let a = unsafe { rkyv::archived_root::<Vec<u8>>(&buf[..len as usize]) };
    let v: Vec<u8> = a.deserialize(&mut rkyv::Infallible).unwrap();

    let hash = blake3::hash(&v);
    buf[..32].copy_from_slice(&hash.as_bytes()[..]);

    32
}
```

To call the host queries, developers can use `uplink::host_query`:

```rust
impl Hoster {
    pub fn host_hash(&self, bytes: Vec<u8>) -> [u8; 32] {
        uplink::host_query("hash", bytes)
    }
}
```

## Cryptographic Proofs

Here we provide an overview on how to set up a prover and verifier using <a href="https://github.com/dusk-network/plonk" target="_blank">PLONK</a>, as well as generating proofs, and verifying them via a smart contract.

##### Setup

In the example it can be seen how to set up the prover and verifier with public parameters and compile a custom circuit.

```rust
fn get_prover_verifier() -> &'static (Prover, Verifier) {
    static PROVER_VERIFIER: Lazy<(Prover, Verifier)> = Lazy::new(|| {
        let mut rng = OsRng;
        let pp = PublicParameters::setup(1 << 4, &mut rng).expect("Setup should succeed");
        let label = b"dusk-network";
        let (prover, verifier) = Compiler::compile::<TestCircuit>(&pp, label).expect("Compile should succeed");
        (prover, verifier)
    });

    &PROVER_VERIFIER
}
```

##### Verification Logic

Then, the logic to verify proofs against public inputs needs to be implemented:

```rust
fn verify_proof(buf: &mut [u8], len: u32) -> u32 {
    let a = unsafe { rkyv::archived_root::<(Proof, Vec<BlsScalar>)>(&buf[..len as usize]) };
    let (proof, public_inputs): (Proof, Vec<BlsScalar>) = a.deserialize(&mut rkyv::Infallible).unwrap();

    let (_, verifier) = get_prover_verifier();
    let valid = verifier.verify(&proof, &public_inputs).is_ok();
    let valid_bytes = rkyv::to_bytes::<_, 8>(&valid).unwrap();

    buf[..valid_bytes.len()].copy_from_slice(&valid_bytes);
    valid_bytes.len() as u32
}
```

##### Host Calls

Finally, here we can see how to use the methods to call various host queries:

```rust
impl Hoster {
    pub fn host_hash(&self, bytes: Vec<u8>) -> [u8; 32] {
        uplink::host_query("hash", bytes)
    }

    pub fn host_verify(&self, proof: Proof, public_inputs: Vec<BlsScalar>) -> String {
        let is_valid = uplink::host_query::<_, bool>("verify_proof", (proof, public_inputs));
        match is_valid {
            true => String::from("PROOF IS VALID"),
            false => String::from("PROOF IS INVALID"),
        }
    }

    pub fn host_very_expensive(&self) {
        uplink::host_query::<_, ()>("very_expensive", ());
    }
}
```

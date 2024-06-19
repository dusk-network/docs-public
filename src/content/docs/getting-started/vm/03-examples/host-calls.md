---
title: Host Calls
---

This guide provides an in-depth look at managing state, handling host queries, and implementing cryptographic proofs within Rust smart contracts using the piecrust_uplink and dusk_plonk libraries.

In the provided content, the majority of the detailed implementations, particularly related to cryptographic proofs and host queries, are located in the test code rather than the contract code. This separation is intentional and serves several key purposes:

1. Simplified Contract Code
Minimalism and Focus: The contract code aims to be as simple and focused as possible. This makes it easier to understand, audit, and maintain. The contract itself should primarily define its state and the core logic of its operations, delegating complex computations or verifications to external host queries.

Security and Efficiency: Complex cryptographic operations and proofs are computationally intensive. Offloading these to the host environment, rather than executing them within the contract, ensures that the contract remains efficient and does not consume excessive resources.

2. Test Code as a Simulation Environment
Host Query Implementations: The test code includes the implementations of host queries (hash, verify_proof, and very_expensive). This simulates the behavior of the host environment. The contract code interacts with these queries as if they were external calls, which is a common pattern in smart contract development.

Prover and Verifier Setup: The test code contains the setup for the prover and verifier using the Dusk Plonk library. This includes generating public parameters and compiling the circuit. These operations are set up in the test environment to simulate how the contract would interact with these components. The actual proofs and verifications are performed as part of the tests.




Host Query Integration
Overview
The host query integration demonstrates how to register and use custom host queries within a VM, enabling smart contracts to perform complex operations by leveraging host capabilities.

Custom Host Queries
Registration:
Custom host queries are registered in the VM using vm.register_host_query.

rust
Copiar código
fn new_ephemeral_vm() -> Result<VM, Error> {
    let mut vm = VM::ephemeral()?;
    vm.register_host_query("hash", hash);
    vm.register_host_query("verify_proof", verify_proof);
    vm.register_host_query("very_expensive", VeryExpensiveQuery);
    Ok(vm)
}
Query Implementation:
Define the custom logic for each query. For instance, the hash query computes a Blake3 hash of the input data.

rust
Copiar código
fn hash(buf: &mut [u8], len: u32) -> u32 {
    let a = unsafe { rkyv::archived_root::<Vec<u8>>(&buf[..len as usize]) };
    let v: Vec<u8> = a.deserialize(&mut rkyv::Infallible).unwrap();

    let hash = blake3::hash(&v);
    buf[..32].copy_from_slice(&hash.as_bytes()[..]);

    32
}
Host Query Usage:
In the contract, use uplink::host_query to call the host queries.

rust
Copiar código
impl Hoster {
    pub fn host_hash(&self, bytes: Vec<u8>) -> [u8; 32] {
        uplink::host_query("hash", bytes)
    }
}
Cryptographic Proofs
Overview
This section covers setting up a prover and verifier using the Dusk Plonk library, generating proofs, and verifying them within a smart contract.

Prover and Verifier Setup
Initialization:
Set up the prover and verifier with public parameters and compile a custom circuit.

rust
Copiar código
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
Verification Logic:
Implement the logic to verify proofs against public inputs.

rust
Copiar código
fn verify_proof(buf: &mut [u8], len: u32) -> u32 {
    let a = unsafe { rkyv::archived_root::<(Proof, Vec<BlsScalar>)>(&buf[..len as usize]) };
    let (proof, public_inputs): (Proof, Vec<BlsScalar>) = a.deserialize(&mut rkyv::Infallible).unwrap();

    let (_, verifier) = get_prover_verifier();
    let valid = verifier.verify(&proof, &public_inputs).is_ok();
    let valid_bytes = rkyv::to_bytes::<_, 8>(&valid).unwrap();

    buf[..valid_bytes.len()].copy_from_slice(&valid_bytes);
    valid_bytes.len() as u32
}
Contract Structure
Overview
The contract uses #![no_std] to operate without the standard Rust library, making it suitable for environments with limited resources. It utilizes the alloc crate for dynamic memory allocation.

Hoster Struct:
Defines the contract state and methods to interact with host queries.

rust
Copiar código
pub struct Hoster;

static mut STATE: Hoster = Hoster;
Host Calls:
Methods to call various host queries.

rust
Copiar código
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
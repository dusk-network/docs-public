---
title: FAQs
---


Contracts Verification
WASM target
std
decimals
token discoverability
merkle tree size
proxy stake migration

## Contract Verification

There is no way to, in general, to verify that a binary came from a given piece of source code. The sheer amount of variability in compilers makes this almost an impossible task for most programming languages. The reason why with solidity this works is that there is a standardized compiler which will always compile a given source code in the same way for the same version. Select the correct compiler version and the same source code will result in the same bytecode as is on-chain, thus producing an effective comparison.  Since Dusk hasn’t restricted acceptable compilers yet, there is no way to show a verified contract in the same way as Ethereum blockexplorers do.

When allowing users to verify that a deployed Smart Contract can be verified to make sure that the source code corresponds to the deployed wasm, the developer would need to make available a docker machine from which the Smart Contract has been deployed from. The reason for this is that wasm compilation is not deterministic depending on the machine it has been deployed from. 


## Can a Contract deploy another Contract?
This is possible, and it is something that the team is currently working on. Depending on the manner in which this happens, it could be possible to deploy contracts with a bytecode much larger than 64KiB. It could be that a contract is able to pass a pointer to the host, together with a length, and simply have the host copy that part of its memory under the assumption that it is WASM. This would mean being able to deploy bytecode of near-arbitrary length, up to 4GiB.

## Token Discoverability
Native balances of different tokens on Dusk will be shown right away once a user logs into a wallet. This implies that the wallet also has to find all the tokens the wallet owns by reading the whole chain, find each token contract, and check if the wallet has an associated amount. In other ecosystems RPC providers usually fill the gap by doing indexing on the chain, and this will be most probably the same in Dusk. Balances in a particular token will be determined by the contract representing it, so indexing that contract will be the only choice. Another solution would be coming up with a standard for it, so that contracts expose an isStandard function that returns the standards it implements, or a more specific variant like isXSC or isXC.

## Can the selector clash with Proxy Contracts?
Referring to this, this is not a problem that developers need to worry about. WASM doesn't have a delegatecall instruction, and calling other contracts is a host function in Dusk. So any contract call is explicitly always a call, and will select only the function available in the called contract to be run.

## Is the transactor able to set metadata available for the contract?
This approach is not followed in Dusk, because this would turn metadata items into call-bound pieces of data. Currently they are session-bound, and specifically designated for protocol data.
If the transactor was able to set metadata available for the contract, Dusk would have to come up with rules as to which items can be set, since the ones already present are a part of the protocol. Neither the transactor nor the contract should be able to mess with the protocol.

These metadata items would then become way too similar to call arguments. It is also not encouraged for smart contract developers to "hide" data required by a contract call.

## Do generics need to be defined on the session.call?
As an example:

 let _ = session
        .call::<(Signature, BlsScalar, u64, BlsPublicKey, BlsPublicKey, u64), ()>(
            STDUSK_ID,
            "transfer_from",
            &(bob_signature, bob_seed, 0, bob, alice, 300),
            POINT_LIMIT,
        )
        .map(|r| r.data)
        .expect("Transfer should succeed");

If strong typing is required by using rkyv, types need to be specified. The reason is that the Rust compiler doesn't know how to (de)serialize values to and from the argument buffer.

When the compiler can infer the type it may get it right, for example:

// this will also work because the compiler knows the return is `u64`
fn i_return_t(session: Session) -> u64 {
    session.call(/*other args*/, &()).unwrap().data
}


A workaround would be having the return types constrained before or immediately after, but the type of the return should be specified.

// This will work for a return of type T and a unit () argument
let _: T = session.call(/*other args*/, &())?.data;

Another approach would be using raw calls using Session::call_raw, but then you'll have to take care of how to (de)serialize the types.

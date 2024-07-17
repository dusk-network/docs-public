---
title: FAQs
---


#### How to verify a contract?

Developers may be used to Solidity's deterministic compilation that comes from a standardized compiler. The compiler ensures that the same source code, when compiled with the same version, always produces the same bytecode. This consistency allows EVM block explorers to effectively verify that the on-chain bytecode corresponds to the provided source code.

There is no general way to verify that a WASM binary came from a given piece of source code, as compilation is non-deterministic due to various factors such as compiler version, build settings, environment...

In the case of WASM compilation, the lack of standardized compilation means that different environments, settings, or versions of compilers can produce different WASM binaries from the same source code.

To allow users to verify that a deployed smart contract corresponds to the source code, developers would need to provide a reproducible build environment. This can be achieved by using Docker to create a containerized environment from which the smart contract was deployed. Docker ensures that the build environment is consistent, including the specific compiler version and settings used during compilation.

While Dusk is looking at ways to circumvent this challenge, in the meantime developers can deploy smart contracts from a Docker container. The container should encapsulate the entire build environment, ensuring that anyone can reproduce the build by using the same Docker image. This ensures that the binary produced during the deployment matches the one produced during the verification process.

Along with the source code, developers should provide the Dockerfile or the Docker image used for the deployment.

#### Can a Contract deploy another Contract?
This is possible, and it is something that the team is currently working on. Depending on the manner in which this happens, it could be possible to deploy contracts with a bytecode much larger than 64KiB. It could be that a contract is able to pass a pointer to the host, together with a length, and simply have the host copy that part of its memory under the assumption that it is WASM. This would mean being able to deploy bytecode of near-arbitrary length, up to 4GiB.

## Is there any sort of Token Discoverability?
Native balances of different tokens on Dusk will be shown right away once a user logs into a wallet. This implies that the wallet also has to find all the tokens the wallet owns by reading the whole chain, find each token contract, and check if the wallet has an associated amount. In other ecosystems RPC providers usually fill the gap by doing indexing on the chain, and this will be most probably the same in Dusk. Balances in a particular token will be determined by the contract representing it, so indexing that contract will be the only choice. Another solution would be coming up with a standard for it, so that contracts expose an isStandard function that returns the standards it implements, or a more specific variant like isXSC or isXC.

#### Can the selector clash with Proxy Contracts?
Referring to this, this is not a problem that developers need to worry about. WASM doesn't have a delegatecall instruction, and calling other contracts is a host function in Dusk. So any contract call is explicitly always a call, and will select only the function available in the called contract to be run.

#### Is the transactor able to set metadata available for the contract?
This approach is not followed in Dusk, because this would turn metadata items into call-bound pieces of data. Currently they are session-bound, and specifically designated for protocol data.
If the transactor was able to set metadata available for the contract, Dusk would have to come up with rules as to which items can be set, since the ones already present are a part of the protocol. Neither the transactor nor the contract should be able to mess with the protocol.

These metadata items would then become way too similar to call arguments. It is also not encouraged for smart contract developers to "hide" data required by a contract call.

#### Do generics need to be defined on the session.call?
As an example:
```rust

 let _ = session
        .call::<(Signature, BlsScalar, u64, BlsPublicKey, BlsPublicKey, u64), ()>(
            STDUSK_ID,
            "transfer_from",
            &(bob_signature, bob_seed, 0, bob, alice, 300),
            POINT_LIMIT,
        )
        .map(|r| r.data)
        .expect("Transfer should succeed");
```
If strong typing is required by using ```rkyv```, types need to be specified. The reason is that the Rust compiler doesn't know how to (de)serialize values to and from the argument buffer.

When the compiler can infer the type it may get it right, for example:
```rust
// this will also work because the compiler knows the return is `u64`
fn i_return_t(session: Session) -> u64 {
    session.call(/*other args*/, &()).unwrap().data
}
```

A workaround would be having the return types constrained before or immediately after, but the type of the return should be specified.

```rust
let _: T = session.call(/*other args*/, &())?.data;
```
Another approach would be using raw calls using ```Session::call_raw```, but then you'll have to take care of how to (de)serialize the types.



#### Is there a wallet.execute() example with some args?
A wallet exec with arbitrary data can be found <a href="https://github.com/dusk-network/rusk/blob/e7d9c9a47400c394e1cd706bd5828dd67445d25c/rusk/tests/services/stake.rs#L218" target="_blank" >here</a>.


#### Why there is no msg.sender() method?

Because of the way that Dusk works, transactions don't have the equivalent to msg.sender. Therefore developers need to figure out how to represent users. The issue is that even if in theory users can be seen as a collection of unspent notes associated with a key, notes are on purpose not linkable to each other. If someone find a way to do it, this should be reported and treated by as a vulnerability. 

 msg.sender is not "abstracted" away on dusk. So you could at the moment mimic that behavior explicitly in every function by taking the address as function argument too + for example a signature that signed all other function arguments (including your address). Then verifying this this in the function.

Even if the liquidity-staking-pool address used to hold users’ balances against, would ideally interact with the user’s wallet tgat can sign the address with its private key and pass that in, so that the contract can verify the signature (signature verification) to confirm the address ownership, this is not exactly possible to do it in Dusk. is a number that allows the sender of a transaction to target the person that owns the corresponding PrivateSpendKey. However, at no point is this number leaked while sending a transaction to the network - otherwise you would be able to trace when a user transacts.

It is recommended to take a look at signature algorithms used on-chain, as these are the keys that the stake contract uses to identify users.


#### How to pause or unpause contracts?
Contract locking is available to those contracts falling in the scenario 3 of the economic protocol, This includes the cases when a vulnerability is detected either algorithmically (the contract goes in out of gas) or manually by the contract's owner (the contract is losing money). 


#### Can a Contract deploy another Contract?
This is possible, and it is something that the team is currently working on. Depending on the manner in which this happens, it could be possible to deploy contracts with a bytecode much larger than 64KiB. It could be that a contract is able to pass a pointer to the host, together with a length, and simply have the host copy that part of its memory under the assumption that it is WASM. This would mean being able to deploy bytecode of near-arbitrary length, up to 4GiB.

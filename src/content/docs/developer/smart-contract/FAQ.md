---

title: FAQs
description: Learn the answers to common questions about building, deploying, and optimizing smart contracts on Dusk.

---

#### How to verify a contract?

Information about contract verification can be found [here](/developer/smart-contract/guides/02-compiling#how-to-verify-a-contract).

#### Can a Contract deploy another Contract?

Yes, see [here](/developer/smart-contract/guides/03-deploying#let-contracts-deploy-other-contracts).

#### Is there Token Discoverability?

Native balances of different tokens on Dusk will be shown right away once a user logs into a wallet. This implies that the wallet also has to find all the tokens the wallet owns by reading the whole chain, find each token contract, and check if the wallet has an associated amount. In other ecosystems RPC providers usually fill the gap by doing indexing on the chain, and this will be most probably the same in Dusk. Balances in a particular token will be determined by the contract representing it, so indexing that contract will be the only choice. Another solution would be coming up with a standard for it, so that contracts expose an isStandard function that returns the standards it implements, or a more specific variant like isXSC or isXC.

#### Can the selector clash with Proxy Contracts?

WASM doesn't have a `delegatecall` instruction, and calling other contracts is a host function in Dusk. So any contract call is explicitly always a call, and will select only the function available in the called contract to be run.

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

If strong typing is required by using `rkyv`, types need to be specified. The reason is that the Rust compiler doesn't know how to (de)serialize values to and from the argument buffer.

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
Another approach would be using raw calls using `Session::call_raw`, but then developers need to define how to (de)serialize the types.

#### Is there a wallet.execute example with some args?

A wallet exec with arbitrary data can be found <a href="https://github.com/dusk-network/rusk/blob/e7d9c9a47400c394e1cd706bd5828dd67445d25c/rusk/tests/services/stake.rs#L218" target="_blank">here</a>.

#### Why is there no msg.sender method?

[UTXO & Account model](/developer/smart-contract/core-concepts#utxo--account-model)

#### How to pause or unpause contracts?

Contract locking is available to those contracts falling in the scenario 3 of the economic protocol, This includes the cases when a vulnerability is detected either algorithmically (the contract goes in out of gas) or manually by the contract's owner (the contract is losing money).

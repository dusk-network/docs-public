---
title: Passing data across contracts
---

## Sessions

On Dusk, smart contracts are handled via sessions, as this provides a structured and reliable way to manage state changes across contract calls. By grouping a series of contract calls into sessions and using a commit to capture all state changes made during that session, complex operations to be batched together. By doing so, changes are either fully completed or not saved at all, thus maintaining the integrity of the state.

Each commit acts as a snapshot of the contract state at a particular point in time. When new sessions are initiated, they start with the base state from these commits. This design ensures that the state is not only consistent across sessions but also provides a clear rollback path to a legitimate state if a session encounters issues that requires a reversion to a previous state. 

Additionally, by grouping contract calls into sessions with commits, error handling can be more effectively managed. If an error occurs during a session, the changes can be discarded, and the contract state can revert to the last committed state. 

Since each commit represents a definitive state at a certain point, it's easier to trace how contract states evolved over time. 

Sessions provide isolated execution environments within the VM, allowing developers to deploy contracts, call methods, and manage state changes without affecting other sessions.

Developers have the capability to write ephemeral data within a smart contract, meaning this data can be temporarily stored and destroyed after the call, but still retrieved later within the contract's lifecycle.

## Retrieving call context

A common practice for developers is to pass a struct called ```CallContext``` to contract functions. This struct includes essential information such as the signature, public key, counter, and more.

However, there’s a more efficient approach that developers might prefer: utilizing ```rusk-abi::context```. This allows for the retrieval of the call context directly within the current execution environment, eliminating the need to pass it around explicitly. This method not only streamlines the code but also makes function signatures cleaner.

It's important to note that the formal caller of sessions in a blockchain environment is the node. Consequently, any data available in developer tests may not be accessible by the protocol itself. When instantiating a session, developers can pass ```SessionData```, which includes ```key-value``` pairs that the contract can retrieve using ```piecrust_uplink::meta_data```. This mechanism is how Dusk exposes data, like block height, to smart contracts.

A practical example can be see <a href="https://github.com/dusk-network/piecrust/blob/f4d5951da3c7d2a6ea77ae63e33dfc9c49ff2d93/piecrust/tests/everest.rs#L18" target="_blank" >here</a>.

## Serialized Structures
One important consideration is that data retrieved in one context may not be available in another. To circumvent this issue, developers can create serializable structures using ```rkyv``` and ```bytecheck```, and pass these structures into the contract. Here’s an example:

```rust
#[derive(Archive, Deserialize, Serialize)]
#[archive_attr(CheckBytes)]
struct FnData {
    signature: Signature,
    public_key: PublicKey,
    counter: u64,
}
```

By adopting this approach, developers ensure that the necessary data is encapsulated within the structure, providing a robust and flexible way to manage and retrieve data within smart contracts.


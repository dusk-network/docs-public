---
title: Sessions
---

SessionInner
Developers may find themselves passing to the contract functions a struct called CallContext, as this struct contains info like signature, public key. counter among other things.


Devs may prefer having something like rusk-abi::context available to them, so that they can retrieve the context under which the current call was made instead of passing it around (with the added benefit of making calls signature cleaner)

For these reasons, developers may ask if it’s possible to extend SessionInner  to contain something like call_context.

The objective would be for devs to have an area where they can write some data
that is not saved in the contract and can be destroyed after the call and that can be retrieved later at some point inside the contract

To answer the above, It needs to be kept in mind that the formal caller of sessions are the nodes, and any data that is made available in the developer tests will not necessarily be available by protocol.
Also, when you instantiate a session you can pass SessionData, which contain keyed bits of data that can be retrieved by the contract using piecrust_uplink::meta_data.
This is actually how Dusk makes data like block height available to the contracts.

For further details, the following example can be useful:
https://github.com/dusk-network/piecrust/blob/f4d5951da3c7d2a6ea77ae63e33dfc9c49ff2d93/piecrust/tests/everest.rs#L18

Anyway, that data will likely not be available in another context. This means that if you deploy the contract on a normal chain the overwhelming likelihood is that your contract will panic when you fetch this data.

An alternative to this is creating structures that can be serialized using rkyv and bytecheck and pass them into the contract, like:

#[derive(Archive, Deserialize, Serialize)]
#[archive_attr(CheckBytes)]
struct FnData {
    signature: Signature,
    public_key: PublicKey,
    counter: u64,
}

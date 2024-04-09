---
title: Wallet Core Library
description: Usage documentation about the dusk-wallet-js library
---

This is documentation for how to use the wallet-core library from any programming language of your preference. 

This wallet-core is used in a js library for the web and a rust library (wallet-cli) through wasmer. They are both examples on how to use this library.

This wiki documents how to sign transactions or extend your own code to talk to the blockchain.

**NOTE**: When calling any ffi functions in the library, refer to the latest documentation of the type of the arguments of the function, every function takes a json argument.

Types are defined in `assets/schema.json` and a types.rs is generated with the documented types.

## Creating a transaction

The transaction creation happens with the [`execute`](https://github.com/dusk-network/wallet-core/blob/main/src/ffi.rs#L131) function in the `wallet-core`
this gives out the bytes for the unproven transaction which we'll learn how to prove later on...

```js
 const output = {
    receiver: receiver,
    // if you want to hide the value of the transaction, could be "transparent"
    note_type: "Obfuscated",
    // ref id of the transaction
    ref_id: 1,
    value: amount,
};

const json = {
    "call": null,
    "crossover": null,
    "fee": null, 
    "inputs": ..., // they are the unspent notes which are persisted from the sync
    "output": output,
    "openings": ..., // fetched from the node, see dusk-wallet-js/wallet-cli on how to do it
    "gas_limit": ...,
    "gas_price": ...,
    "refund": ...,
    "rng_seed": [...], // random bytes
    "sender_index": 0, // the key index of the sender of the transactions
    "seed": [...], // seed bytes of the user who is sending the transaction
}

const bytes = call_execute(wasm, json);
```

This gives out the bytes of the unproven transaction, before proving that, lets call more complicated method like stake.

We call [`get_stct_proof`](https://github.com/dusk-network/wallet-core/blob/main/src/compat/stake.rs#L43) to get the proof we needed to embed in the transaction
```js
const getStctProofArgs = {
    "rng_seed": [...],
    "seed": [...],
    "refund": "..",
    "value": 400000000, // lets assume we are staking 4000 dusk
    "sender_index": 0,
    "gas_limit": ...,
    "gas_price": ...,
}

const { bytes, signature, crossover, blinder, fee } = call_get_stct_proof(wasm, getStctProofArgs);
```

Now we need to obtain the stct proof from the prover, to do that we just

```js
const stctProofReq = await request(
    bytes,
    "prove_stct",
    false,
    "https://provers.dusk.network/",
    "rusk",
    "2"
);
```

Then we get the call data required for this transaction since it's a different contract on the blockchain


to do that we call [`get_stake_call_data`](https://github.com/dusk-network/wallet-core/blob/main/src/compat/stake.rs#L153)

```js
const getStakeCallDataArgs = {
    "staker_index": 0,
    "seed": [...],
    "proof": stctProofReq,
    "value": 400000000,
    "counter": 0, // we get the actual counter from the stake-info from the node
}

const { contract, method, payload } = call_stake_call_data(wasm, getStakeCallDataArgs);
```

Now we just call execute like we did for transfer but with the following callData

```js
const callData = {
    "contract": contract,
    "method": method,
    "payload": payload
};

const json = {
    "call": callData,
    ...
}

const { tx } =  call_execute(wasm, json);
```

## Proving

Then we convert the rkyv serialized unproven transaction to var bytes using 
```js
const args = JSON.stringify({
   bytes: unprovenTx,
});

const txSerialized = jsonFromBytes(call(wasm, args, wasm.unproven_tx_to_bytes)).serialized;
```

Now we can send it to the node for proving!

To obtain the proof, send the prove_execute request to the node

```js
// send the prove execute
const proofReq = await request(
      varBytes,
      "prove_execute",
      false,
      "https://provers.dusk.network",
      "rusk",
      "2"
);
// get the response bytes 
const buffer = await proofReq.arrayBuffer();
const bytes = new Uint8Array(buffer);

// call the prove_tx function 
const args = JSON.stringify({
    unproven_tx: unprovenTx,
    proof: Array.from(proof),
});

const provedTx = jsonFromBytes(call(wasm, args, wasm.prove_tx));
```

Now you have to preverify the transaction before propagating it to the blockchain

```js
// preverify the proved tx
const preVerifyReq = await request(
      provedTx,
      "preverify",
      false,
      undefined,
      "rusk",
      "2"
);

// log the status of the request (should be 200)
console.log("preverify request status code: " + preVerifyReq.status);

// propagate the proved tx
const propagateReq = await request(
      tx,
      "propagate_tx",
      false,
      undefined,
      "Chain",
      "2"
);

console.log("propagating chain request status: " + propagateReq.status);
```
And we should get 200 request for everything.

The wallet-cli library is an example of how to do these operations, refer to it until more fuller documentation is online.
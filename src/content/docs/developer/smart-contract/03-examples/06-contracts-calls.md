---
title: Contracts calls
---

This page provides an overview of the <a href="https://github.com/dusk-network/piecrust/tree/main/contracts/callcenter" target="_blank">callcenter</a> contract, that shows how to interact with contracts by calling their functions.

It is recommended to checkout the <a href="https://github.com/dusk-network/piecrust/blob/main/piecrust/tests/callcenter.rs" target="_blank">test</a>.
More specifically, it is explained how to query and execute functions on contracts and handle transactions.


## Query and Increment

In this example we use a contract to read the value of the `counter` of another contract by using the `query_counter` function. This function takes a `ContractId` of the counter contract and returns the counter's value.

```rust
let value: i64 = session.call(counter_id, "read_value", &(), LIMIT)?.data;
assert_eq!(value, 0xfc);
```

To increment the counter value, use the `increment_counter` function. 

```rust
session.call::<_, ()>(center_id, "increment_counter", &counter_id, LIMIT)?;
```

To query a function from another contract, the `delegate_query` function is used. This allows for calling a function on another contract and returns the value of the counter.

```rust
let res = session.call::<_, Result<Vec<u8>, ContractError>>(
    center_id,
    "delegate_query",
    &(counter_id, String::from("read_value"), Vec::<u8>::new()),
    LIMIT,
)?.data.expect("ICC should succeed");
let value: i64 = rkyv::from_bytes(&res).expect("Deserialization to succeed");
```

To execute a function in another contract, use the `delegate_transaction` function:

```rust
session.call::<_, ()>(
    center_id,
    "delegate_transaction",
    &(counter_id, String::from("increment"), Vec::<u8>::new()),
    LIMIT,
)?;
```

## Returning Contract ID

To get the current contract's ID, use the `return_self_id` function. This can help in verifying the contract's identity.

```rust
let value: ContractId = session.call(center_id, "return_self_id", &(), LIMIT)?.data;
assert_eq!(value, center_id);
```

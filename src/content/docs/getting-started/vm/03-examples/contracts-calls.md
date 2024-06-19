---
title: Contracts calls
---

Guide to Making Calls to Contracts
Overview
This guide explains how to interact with contracts using the Callcenter contract. We'll cover querying and executing functions on other contracts, handling transactions, and checking contract states. For detailed code, refer to the contract and test files.

Key Functions and Usage
Querying a Counter Value
To read the value of a counter from another contract, use the query_counter function. This function takes a ContractId of the counter contract and returns the counter's value.

Example Usage in Tests:
In the test file, you can deploy a counter contract and then use query_counter to read its value:

rust
Copiar código
let value: i64 = session.call(counter_id, "read_value", &(), LIMIT)?.data;
assert_eq!(value, 0xfc);
This code deploys the counter contract, reads its value directly, and asserts the expected value.

Incrementing a Counter
To increment the counter value, use the increment_counter function. This function sends an increment command to the specified counter contract.

Example Usage in Tests:
After deploying the counter and callcenter contracts, you can increment the counter via the callcenter:

rust
Copiar código
session.call::<_, ()>(center_id, "increment_counter", &counter_id, LIMIT)?;
This code increments the counter through the callcenter and verifies the updated value.

Delegating a Query
To query a function from another contract, use the delegate_query function. It allows calling a function on another contract and returns the result.

Example Usage in Tests:
You can delegate a query to read the counter value:

rust
Copiar código
let res = session.call::<_, Result<Vec<u8>, ContractError>>(
    center_id,
    "delegate_query",
    &(counter_id, String::from("read_value"), Vec::<u8>::new()),
    LIMIT,
)?.data.expect("ICC should succeed");
let value: i64 = rkyv::from_bytes(&res).expect("Deserialization to succeed");
assert_eq!(value, 0xfc);
This code delegates the query to read the counter value through the callcenter.

Delegating a Transaction
To execute a function in another contract, use the delegate_transaction function. This is useful for performing operations like incrementing a counter in another contract.

Example Usage in Tests:
You can delegate a transaction to increment the counter:

rust
Copiar código
session.call::<_, ()>(
    center_id,
    "delegate_transaction",
    &(counter_id, String::from("increment"), Vec::<u8>::new()),
    LIMIT,
)?;
This code delegates the increment operation and verifies the counter's value.

Checking Contract Caller
To check if the current caller is the contract itself, use the calling_self function. This can be used to verify if a function is being called internally.

Example Usage in Tests:
You can test if the callcenter is calling itself:

rust
Copiar código
let calling_self: bool = session.call(center_id, "calling_self", &center_id, LIMIT)?.data;
assert!(calling_self);
This code checks if the callcenter recognizes itself as the caller.

Returning Contract ID
To get the current contract's ID, use the return_self_id function. This can help in verifying the contract's identity.

Example Usage in Tests:
You can retrieve and verify the callcenter's ID:

rust
Copiar código
let value: ContractId = session.call(center_id, "return_self_id", &(), LIMIT)?.data;
assert_eq!(value, center_id);
This code retrieves the callcenter's ID and confirms it matches the expected value.

Conclusion
This guide provides a high-level overview of interacting with contracts using the Callcenter contract. The examples demonstrate how to perform basic operations such as reading and incrementing counter values, delegating queries and transactions, and verifying contract states. For detailed implementations, refer to the contract and test files.


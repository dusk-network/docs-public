---
title: Monitoring Gas Usage
---

This page provides an overview on how to manage and track gas usage in smart contracts. By tracking the gas spent on contract calls, developers can gain insights on the computational cost and optimize the performance of their contracts.

Developers are encouraged to have a deeper look at the <a href="https://github.com/dusk-network/piecrust/blob/main/contracts/spender/src/lib.rs" target="_blank">spender contract</a>, as well as the <a href="https://github.com/dusk-network/piecrust/blob/main/piecrust/tests/spender.rs" target="_blank">test file</a>.

The contract uses a `get_limit_and_spent` method which tracks gas limits and consumption before and after inter-contract calls:

```rust
pub fn get_limit_and_spent(&self) -> (u64, u64, u64, u64, u64) {
    let self_id = uplink::self_id();
    let limit = uplink::limit();
    let spent_before = uplink::spent();

    match uplink::caller().is_uninitialized() {
        true => {
            let (called_limit, called_spent, _, _, _): (u64, u64, u64, u64, u64) = 
                uplink::call(self_id, "get_limit_and_spent", &()).expect("Self query should succeed");

            let spent_after = uplink::spent();
            (limit, spent_before, spent_after, called_limit, called_spent)
        }
        false => (limit, spent_before, 0, 0, 0),
    }
}
```

The test file provides a way to handle out-of-gas scenarios, preventing unexpected contract failures and improve debugging. This is done by using a method that consumes all provided gas by causing a panic to simulate out-of-gas scenarios:

```rust
#[test]
pub fn fails_with_out_of_gas() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;
    let counter_id = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;

    let err = session.call::<_, i64>(counter_id, "read_value", &(), 1).expect_err("should error with no gas");
    assert!(matches!(err, Error::OutOfGas));

    Ok(())
}
```

Developers can define internal gas limits for calls to control execution costs and prevent excessive gas consumption. 
The test file shows how to verify that the gas spent aligns with the defined limits for contract calls:

```rust
#[test]
pub fn contract_sets_call_limit() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    let mut session_1st = vm.session(SessionData::builder())?;
    let mut session_2nd = vm.session(SessionData::builder())?;
    session_1st.deploy(contract_bytecode!("spender"), ContractData::builder().owner(OWNER), LIMIT)?;
    session_1st.deploy(contract_bytecode!("callcenter"), ContractData::builder().owner(OWNER), LIMIT)?;

    let spender_id = session_2nd.deploy(contract_bytecode!("spender"), ContractData::builder().owner(OWNER), LIMIT)?;
    let callcenter_id = session_2nd.deploy(contract_bytecode!("callcenter"), ContractData::builder().owner(OWNER), LIMIT)?;

    const FIRST_LIMIT: u64 = 1175;
    const SECOND_LIMIT: u64 = 2175;

    let receipt = session_1st.call::<_, Result<(), ContractError>>(callcenter_id, "call_spend_with_limit", &(spender_id, FIRST_LIMIT), LIMIT)?;
    let spent_first = receipt.gas_spent;

    let receipt = session_2nd.call::<_, Result<(), ContractError>>(callcenter_id, "call_spend_with_limit", &(spender_id, SECOND_LIMIT), LIMIT)?;
    let spent_second = receipt.gas_spent;

    assert_eq!(spent_second - spent_first, SECOND_LIMIT - FIRST_LIMIT);

    Ok(())
}
```

Finally, by using the `get_limit_and_spent` method, developers can analyze gas limits and usage before and after contract calls. This is useful to understand the actual computational costs and identify optimization opportunities:

```rust
#[test]
pub fn limit_and_spent() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    const LIMIT: u64 = 10000;
    let mut session = vm.session(SessionData::builder())?;
    let spender_id = session.deploy(contract_bytecode!("spender"), ContractData::builder().owner(OWNER), LIMIT)?;

    let receipt = session.call::<_, (u64, u64, u64, u64, u64)>(spender_id, "get_limit_and_spent", &(), LIMIT)?;
    let (limit, spent_before, spent_after, called_limit, called_spent) = receipt.data;
    let spender_spent = receipt.gas_spent;

    assert_eq!(limit, LIMIT, "should be the initial limit");

    println!("=== Spender costs ===");
    println!("limit       : {}", limit);
    println!("spent before: {}", spent_before);
    println!("spent after : {}\n", spent_after);
    println!("called limit: {}", called_limit);
    println!("called spent: {}", called_spent);
    println!("===  Actual cost  ===");
    println!("actual cost : {}", spender_spent);

    Ok(())
}
```

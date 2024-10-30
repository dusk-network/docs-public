---
title: Upgrade a contract
description: Example of how to upgrade Dusk contracts.
---

This example shows how to upgrade a contract to a new version while preserving its state:

```rust
#[test]
fn migration() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;

    let contract = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;

    session.call::<_, ()>(contract, "increment", &(), LIMIT)?;
    session.call::<_, ()>(contract, "increment", &(), LIMIT)?;

    let root = session.commit()?;

    let mut session = vm.session(SessionData::builder().base(root))?;

    session = session.migrate(contract, contract_bytecode!("double_counter"), ContractData::builder(), LIMIT, |new_contract, session| {
        let old_counter_value = session.call::<_, i64>(contract, "read_value", &(), LIMIT)?.data;
        let (left_counter_value, _) = session.call::<_, (i64, i64)>(new_contract, "read_values", &(), LIMIT)?.data;
        let diff = old_counter_value - left_counter_value;
        for _ in 0..diff {
            session.call::<_, ()>(new_contract, "increment_left", &(), LIMIT)?;
        }
        Ok(())
    })?;

    let root = session.commit()?;
    let mut session = vm.session(SessionData::builder().base(root))?;

    let (left_counter, right_counter) = session.call::<_, (i64, i64)>(contract, "read_values", &(), LIMIT)?.data;
    assert_eq!(left_counter, 0xfe);
    assert_eq!(right_counter, 0xcf);

    Ok(())
}

```

The following example shows how to modify metadata attributes like `OWNER`:

```rust
#[test]
fn migration_new_owner() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;

    const OWNER: [u8; 33] = [1u8; 33];
    const NEW_OWNER: [u8; 33] = [2u8; 33];

    let contract = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;

    let root = session.commit()?;

    let mut session = vm.session(SessionData::builder().base(root))?;

    session = session.migrate(contract, contract_bytecode!("metadata"), ContractData::builder().owner(NEW_OWNER), LIMIT, |_, _| Ok(()))?;

    let owner = session.call::<_, [u8; 33]>(contract, "read_owner", &(), LIMIT)?.data;
    assert_eq!(owner, NEW_OWNER);

    Ok(())
}
```

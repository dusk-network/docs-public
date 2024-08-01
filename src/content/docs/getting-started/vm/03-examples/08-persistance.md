---
title: Persistence
---

This page provides an overview on how to manage persistence in smart contracts using sessions. 

Developers are encouraged to have a deeper look at the <a href="https://github.com/dusk-network/piecrust/blob/main/piecrust/tests/persistence.rs" target="_blank">persistence test</a> file.

Each session performs a series of contract calls, and the state is captured through a commit.
Commits ensure that the state of the contracts can be saved and restored accurately, while new sessions are created using the base state from previous commits.

In the example below, two contracts (counter and box) are deployed, and their states are manipulated and committed. These states are then restored in new sessions to verify persistence.

```rust
#[test]
fn session_commits_persistence() -> Result<(), Error> {
    let vm = VM::ephemeral()?;

    let id_1;
    let id_2;
    let commit_1;
    
    {
        let mut session = vm.session(SessionData::builder())?;
        id_1 = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;
        id_2 = session.deploy(contract_bytecode!("box"), ContractData::builder().owner(OWNER), LIMIT)?;
        
        session.call::<_, ()>(id_1, "increment", &(), LIMIT)?;
        session.call::<i16, ()>(id_2, "set", &0x11, LIMIT)?;
        assert_eq!(session.call::<_, i64>(id_1, "read_value", &(), LIMIT)?.data, 0xfd);
        assert_eq!(session.call::<_, Option<i16>>(id_2, "get", &(), LIMIT)?.data, Some(0x11));
        commit_1 = session.commit()?;
    }

    let commit_2;
    {
        let mut session = vm.session(SessionData::builder().base(commit_1))?;
        session.call::<_, ()>(id_1, "increment", &(), LIMIT)?;
        session.call::<i16, ()>(id_2, "set", &0x12, LIMIT)?;
        assert_eq!(session.call::<_, i64>(id_1, "read_value", &(), LIMIT)?.data, 0xfe);
        assert_eq!(session.call::<_, Option<i16>>(id_2, "get", &(), LIMIT)?.data, Some(0x12));
        commit_2 = session.commit()?;
    }

    {
        let vm2 = VM::new(vm.root_dir())?;
        let mut session = vm2.session(SessionData::builder().base(commit_1))?;
        assert_eq!(session.call::<_, i64>(id_1, "read_value", &(), LIMIT)?.data, 0xfd);
        assert_eq!(session.call::<_, Option<i16>>(id_2, "get", &(), LIMIT)?.data, Some(0x11));
    }

    {
        let vm3 = VM::new(vm.root_dir())?;
        let mut session = vm3.session(SessionData::builder().base(commit_2))?;
        assert_eq!(session.call::<_, i64>(id_1, "read_value", &(), LIMIT)?.data, 0xfe);
        assert_eq!(session.call::<_, Option<i16>>(id_2, "get", &(), LIMIT)?.data, Some(0x12));
    }
    Ok(())
}
```

##### Preserving state across sessions

In this example, the state of two contracts is verified to persist across sessions.

```rust
#[test]
fn contracts_persistence() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;
    let id_1 = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;
    let id_2 = session.deploy(contract_bytecode!("box"), ContractData::builder().owner(OWNER), LIMIT)?;

    session.call::<_, ()>(id_1, "increment", &(), LIMIT)?;
    session.call::<i16, ()>(id_2, "set", &0x11, LIMIT)?;
    assert_eq!(session.call::<_, i64>(id_1, "read_value", &(), LIMIT)?.data, 0xfd);
    assert_eq!(session.call::<_, Option<i16>>(id_2, "get", &(), LIMIT)?.data, Some(0x11));

    let commit_1 = session.commit()?;

    let vm2 = VM::new(vm.root_dir())?;
    let mut session2 = vm2.session(SessionData::builder().base(commit_1))?;
    assert_eq!(session2.call::<_, i64>(id_1, "read_value", &(), LIMIT)?.data, 0xfd);
    assert_eq!(session2.call::<_, Option<i16>>(id_2, "get", &(), LIMIT)?.data, Some(0x11));
    Ok(())
}
```

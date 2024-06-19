---
title: Persistence
---

Guide to Managing Persistence in Smart Contracts
This guide provides an in-depth explanation of managing persistence in smart contracts using sessions, commits, and metadata. We'll highlight the main insights, provide context, and explain how to use these concepts in your smart contracts. If you're interested in the implementation details, you can refer to the code of the test or contract provided.

Overview
This guide covers:

Session and Commit Management
Contracts Persistence
Contract Migration
Session and Commit Management
Purpose: Demonstrates how to create and persist session states using commits and how to revert to previous states by creating new sessions based on specific commits.

Key Concepts
Commit Creation:

Each session performs a series of contract calls, and the state is captured through a commit.
Commits ensure that the state of the contracts can be saved and restored accurately.
Session Restoration:

New sessions are created using the base state from previous commits.
This ensures that the state is consistent and can be reverted if necessary.
Example
In the example below, two contracts (counter and box) are deployed, and their states are manipulated and committed. These states are then restored in new sessions to verify persistence.

rust
Copiar código
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
Contracts Persistence
Purpose: Ensures that the state of multiple contracts is preserved across different sessions by committing and restoring states.

Key Concepts
State Consistency:

Verifies that the state of contracts remains unchanged across sessions.
After deploying and interacting with contracts, their states are committed and restored in new sessions to verify consistency.
State Verification:

Ensures that the contract states are correctly saved and can be restored accurately.
Example
In this example, the state of two contracts is verified to persist across sessions.

rust
Copiar código
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
Contract Migration
Purpose: Demonstrates how to migrate a contract to a new version while preserving its state and possibly modifying attributes like the owner.

Key Concepts
Contract Upgrade Mechanism:

Shows how to migrate a contract to a new version while preserving its state.
Ensures continuity by transferring the state from the old contract to the new contract.
State Preservation:

During migration, the state from the old contract is transferred to the new contract.
Owner Modification:

Demonstrates how to change the owner of a contract during migration.
Contract ID Consistency:

Ensures that the contract ID remains the same across migrations, which is crucial for maintaining references to the contract.
Examples
State Preservation and Upgrade Mechanism:

rust
Copiar código
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
Owner Modification:

rust
Copiar código
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
Understanding the Absence of an Associated Contract for the Test File
The tests provided verify the functionality and persistence of contracts (counter, box, metadata, double_counter). The actual contract code for these tests is not included here, but these contracts are assumed to be simple contracts with the following functionalities:

Counter Contract:

Increments and reads a counter value.
Box Contract:

Sets and gets a value.
Metadata Contract:

Reads the owner and contract ID, and manages other metadata.
Double Counter Contract:

Manages two counters and provides functionalities to read and increment them.
These contracts are part of the piecrust repository, and the tests ensure their correct behavior, persistence, and migration.
---
title: Sessions example
---

In this section we will look at practical examples on how to manage sessions and handle state persistance in smart contracts. The original test file can be found <a href="https://github.com/dusk-network/piecrust/blob/f4d5951da3c7d2a6ea77ae63e33dfc9c49ff2d93/piecrust/tests/commit.rs" target="_blank">here</a>.


## Creating and Using Sessions

A session is created and used to deploy a contract and call its methods.
If the session is dropped without committing, any state changes made during the session are not preserved.
```rust
let mut session = vm.session(SessionData::builder())?;
let id = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;
session.call::<_, ()>(id, "increment", &(), LIMIT)?;
```

## Committing State Changes

To preserve state changes, the session must commit the state.
After committing, a new session can be used to verify that the changes are persisted.
```rust
let commit_id = session.commit()?;
let mut new_session = vm.session(SessionData::builder().base(commit_id))?;
assert_eq!(new_session.call::<_, i64>(id, "read_value", &(), LIMIT)?.data, 0xfd);
```

## Multiple Contracts

Deploying and interacting with multiple contracts within the same session is a common scenario. The following example demonstrates how to commit and restore states for multiple contracts:

```rust
let mut session = vm.session(SessionData::builder())?;
let id_1 = session.deploy(contract_bytecode!("counter"), ContractData::builder().owner(OWNER), LIMIT)?;
let id_2 = session.deploy(contract_bytecode!("box"), ContractData::builder().owner(OWNER), LIMIT)?;
session.commit()?;
```

## Concurrency

Running multiple sessions concurrently using threads can improve efficiency and performance. Each thread can make changes and commit them, ensuring no conflicts and unique commits:

```rust
const THREAD_NUM: usize = 6;
let mut threads = Vec::with_capacity(THREAD_NUM);
for n in 0..THREAD_NUM {
    let session = vm.session(SessionData::builder().base(root))?;
    threads.push(thread::spawn(move || increment_counter_and_commit(session, counter, n + 1)));
}
```

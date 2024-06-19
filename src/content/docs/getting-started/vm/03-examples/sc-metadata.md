---
title: Metadata
---

Guide to Managing Metadata in Smart Contracts
This guide will help you understand how to manage and verify metadata in your smart contracts. We'll cover the main concepts, provide context, and highlight key insights using the Metadata contract example. By the end of this guide, you should have a solid understanding of how to set, read, and verify metadata such as owner information and various contract attributes.

Overview
The Metadata contract is designed to manage and retrieve various metadata attributes for smart contracts. The following key functionalities are covered:

Owner and Contract ID Management
Reading and Verifying Metadata
Cross-Contract Metadata Retrieval
Session Persistence
Contract Structure
Metadata Contract
The contract uses #![no_std] to operate without the standard Rust library, making it suitable for environments with limited resources. It leverages the piecrust_uplink library to interact with the host environment.

Core Functions:

read_owner: Retrieves the owner of the current contract.
read_id: Retrieves the ID of the current contract.
read_owner_of: Retrieves the owner of a specified contract.
read_free_limit_of: Retrieves the free limit of a specified contract.
read_free_price_hint_of: Retrieves the free price hint of a specified contract.
rust
Copiar código
#![no_std]

use piecrust_uplink as uplink;
use uplink::ContractId;

/// Struct that describes the (empty) state of the Metadata contract
pub struct Metadata;

/// State of the Metadata contract
static mut STATE: Metadata = Metadata;

impl Metadata {
    pub fn read_owner(&self) -> [u8; 33] {
        uplink::self_owner()
    }

    pub fn read_id(&self) -> ContractId {
        uplink::self_id()
    }

    pub fn read_owner_of(&self, id: ContractId) -> Option<[u8; 33]> {
        uplink::owner(id)
    }

    pub fn read_free_limit_of(&self, id: ContractId) -> Option<u64> {
        uplink::free_limit(id)
    }

    pub fn read_free_price_hint_of(&self, id: ContractId) -> Option<(u64, u64)> {
        uplink::free_price_hint(id)
    }
}

/// Expose `Metadata::read_owner()` to the host
#[no_mangle]
unsafe fn read_owner(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_owner())
}

/// Expose `Metadata::read_id()` to the host
#[no_mangle]
unsafe fn read_id(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_id())
}

/// Expose `Metadata::read_owner_of()` to the host
#[no_mangle]
unsafe fn read_owner_of(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |id| STATE.read_owner_of(id))
}

/// Expose `Metadata::read_free_limit_of()` to the host
#[no_mangle]
unsafe fn read_free_limit_of(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |id| STATE.read_free_limit_of(id))
}

/// Expose `Metadata::read_free_price_hint_of()` to the host
#[no_mangle]
unsafe fn read_free_price_hint_of(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |id| STATE.read_free_price_hint_of(id))
}
Key Concepts
1. Owner and Contract ID Management
Purpose: Ensure each contract instance has a unique owner and ID, aiding in accurate tracking and interaction.

Deployment: Contracts are deployed with specific owners and contract IDs.
Verification Across Sessions: Ensures the contract's metadata remains consistent across different sessions, which is vital for stateful applications.
Example:

rust
Copiar código
const EXPECTED_OWNER: [u8; 33] = [3u8; 33];
let vm = VM::ephemeral()?;
let mut session = vm.session(SessionData::builder())?;
let id = session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(EXPECTED_OWNER), LIMIT)?;
let owner = session.call::<_, [u8; 33]>(id, "read_owner", &(), LIMIT)?.data;
let self_id = session.call::<_, ContractId>(id, "read_id", &(), LIMIT)?.data;
assert_eq!(owner, EXPECTED_OWNER);
assert_eq!(self_id, id);
2. Reading and Verifying Metadata
Purpose: Ensures metadata like free_limit and free_price_hint is accurately tracked and retrievable within the contract ecosystem.

Cross-Contract Metadata Retrieval: Demonstrates how one contract can query metadata from another, which is essential for complex contract ecosystems where contracts depend on each other’s states.
Metadata Attributes: Each contract has attributes like free_limit and free_price_hint that can be queried to understand the contract’s operational limits and costs.
Example:

rust
Copiar código
const EXPECTED_FREE_LIMIT_0: u64 = 10_000_000;
const EXPECTED_FREE_LIMIT_1: u64 = 20_000_000;
const CONTRACT_ID_0: ContractId = ContractId::from_bytes([1; 32]);
const CONTRACT_ID_1: ContractId = ContractId::from_bytes([2; 32]);

let vm = VM::ephemeral()?;
let mut session = vm.session(SessionData::builder())?;
session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(OWNER_0).contract_id(CONTRACT_ID_0).free_limit(EXPECTED_FREE_LIMIT_0), LIMIT)?;
session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(OWNER_1).contract_id(CONTRACT_ID_1).free_limit(EXPECTED_FREE_LIMIT_1), LIMIT)?;

let free_limit = session.call::<_, Option<u64>>(CONTRACT_ID_0, "read_free_limit_of", &CONTRACT_ID_1, LIMIT)?.data;
assert_eq!(free_limit, Some(EXPECTED_FREE_LIMIT_1));
Testing Metadata Contract
Purpose: Verify that the contract methods perform as expected and metadata remains consistent across sessions and contracts.

Test 1: Owner and ID Verification
Test Scenario: Deploy a contract and verify its owner and ID across session boundaries.
rust
Copiar código
#[test]
fn metadata() -> Result<(), Error> {
    const EXPECTED_OWNER: [u8; 33] = [3u8; 33];
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;
    let id = session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(EXPECTED_OWNER), LIMIT)?;
    let owner = session.call::<_, [u8; 33]>(id, "read_owner", &(), LIMIT)?.data;
    let self_id = session.call::<_, ContractId>(id, "read_id", &(), LIMIT)?.data;
    assert_eq!(owner, EXPECTED_OWNER);
    assert_eq!(self_id, id);
    let commit_id = session.commit()?;
    let mut session = vm.session(SessionData::builder().base(commit_id))?;
    let owner = session.call::<_, [u8; 33]>(id, "read_owner", &(), LIMIT)?.data;
    let self_id = session.call::<_, ContractId>(id, "read_id", &(), LIMIT)?.data;
    assert_eq!(owner, EXPECTED_OWNER);
    assert_eq!(self_id, id);
    Ok(())
}
Test 2: Cross-Contract Owner Verification
Test Scenario: Deploy multiple contracts and verify that each contract can correctly retrieve the owner's metadata of another contract.
rust
Copiar código
#[test]
fn owner_of() -> Result<(), Error> {
    const EXPECTED_OWNER_0: [u8; 33] = [3u8; 33];
    const EXPECTED_OWNER_1: [u8; 33] = [4u8; 33];
    const CONTRACT_ID_0: ContractId = ContractId::from_bytes([1; 32]);
    const CONTRACT_ID_1: ContractId = ContractId::from_bytes([2; 32]);
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;
    session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(EXPECTED_OWNER_0).contract_id(CONTRACT_ID_0), LIMIT)?;
    session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(EXPECTED_OWNER_1).contract_id(CONTRACT_ID_1), LIMIT)?;
    let owner = session.call::<_, Option<[u8; 33]>>(CONTRACT_ID_0, "read_owner_of", &CONTRACT_ID_1, LIMIT)?.data;
    assert_eq!(owner, Some(EXPECTED_OWNER_1));
    let owner = session.call::<_, Option<[u8; 33]>>(CONTRACT_ID_1, "read_owner_of", &CONTRACT_ID_0, LIMIT)?.data;
    assert_eq!(owner, Some(EXPECTED_OWNER_0));
    Ok(())
}
Test 3: Free Limit and Price Hint Verification
Test Scenario: Verify that the free_limit and free_price_hint metadata attributes are correctly retrieved across contracts.
rust
Copiar código
#[test]
fn free_limit_and_price_hint_of() -> Result<(), Error> {
    const OWNER_0: [u8; 33] = [3u8; 33];
    const OWNER_1: [u8; 33] = [4u8; 33];
    const EXPECTED_FREE_LIMIT_0: u64 = 10_000_000;
    const EXPECTED_FREE_LIMIT_1: u64 = 20_000_000;
    const EXPECTED_FREE_PRICE_HINT_0: (u64, u64) = (2, 1);
    const EXPECTED_FREE_PRICE_HINT_1: (u64, u64) = (3, 1);
    const CONTRACT_ID_0: ContractId = ContractId::from_bytes([1; 32]);
    const CONTRACT_ID_1: ContractId = ContractId::from_bytes([2; 32]);
    let vm = VM::ephemeral()?;
    let mut session = vm.session(SessionData::builder())?;
    session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(OWNER_0).contract_id(CONTRACT_ID_0).free_limit(EXPECTED_FREE_LIMIT_0).free_price_hint(EXPECTED_FREE_PRICE_HINT_0), LIMIT)?;
    session.deploy(contract_bytecode!("metadata"), ContractData::builder().owner(OWNER_1).contract_id(CONTRACT_ID_1).free_limit(EXPECTED_FREE_LIMIT_1).free_price_hint(EXPECTED_FREE_PRICE_HINT_1), LIMIT)?;
    let free_limit = session.call::<_, Option<u64>>(CONTRACT_ID_0, "read_free_limit_of", &CONTRACT_ID_1, LIMIT)?.data;
    assert_eq!(free_limit, Some(EXPECTED_FREE_LIMIT_1));
    let free_limit = session.call::<_, Option<u64>>(CONTRACT_ID_1, "read_free_limit_of", &CONTRACT_ID_0, LIMIT)?.data;
    assert_eq!(free_limit, Some(EXPECTED_FREE_LIMIT_0));
    let free_price_hint = session.call::<_, Option<(u64, u64)>>(CONTRACT_ID_0, "read_free_price_hint_of", &CONTRACT_ID_1, LIMIT)?.data;
    assert_eq!(free_price_hint, Some(EXPECTED_FREE_PRICE_HINT_1));
    let free_price_hint = session.call::<_, Option<(u64, u64)>>(CONTRACT_ID_1, "read_free_price_hint_of", &CONTRACT_ID_0, LIMIT)?.data;
    assert_eq!(free_price_hint, Some(EXPECTED_FREE_PRICE_HINT_0));
    Ok(())
}
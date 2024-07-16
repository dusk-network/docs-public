---
title: Metadata
---


Smart contract metadata includes a variety of information that describes the smart contract's structure, functionality, and other relevant details.

Developers are encouraged to have a look at the <a href="https://github.com/dusk-network/piecrust/blob/main/contracts/metadata/src/lib.rs" target="_blank" >metadata contract</a> and check out the <a href="https://github.com/dusk-network/piecrust/blob/main/piecrust/tests/metadata.rs" target="_blank" >metadata test</a> file.


The metadata contract is designed to manage and retrieve various metadata attributes for smart contracts, and defines the following functions:

```read_owner```: Retrieves the owner of the current contract.
```read_id```: Retrieves the ID of the current contract.
```read_owner_of```: Retrieves the owner of a specified contract.
```read_free_limit_of```: Retrieves the free limit of a specified contract.
`read_free_price_hint_of```: Retrieves the free price hint of a specified contract.

These functions are defined as follows:
```rust
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
```

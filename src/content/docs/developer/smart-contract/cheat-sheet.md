---
title: Dusk Smart Contract Cheat Sheet
description: Quick information lookup on code snippets and infos for Dusk smart contracts.
---

Collection of code snippets and information bits on smart contract development for Dusk

## Common Data Structures

> Because we program for WASM in no-std some data structures are not available. Here is a list of common alternatives

| Example                                                                                        | Explanation                                                                           |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [BTreeMap](https://doc.rust-lang.org/nightly/alloc/collections/btree_map/struct.BTreeMap.html) | Alternative to HashMap in a no-std env |
| [BTreeSet](https://doc.rust-lang.org/beta/alloc/collections/btree_set/struct.BTreeSet.html)    | Alternative to HashSet in a no-std env |

:::tip[BTree Information]
Data structures based on B-Trees require the Ord trait to be implemented for the values which get inserted. (In the case of a Map, the Ord needs to be implemented on the Key)
:::

## Common Dependencies

### No-std Crates

#### Core

#### Alloc

The alloc crate needs to explicitly be imported in order to use heap-allocated values in a #![no-std] environment.
More information on the alloc crate can be found <a href="https://doc.rust-lang.org/alloc/" target="_blank">here</a>

## Empty Contract Template

```rust
// lib.rs
#![no_std]

extern crate alloc;

mod contract {
    use rusk_abi::wrap_call;

    static mut STATE: MyContract = MyContract { counter: 0 };

    /// My contract state struct
    struct MyContract {
        counter: u64,
    }

    impl MyContract {
        pub fn increment(&mut self, value: u64) {
            self.counter += 1;
        }

        fn init(&mut self) -> Self {
            MyContract { counter: 1 }
        }
    }

    /// Needed to call the increment function from outside the contract
    #[no_mangle]
    unsafe fn increment(arg_len: u32) -> u32 {
        wrap_call(arg_len, |value| STATE.increment(value))
    }
}
```

```toml
// Cargo.toml
[package]
name = "MyContract"
version = "0.1.0"
edition = "2021"

[dependencies]
rusk-abi = "0.11.0"
```

## Example Makefile to compile to WASM

```bash
contract: ## Build contract
	@RUSTFLAGS="-C link-args=-zstack-size=65536" \
	cargo build \
	  --release \
	  --manifest-path=contract/Cargo.toml \
	  --color=always \
	  -Z build-std=core,alloc \
	  --target wasm32-unknown-unknown
	@mkdir -p target/stripped
	@find target/wasm32-unknown-unknown/release -maxdepth 1 -name "*.wasm" \
	    | xargs -I % basename % \
	    | xargs -I % wasm-tools strip -a \
	 	          target/wasm32-unknown-unknown/release/% \
	 	          -o target/stripped/%

#test: contract ## Run all tests
#	@cargo test \
#	  --manifest-path=tests/Cargo.toml \
#	  --all-features \
#	  --color=always
#	@cargo test \
#	  --manifest-path=project/Cargo.toml \
#	  --color=always

MAX_COUNTER_CONTRACT_SIZE = 8192

.PHONY: contract test
```

## More references

The A <a href="https://cheats.rs/" target="_blank">Rust Language Cheat Sheet</a> is another great cheat sheet which can be used as a reference for Rust Code. 
Note: Not all examples apply due to our no-std:
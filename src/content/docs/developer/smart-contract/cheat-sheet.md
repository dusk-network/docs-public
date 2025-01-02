---
title: Smart Contract Cheat Sheet
description: Access to examples tips to streamline your smart contract development on Dusk.
---

Collection of code snippets and information bits on smart contract development for Dusk.

## Common Data Structures

> Because we program for WASM in no-std some data structures are not available. Here is a list of common alternatives:

| Example                                                                                        | Explanation                                                                           |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [BTreeMap](https://doc.rust-lang.org/nightly/alloc/collections/btree_map/struct.BTreeMap.html) | Alternative to HashMap in a no-std env |
| [BTreeSet](https://doc.rust-lang.org/beta/alloc/collections/btree_set/struct.BTreeSet.html)    | Alternative to HashSet in a no-std env |

:::tip[BTree Information]
Data structures based on B-Trees require the Ord trait to be implemented for the values which get inserted. (In the case of a Map, the Ord needs to be implemented on the Key)
:::

## Common host functions

| Function                                 | Explanation           |
| ---------------------------------------- | --------------------- |
| dusk_core::abi::emit("EVENT_NAME", data) | Emit a contract event |

## Common Dependencies

- dusk-core, with `ABI` feature enabled

### No-std Crates

- core
- alloc

The alloc crate needs to explicitly be imported in order to use heap-allocated values in a #![no-std] environment.
More information on the alloc crate can be found <a href="https://doc.rust-lang.org/alloc/" target="_blank">here</a>.

## Simple Contract Template

[Counter Contract](https://github.com/dusk-network/my-first-contract)

## Example Makefile to compile to WASM

```bash
build: ## Build contract
	@RUSTFLAGS="-C link-args=-zstack-size=65536" \
	cargo build \
	  --release \
	  --manifest-path=Cargo.toml \
	  --color=always \
	  -Z build-std=core,alloc \
	  --target wasm32-unknown-unknown
	@mkdir -p target/stripped
	@find target/wasm32-unknown-unknown/release -maxdepth 1 -name "*.wasm" \
	    | xargs -I % basename % \
	    | xargs -I % wasm-tools strip -a \
	 	          target/wasm32-unknown-unknown/release/% \
	 	          -o target/stripped/%

# test: contract ## Run all tests
#	@cargo test \
#	  --manifest-path=Cargo.toml \
#	  --color=always

MAX_COUNTER_CONTRACT_SIZE = 8192

.PHONY: contract test
```

## More references

The <a href="https://cheats.rs/" target="_blank">Rust Language Cheat Sheet</a> is another great cheat sheet that can be used as a reference for Rust code. 

Note: Not all examples apply due to our no-std constraints.
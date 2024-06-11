---
title: Dependencies
---

# Rust

Even if developers can write smart contracts on Dusk by using programming language that compiles to WASM, most developers prefer to use Rust.

It is necessary to install <a href="https://www.rust-lang.org/tools/install" target="_blank" >Rust</a> 1.71 nightly or higher. 

# GCC
To run Rusk, you will need to install <a href="https://gcc.gnu.org/install/" target="_blank" >GCC</a> 13 or higher.

# Clang
To run Rusk, you will need to install <a href="https://clang.llvm.org/get_started.html" target="_blank" >Clang</a> 13 or higher.

# wasm-pack

To build the WASM contracts, `wasm-pack` is required:
```bash
cargo install wasm-pack
```

# nightly

As <a href="https://github.com/dusk-network/rusk" target="_blank" >Rusk</a> makes use of the nightly toolchain, it needs to be installed with:
```bash
rustup toolchain install nightly
rustup default nightly
```
---
title: Compile a contract
description: Compiling contracts and information about verifiable builds.
---

This page is about compiling smart contracts and what verifiable builds are. Verifiable builds are particularly important for smart contracts as it is necessary to reproduce every single step in order to verify a contract's compiled bytecode against the supplied source code or project to ensure that they are exactly the same.

## Compile a Contract

Make sure you added the following line in the `[lib]` section of your `Cargo.toml`:

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```
:::tip[Info]
The `cdylib` type ensures that the necessary metadata and structure for a dynamic library are included in the output file. Without adding it, the Rust compiler would default to other types that are not suitable for dynamic loading (needed by WebAssembly hosts). This implies that the build process may still proceed without errors, but it will not produce a WebAssembly file that can be recognized by WebAssembly hosts. In other words, without adding the `cdylib` line you won't be able to see the `.wasm` file just created.
:::

To compile `#![no_std]` Rust code to WASM we need to follow the following steps:

### 1. Install wasm-pack

To build the WASM contracts, `wasm-pack` is required:

```bash title="Terminal"
cargo install wasm-pack
```

### 2. Set the right rust version

Make sure that you use version ``1.75.0-nightly`` of rustc. This can be achieved by having a ``rust-toolchain.toml`` file in your project or have set the rustc compiler to the following:

```toml
// rust-toolchain.toml
[toolchain]
channel = "nightly-2023-11-10"
targets = ["wasm32-unknown-unknown"]
components = ["rust-src", "rustfmt", "cargo", "clippy"]
```

This ensures compatibility with the rusk-abi dependency in your contract. 

### 3. Add the wasm target

If you have not yet added the wasm32 target to Rust, you can add it with the following command:

```bash title="Terminal"
rustup target add wasm32-unknown-unknown
```

### 4. Specify the target explicitly

You can pass a target flag to the cargo build command, to explicitly set the target you want to compile to. This command compiles the Rust project to WebAssembly in release mode, optimizing the output for performance.

```bash title="Terminal"
cargo build --target wasm32-unknown-unknown --release
```

:::tip[Note]
Often it is easiest to create a Makefile for the contracts which takes care of the build and test process. An example Makefile can be found in the [Cheat sheet](/developer/smart-contract/cheat-sheet#example-makefile-to-compile-to-wasm) page.
:::

<!-- Another way of compiling is also possible with wasm-pack by using
```bash
wasm-pack build
```
For this you need to specify an additional dependency in your projects ``Cargo.toml`` file called [wasm-bindgen](https://crates.io/crates/wasm-bindgen).
-->

Once the contract has been compiled successfully, you can execute in your cli:

```bash title="Terminal"
find . -name *.wasm
```

By doing so, you should see the build file named: `your_contract_project_name.wasm`.

Now that you have compiled the contract, you can [deploy](/developer/smart-contract/guides/03-deploying) it to the Dusk blockchain.

## How to verify a contract?

There is no general way to verify that a WASM binary came from a specific piece of source code, as compilation is non-deterministic due to various factors such as compiler version, compiler flags, build settings, environment and so on.

Developers may be used to Solidity's deterministic compilation that comes from a standardized compiler. The compiler ensures that the same source code, when compiled with the same version, always produces the same bytecode. In the case of WASM compilation, the lack of standardized compilation means that different environments, settings, or versions of compilers can produce different WASM binaries from the same source code.

### Current solution - Verifiable Builds

To allow users to verify that a deployed smart contract corresponds to the source code, developers would need to provide a reproducible build environment. This can be achieved by using Docker to create a containerized environment from which the smart contract was deployed. Docker ensures that the build environment is consistent, including the specific compiler version and settings used during compilation, resulting in a deterministic compilation process.

While Dusk is looking at ways to resolve this challenge, in the meantime developers are advised to deploy smart contracts from a Docker container. The container should encapsulate the entire build environment, ensuring that anyone can reproduce the build by using the same Docker image. This ensures that the binary produced during the deployment matches the one produced during the verification process.

Along with the source code, developers should provide the Dockerfile or the Docker image used for the deployment.

#### Example for docker build & deployment

Coming soon...
---
title: Getting Started
description: Dependencies and available IDEs we recommend.
---
## Dependencies

This page explains what dependencies you need to have installed on your computer to start writing smart contracts in Rust.

### Rust

To start writing contracts in Rust we need installed <a href="https://www.rust-lang.org/tools/install" target="_blank">Rust</a> 1.71 nightly or higher. 

:::tip[Install Rust]
You can find information to install Rust <a href="https://www.rust-lang.org/tools/install" target="_blank">here</a>.
:::

#### Nightly

After having installed Rust, you can switch to the nightly toolchain. <a href="https://github.com/dusk-network/rusk" target="_blank">Rusk</a> makes use of the nightly toolchain, which can be installed with:
```bash title="Terminal"
rustup toolchain install nightly
rustup default nightly
```

<!---
# Optional dependencies

If in addition to test your smart contracts against <a href="https://github.com/dusk-network/piecrust" target="_blank">Piecrust</a> you want to deploy them on-chain, you can set up your local cluster and add the following dependencies:

#### GCC
To run Rusk, you will need to install <a href="https://gcc.gnu.org/install/" target="_blank">GCC</a> 13 or higher.

#### Clang
To run Rusk, you will need to install <a href="https://clang.llvm.org/get_started.html" target="_blank">Clang</a> 13 or higher.

#### wasm-pack

To build the WASM contracts, `wasm-pack` is required:
```bash
cargo install wasm-pack
```
-->

### IDE

If you are new to Rust, you may wonder what are the most appropriate setups and IDEs.

Here you can find some information about the three popular setups: RustRover, VSCode with Rust Analyzer and Vim with Rust Analyzer.

#### VSCode + Rust Analyzer

<a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code (VSCode)</a> is a widely-used code editor, on top of which extensions can be added. <a href="https://code.visualstudio.com/docs/languages/rust" target="_blank">Rust Analyzer</a> is an extension that significantly enhances Rust development within VSCode.

#### RustRover

<a href="https://www.jetbrains.com/rust/" target="_blank">RustRover</a> is an IDE from JetBrains tailored specifically for Rust development. It builds on the IntelliJ platform, providing an environment to streamline and enhance the Rust development process.

#### Vim + Rust Analyzer

<a href="https://www.vim.org/download.php" target="_blank">Vim</a> is a highly configurable text editor known for its efficiency and speed, which can be also paired with <a href="https://rust-analyzer.github.io/manual.html" target="_blank">Rust Analyzer</a>.

---
title: Debugging
---

The `debug` and `host_debug` features are meant for debugging while writing the contracts. They allow developers to print logs to stdout from the contract, making inspecting the state a bit easier.

## WASM tools

Useful WASM tools can be found <a href="https://github.com/bytecodealliance/wasm-tools" target="_blank">here</a>.

Of those, WebAssembly text format (WAT) is a "friendly" representation of WASM which can be used with `wasm-tools print foo.wasm`.

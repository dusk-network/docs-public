---
title: Debugging
---

The ```debug``` and ```host_debug``` features are meant for debugging while writing the contracts. They allow developers to print logs to stdout from the contract, making inspecting the state a bit easier.

## WASM debugging tools
WASM tools can be found here.
Between those, WebAssembly text format (WAT) is a "friendly" representation of WASM) which can be used with:

Prints the WAT
wasm-tools print foo.wasm

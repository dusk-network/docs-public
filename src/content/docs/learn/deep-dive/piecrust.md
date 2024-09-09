---
title: Piecrust and piecrust-uplink
description: The underlying VM of Dusk explained.
---

## Piecrust

<a href="https://github.com/dusk-network/piecrust" target="_blank">Piecrust</a> is the WASM virtual machine for running Dusk's smart contracts, and it is based on the <a href="https://wasmtime.dev" target="_blank">Wasmtime</a> runtime, with a few custom modifications:
- Specific memory management mechanism
- Support for Dusk’s ABI
- Support for inter-contract calls 

Piecrust functions as the host-side interface, handling the execution environment and system-level operations

##### Compiling contracts to WASM

Piecrust expects WASM as bytecode, meaning that smart contracts must be compiled into WASM bytecode in order for Piecrust to execute them. Smart contracts are entirely responsible for validating their inputs, processing them according to the contract’s logic, and returning the appropriate outputs. This ensures that smart contracts operate predictably and securely within the standardized execution environment provided by the Piecrust VM.

Contracts compiled to WASM can be executed by Piecrust, with the following caveats:
- The contract needs to expose the "argument buffer" (`argbuf`), which is a special region of 64KB in the contract's memory
- Each exposed function complies with the following calling convention: `fn foo(u32) -> u32`

The received u32 value indicates the length of the input data, which has been placed in the `argbuf` by the caller. This input length specifies how many bytes of data the contract should read from the `argbuf`. After processing the input, the contract writes the output data back into the argbuf. The return u32 value then indicates the length of this output data, specifying how many bytes of data the contract has written to the `argbuf`. This mechanism ensures that both the input and output lengths are communicated, allowing the contract to properly handle the data within the defined buffer space.

Both imports and `argbuf` are defined <a href="https://github.com/dusk-network/piecrust/blob/a6814919dc20347dc1571ec64db04e72056b8e31/piecrust-uplink/src/abi/state.rs" target="_blank">here</a>.

## piecrust-uplink

<a href="https://github.com/dusk-network/piecrust/blob/main/piecrust-uplink/README.md" target="_blank">piecrust-uplink</a> operates on the contract side, managing the deployment and execution of smart contracts. It is the library that allows developers to create smart contracts directly on top of Piecrust.

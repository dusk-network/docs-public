---
title: Piecrust and piecrust-uplink
---


## Piecrust

<a href="https://github.com/dusk-network/piecrust" target="_blank" >Piecrust</a> is the WASM virtual machine for running Dusk's smart contracts, and it is based on WASM runtime, with few custom modifications:
- Specific memory management mechanism
- Support for Dusk’s ABI
- Support for inter-contract calls. 

Piecrust functions as the host-side interface, handling the execution environment and system-level operations


## piecrust-uplink
<a href="https://github.com/dusk-network/piecrust/blob/main/piecrust-uplink/README.md" target="_blank" >piecrust-uplink</a> operates on the contract side, managing the deployment and execution of smart contracts. It is the library that allows developers to create smart contracts directly on top of Piecrust.

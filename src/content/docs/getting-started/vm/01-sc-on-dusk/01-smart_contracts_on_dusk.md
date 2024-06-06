---
title: Smart Contracts on Dusk
---

## Overview


Dusk offers robust support for smart contracts, as developers can leverage the features offered by <a href="https://github.com/dusk-network/piecrust" target="_blank" >Piecrust</a>, <a href="https://github.com/dusk-network/piecrust/blob/main/piecrust-uplink/README.md" target="_blank" >piecrust-uplink</a>  and  <a href="https://github.com/dusk-network/rusk" target="_blank" >Rusk</a>.

In order to deploy a smart contract, developers only need to compile their contracts to WASM. This is possible because the <a href="https://github.com/dusk-network/piecrust" target="_blank" >Piecrust</a> VM manages the contract’s bytecode, state, and runtime sandboxed environment.  

Even if developers can use any programming language that compiles to WASM (e.g.  C, C++, Go...), most developers prefer writing smart contracts in Rust due to its efficiency and security benefits.


##### Methods

Smart contracts on the Dusk blockchain employ two types of methods: 
- **Queries**: designed to retrieve data without altering the contract’s state.
- **Transactions**: designed to modify the contract’s state but do not return data. 

This distinction is crucial for understanding how smart contracts interact with the Dusk blockchain.

Understanding the mechanism of argument passing to and from queries and transactions is beneficial, as each contract has a memory area for argument passing, and host methods simplify this process by handling the details. Utilizing host-provided methods can result in significant computational power savings, especially for intensive functions like cryptographic and zero-knowledge proofs.

##### Events

Contracts on Dusk can use events as a lightweight mechanism to provide feedback, and they are particularly useful for triggering actions on the caller's side.

Events serve as a logging mechanism that facilitates interactions between various applications and can be emitted by either queries or transactions. Events can be processed post-call by the caller, which can then execute its logic accordingly

Clients can subscribe to events emitted by both smart contracts and nodes by using the Rusk Universal Event System <a href="https://github.com/dusk-network/rusk/wiki/RUES-(Rusk-Universal-Event-System)" target="_blank" >Rusk Universal Event System</a>.



## Owner
Every contract has a owner ID that can perform upgrade operations, etc.


## Examples

There are several <a href="https://github.com/dusk-network/piecrust/tree/main/contracts" target="_blank" >smart contracts examples</a> available, which can be used for reference.
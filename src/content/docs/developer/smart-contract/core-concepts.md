---
title: Core Concepts
description: Core concepts within the Dusk smart contract platform
---

This page explains the core concepts and building blocks for developing smart contracts on Dusk. If you want to dive right into development you can directly go to the [Guides](/developer/smart-contract/02-guides/01-my-first-contract)

### The State & Persistence

Each smart contract on Dusk has its own state, which is the persistent data maintained by the contract. This means that for every smart contract, there is a single, globally consistent state at any time, maintained across all nodes. In other words, the smart contract's state is a global singleton. 

The State in a dusk smart contract is a static mutable constant and often maintains a single struct.

An example State of a counter contract that maintains a single counter value would look like this:
```rust
static mut STATE: MyContract = MyContract { counter: 0 };
```

State information can be accessed and returned, while the state can be modified via transactions.

A smart contract is allowed to write data in any way it likes to the underlying <a href="https://webassembly.github.io/spec/core/intro/overview.html#memory" target="_blank">linear memory</a>, which is a contiguous, mutable array of raw bytes. The linear memory is created with an initial size but can be grown dynamically, and a program can load and store values from/to a linear memory at any byte address.

At a programmatic level, this implies that by using Rust developers can use structs, maps, single variables, etc...

Updating any of these implies a state transition, which is recorded on the blockchain and ensures a permanent and immutable record of all changes.

The data held in state variables can be updated based on the logic defined in the contract. It is important to note that even if the state of a smart contract can change through transactions, the contract code itself is immutable once deployed. A proxy contract upgrading mechianism for example does not impact the immutability of contract code; it merely changes a pointer to point towards another contract. Data in a contract is mutable if the contract's logic allows for it.

### Gas

Executing smart contracts involves computational work performed by the network nodes. The unit of measurement used to quantify the computational effort required for executing operations on a blockchain is called gas. Gas measures the amount of work needed to perform a task: the more complex the task, the more gas it requires. 

While gas itself measures computation, the gas price determines the amount of native cryptocurrency you are willing to pay per unit of gas. Gas pricing serves as a mechanism to prevent spam and misuse of the network. By requiring users to pay for the computational resources they consume, it discourages malicious actors from overloading the network with excessive or inefficient operations.

Gas prices fluctuate based on network demand. When the network is congested, gas prices can spike, making transactions more expensive. Conversely, in periods where the network is less congested, gas prices are lower. You can learn more on how gas works on Dusk by reading the [Gas Management](/learn/economic-information/gas-management) page.

Smart contracts consume gas while performing executions, which are paid for by the user. It therefore makes sense to optimize for gas consumption so that end-users do not overpay for contract interactions.

### Methods

Smart contracts on Dusk can retrieve data from other contracts without altering their contract’s state, as well as modifying the contract’s state without returning any data. 

In order for a smart contract to modify its state, a transaction is needed.

Each contract has a memory area for argument passing, and host methods simplify this process by handling the details. Utilizing host-provided methods can result in significant computational power savings, especially for intensive functions like cryptographic and zero-knowledge proofs.

The logic of a smart contract is executed by calling one of its methods. Methods can be called by users directly, or by other smart contracts. Methods can consume data and can branch their code based on its properties, and on other conditions such as the current state of the chain.
Based on these conditions, the method may decide to continue execution of the contract's logic, or reject the execution entirely. 

The product of the execution depends on the coded logic, which can involve transferring funds, issuing digital assets, triggering other contracts, etc.

Smart contracts can be programmed to execute specific code when receiving cryptocurrencies. This means that when a user sends cryptocurrency to a smart contract's address, the contract can automatically perform predefined actions based on the received funds.

Smart contracts on the Dusk blockchain employ two types of methods: 
- **Queries**: designed to retrieve data without altering the contract’s state.
- **Transactions**: designed to modify the contract’s state but do not return data. 

This distinction is crucial for understanding how smart contracts interact with the Dusk blockchain.

Understanding the mechanism of argument passing to and from queries and transactions is beneficial, as each contract has a memory area for argument passing, and host methods simplify this process by handling the details. Utilizing host-provided methods can result in significant computational power savings, especially for intensive functions like cryptographic has functions and zero-knowledge proof verification.

### Events

Smart contracts on Dusk can use events as a lightweight mechanism to provide feedback, and they are particularly useful for triggering actions on the caller's side.

Events serve as a logging mechanism that facilitates interactions between various applications and can be emitted by either queries or transactions. Events can be processed post-call by the caller, which can then execute its logic accordingly

Clients can subscribe to events emitted by both smart contracts and nodes by using the <a href="https://github.com/dusk-network/rusk/wiki/RUES-(Rusk-Universal-Event-System)" target="_blank">Rusk Universal Event System</a>.

### The host

### Rust No-std

#### Expose Functions
#### Usage of panic & reverting state

### Compiling Smart Contracts

### Common dependencies

#### Rusk

<a href="https://github.com/dusk-network/rusk" target="_blank">Rusk</a> is the official Dusk protocol node client and smart contract platform. It plays a key role in Dusk by enabling the execution of smart contracts and handling the consensus. 

The `rusk-abi` crate encapsulates the following two features: 
- `abi`: for smart contracts developers who are creating smart contracts that can interact seamlessly with Dusk by adhering to the ABI.
- `host`: for developers who are building binaries to run ABI-compliant contracts. This involves the creation and management of host functions that execute smart contracts within the execution environment.

##### Rusk-abi

The `abi` and `host` features in the rusk-abi crate are mutually exclusive. This means that while they implement the same functions, they do so in fundamentally different ways tailored to their respective roles. While `abi` defines how contracts should interact within the network, `host` ensures that contracts run as intended and manage resources effectively in the execution environment.

##### Rusk-host

?

#### Execution Core

### The Rusk Virtual Machine

#### Host Calls
#### Callcenter
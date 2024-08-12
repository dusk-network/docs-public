---
title: Getting Started
description: Core concepts within the Dusk smart contract platform
---

You can build and test your contracts against <a href="https://github.com/dusk-network/piecrust" target="_blank">Piecrust</a>.

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

### The host

### Rust No-std

#### Expose Functions
#### Usage of panic & reverting state

### Compiling Smart Contracts

### Common dependencies

#### Rusk-abi

#### Execution Core

### The Rusk Virtual Machine

#### Host Calls
#### Callcenter
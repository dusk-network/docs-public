---
title: Smart Contracts
---

## What is a Smart Contract?

A smart contract is a self-executing digital agreement whose terms and conditions are directly written into lines of code. Even if the concept of smart contracts has been <a href="https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html" target="_blank">introduced in 1994</a>, it became more popular after the creation of general purpose blockchains. The reason is that storing smart contracts on a blockchain ensures transparency, security, and immutability.

### Methods

The logic of a smart contract is executed by calling one of its methods. Methods can be called by users directly, or by other smart contracts. Methods can consume data and can branch their code based on its properties, and on other conditions such as the current state of the chain. Based on these conditions, the method may decide to continue execution of the contract's logic, or reject the execution entirely. The product of the execution depends on the coded logic, which can involve transferring funds, issuing digital assets, triggering other contracts, etc.

Smart contracts can be programmed to execute specific code when receiving cryptocurrencies. This means that when a user sends cryptocurrency to a smart contract's address, the contract can automatically perform predefined actions based on the received funds.

### State

Each smart contract has its own state, which is the persistent data maintained by the contract. This means that for every smart contract, there is a single, globally consistent state at any time, maintained across all nodes. In other words, the smart contract's state is a global singleton. 

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

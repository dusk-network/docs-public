---
title: Smart Contracts
---

## What is a Smart Contract?

A smart contract is a self-executing digital agreement whose terms and conditions are directly written into lines of code. Even if the concept of smart contracts has been <a href="https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html" target="_blank" >introduced in 1994</a>, it became more popular after the creation of general purpose blockchains. The reason is that storing smart contracts on a blockchain ensures transparency, security, and immutability.

Blockchain nodes validate each step of the contract's execution and ensure its correctness, therefore allowing users to trust the contract's execution without requiring a central authority. 

As smart contracts live on the blockchain, once deployed they cannot be modified. Anyways, for upgradability purposes, developers can take advantage of specific patterns (e.g. proxy contracts).

#### Methods
Executing the logic of a smart contract is **only** possible when its methods are called, either by users directly or by other smart contracts. Methods can pass data and initiate the execution of the contract's logic, and if the conditions coded in the smart contract are satisfied, the contract executes the relevant piece of code. The execution depends on the coded logic, which can involve transferring funds, issuing digital assets, triggering other contracts, and much more...

Smart contracts can be designed to implement fallback methods when receiving cryptocurrencies so that when a user sends cryptocurrency to a smart contract's address, the contract can automatically execute predefined actions based on the received funds. 

#### State

Each smart contract has its own state, which is the persistent data maintained by the contract. This means that for every smart contract, there is a single, globally consistent state at any time, maintained across all nodes. In other words, the smart contract's state is a global singleton. 

Queries can access and return parts or the entirety of this state, while transactions are responsible for state mutations. 

State variables, mappings, arrays, and structs are part of the smart contract's state, and updating any of these implies a state transition. Each state transition is recorded on the blockchain, ensuring a permanent and immutable record of all changes.

The data held in state variables can be updated based on the logic defined in the contract. It is important to note that even if the state of a smart contract can change through transactions, the contract code itself is immutable once deployed (unless using a proxy contract).

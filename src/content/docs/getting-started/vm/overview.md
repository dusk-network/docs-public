---
title: Piecrust And Smart Contracts
---

# Overview of Dusk Blockchain and Smart Contracts

**Dusk Blockchain Smart Contracts:**  
The Dusk blockchain supports smart contracts compiled into Web Assembly, an open-standard binary-code format. This allows for the use of various programming languages like Rust, C, C++, and Go, as long as the Web Assembly output meets certain requirements. The flexibility in language choice broadens the accessibility for developers.

**Dusk Virtual Machine Execution:**  
Smart contracts are run on the Dusk Virtual Machine, which manages the contract's bytecode, state, and runtime sandboxed environment. The Virtual Machine executes contract methods, which are functions made available externally for interaction by other contracts or external parties.

# Smart Contract Methods: Queries and Transactions

**Understanding Queries and Transactions:**  
Smart contracts on the Dusk blockchain employ two types of methods: queries and transactions. Queries are designed to retrieve data without altering the contract’s state. In contrast, transactions modify the contract’s state but do not return data. This distinction is crucial for understanding how smart contracts interact with the blockchain.

**Contract State Concept:**  
The concept of a contract’s state is integral. It refers to persistent data maintained by the contract, which, in the context of a blockchain, is a global singleton. This means there is a single, globally consistent state at any time, maintained across all nodes of the Dusk blockchain. Queries can access and return parts or the entirety of this state, while transactions are responsible for state mutations.

# Advanced Contract Mechanics: Eventing and Argument Passing

**Eventing and Feedback Mechanism:**  
Apart from transactions and queries, contracts can use events as a lightweight mechanism to provide feedback. These events can be emitted by either queries or transactions and processed post-call by the caller. They are particularly useful for triggering actions on the caller's side.

**Argument Passing and Host Methods:**  
Understanding the mechanism of argument passing to and from queries and transactions is beneficial. Each contract has a memory area for argument passing, and host methods simplify this process by handling the details. Utilizing host-provided methods can result in significant computational power savings, especially for intensive functions like cryptographic and zero-knowledge proofs.

**Note on Smart Contract Development:**  
As a smart contract developer, it's important to be mindful of the computational cost of every instruction, leveraging host methods for efficiency and optimizing code to reduce unnecessary expenses.

---
## Additional Notes and Highlights:
- **Flexibility in Language Choice:** The ability to use multiple programming languages for smart contract development is a key feature of the Dusk blockchain.
- **Cost Implications:** Smart contract execution involves real financial costs, emphasizing the need for efficient coding practices.
- **Eventing as a Useful Tool:** The eventing mechanism offers an additional layer of interaction between the contract and its environment.



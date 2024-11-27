---
title: Core Components
description: Core components that make up Dusk.
---

There are a lot of moving pieces within the Dusk protocol, and a lot of tools that we have developed in-house to meet the requirements of being privacy-preserving, compliant, and able to interact with regulated assets.

What sets Dusk apart from other blockchains is its bespoke and tailor-made components to ensure compliance, privacy, and the security of the network for the tokenization of Real-World Assets.

## Rusk

Rusk can be thought of as the technological heart of the Dusk protocol, similar to the motherboard of a computer. It is the reference implementation of the Dusk protocol in Rust. Rusk serves multiple critical functions. It includes foundational elements like the genesis ZK circuits and contracts, such as the transfer and stake contracts. It integrates key components such as Plonk, Kadcast and Piecrust, and supplies host functions to the Rusk VM. Beyond that, Rusk houses the consensus mechanism and node software, maintaining the chain state, database and network. It also provides crucial external APIs through the Rusk Universal Event System (RUES).

## Consensus Layer: Succinct Attestation

[Succinct Attestation](/learn/deep-dive/succinct-attestation) (SA) is the unique **proof-of-stake** (PoS) consensus algorithm at the core of Dusk. It uses a committee-based approach where stakers, called provisioners, participate in generating, validating and ratifying blocks. Provisioners are randomly selected based on their stake.

Each round of consensus involves three steps: 
1. **Proposal**: A provisioner creates and broadcasts a candidate block.
2. **Validation**: A committee checks the block's validity.
3. **Ratification**: Another committee confirms the validation outcome.

Blocks are added to the blockchain if they receive enough votes. The Deterministic Sortition (DS) algorithm ensures fair and random provisioner selection.
 
## Execution Layer: Piecrust

[Piecrust](/learn/deep-dive/piecrust) is a hyper optimized <a href="https://en.wikipedia.org/wiki/Virtual_machine#Process_virtual_machines" target="_blank">virtual machine</a> built around Wasmtime, a WASM runtime. It is a ZK-friendly virtual machine, enabling the development and execution of privacy-focused smart contracts and applications. 

Piecrust is fundamentally different from many blockchain VMs in that it not only executes WASM and is able to natively support ZK operations like SNARK verifications, but it also has a completely different way in which it handles memory.

## Network Layer: Kadcast

<a href="https://github.com/dusk-network/kadcast/blob/main/README.md" target="_blank">Kadcast</a> Kadcast is an innovative peer-to-peer protocol used by Dusk to optimize message exchanges between nodes. Unlike the traditional Gossip protocols used by many blockchain protocols, which broadcasts messages to a random set of nodes, Kadcast uses a structured overlay to direct message flow. This massively reduces network bandwidth and makes latency much more predictable, and at the same time lower compared to Gossip protocols.
 
## Application layer

At the application layer of our network, we’ve introduced innovative protocols and a dual transaction model designed to seamlessly meet the needs of financial institutions looking to tokenize Real-World Assets. Let’s take a closer look at the Genesis contracts, Citadel and Zedger/XSC.

### Genesis Contracts

Dusk contains two fundamental Genesis contracts, which are contracts that are available when the network starts, known as the **stake** and **transfer** contracts. 

The stake contract is responsible for managing the stakes associated with node provisioners (stakers). It tracks which provisioners are currently staking, records their rewards and enables the functionality to stake, unstake and withdraw rewards.

### Phoenix & Moonlight

[Phoenix](/learn/tx-models#phoenix) & [Moonlight](/learn/tx-models#moonlight) are both transaction models supported by Dusk. One is for privacy, the other one for transparency and compliance.

### Transactions on Dusk

Transactions in Dusk are managed by the <a href="https://github.com/dusk-network/rusk/tree/master/contracts/transfer" target="_blank">Transfer Contract</a>. The transfer contract oversees the handling of both transparent and obfuscated transactions within the network. It maintains a Merkle tree of notes and a mapping of keys to balances to ensure integrity of the chain balances. The tree operates on an append-only structure, meaning that once a note is added, it remains there permanently—even after it has been spent. This ensures that no one can identify which notes have been spent in any given transaction, preserving anonymity.

To minimize unnecessary entries and avoid overloading the tree, staking rewards are accumuated separately. When the rewards are withdrawn, they are consolidated into a single note representing the total accumulated stake

Additionally, the transfer Contract supports **both** a [UTXO](/learn/tx-models#utxos) and [account-based](/learn/tx-models#account-model) model through [Phoenix](/learn/tx-models#phoenix) and [Moonlight](/learn/tx-models#moonlight) to handle transfers of the native currency, gas payments, and serve as a contract execution entry point.

### Citadel

![Citadel](../../../assets/citadel.gif)

Citadel is a groundbreaking Self-Sovereign Identity (SSI)/Digital Identity (DI) protocol designed for authenticating with third party services while upholding user privacy. With Citadel it’s possible to anonymously prove identity information, like meeting a certain age threshold or living in a certain jurisdiction, without revealing the exact information or revealing more information than is necessary. Given that Citadel is part of the network, it has wide ranging applications for on-chain activity and realizing compliance paving the way to RegDeFi.

[Deep dive into Citadel](/developer/digital-identity/protocol) 

### Zedger & XSC

Zedger is an asset protocol that incorporates a unique hybrid transaction model combining the benefits of both UTXO and account-based transaction models. This model provides the Confidential Security Contract (XSC) functionality necessary for Dusk’s securities-related use-cases among them the full lifecycle management of securities and supporting full regulatory compliance.

Zedger allows for the digital representation, native issuance and management of securites in a privacy-preserving manner. Issuers of securities are able to issue, manage, and let investors trade securities as XSC tokens It offers built-in support for compliant settlement, redemption of securities, preventing pre-approved users from having more than one account, supports dividend distribution and voting, and can handle capped transfers. Zedger aims to support a range of security types, like stocks, bonds and ETFs. The emphasis on regulatory compliance and privacy ensures that all operations meet the highest standards required by financial authorities and stakeholders.

[Deep dive into Zedger](/learn/deep-dive/transaction_models/zedger) 

## Dusk primitives

![Elliptic Curves image](../../../assets/elliptic_curves.png)

At the foundation of Dusk’s architecture are the cryptographic primitives - BLS12_381, JubJub, Schnorr and Poseidon. These cryptography tools provide the robust security and privacy features of the network. Besides these, we also make use of our own Merkle tree implementation called dusk-merkle, and our own PLONK proving system.

### BLS12_381

BLS12_381 is a pairing-friendly elliptic curve used within Dusk to enable aggregation of signatures, which significantly reduces the amount of data to be stored and transmitted over the network, improving overall efficiency of the blockchain. This curve is especially crucial in the context of zero-knowledge proofs, where it provides the backbone for secure and private transactions.

[Deep dive into BLS](/learn/deep-dive/cryptography/bls) 

### JubJub

JubJub is another elliptic curve, specifically designed for fast and secure implementation of zero-knowledge proofs. This curve is utilized within Dusk for the construction of efficient zk-SNARKs, allowing transactions and contracts to maintain privacy and integrity without the need to reveal underlying data.

### Schnorr Signatures

Schnorr signatures are a type of digital signature scheme. They offer resistance against forgery. In Dusk, Schnorr signatures contribute significantly to securing user transactions and smart contract interactions. They ensure that only valid transactions are processed and added to the blockchain.

### Poseidon

Poseidon is a cryptographic hash function specifically designed for use in zero-knowledge circuits. It is optimized for performance, security and data integrity within Dusk. By producing a unique hash value for every distinct input, it forms the heart of Dusk’s data structures, making it virtually impossible to alter transaction data once it’s included in the blockchain.

[Deep dive into hashing](/learn/deep-dive/cryptography/hashing)

### Dusk-Merkle

Dusk also includes a custom, sparse Merkle tree implementation that is hash-function agnostic. Merkle trees are a fundamental part of many blockchains, enabling efficient and secure verification of large data structures. The Dusk Merkle tree is designed for flexibility and performance, given it’s used in multiple locations like the stake and transfer contract, and Citadel. 
 
### PLONK

PLONK is a versatile proof system developed to facilitate the implementation of zero-knowledge proofs. It forms the core of Dusk’s proof system, allowing efficient and private transactions on the network that are both small in proof size and fast to verify. 

With PLONK, developers can define custom and reusable circuits that can be integrated into Dusk based smart contracts. 

[Deep dive into PlonK](/learn/deep-dive/cryptography/plonk) 
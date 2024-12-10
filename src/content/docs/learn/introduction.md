---
title: Introduction
description: Learn about Dusk provides institutional-grade infrastructure for regulated financial markets.
---


Dusk is a Layer 1 blockchain designed to deliver an innovative Financial Market Infrastructure (FMI) for the [native issuance](/learn/tokenization-comparison#native-issuance), clearing, and settlement of regulated financial assets such as stocks and bonds. With a focus on speed, privacy, and efficiency, Dusk facilitates on-chain settlement that adheres to the highest institutional standards. By eliminating the need for intermediaries like Central Securities Depositories ([CSDs](/learn/deep-dive/assets-and-regulations/dematerialization#role-of-csds)), Dusk offers a streamlined and **Decentralized Market Infrastructure** (DeMI).

Utilizing zero-knowledge proofs (ZKPs) and other advanced cryptographic primitives, Dusk enables the creation of a disintermediated financial market for the seamless issuance, clearing, settlement, and trading of securities. This cryptographic foundation ensures that financial applications involving real-world assets (RWAs) comply with legal frameworks, making Dusk particularly suited for regulated financial markets.

All products issued on Dusk’s platform are fully compliant with the European Union’s **MiFID** II and **MiFIR** regulations, as well as compatible with the **DLT Pilot Regime Regulation**. Dusk also provides baked-in compliance with **MiCA** and **GDPR**.

Dusk employs an innovative PoS-based consensus mechanism, known as [Succinct Attestation](/learn/deep-dive/succinct-attestation).
Dusk is powered by [zero knowledge proofs](/learn/deep-dive/cryptography/zkp), and achieves flexibility through its multiple [transaction models](/learn/tx-models#transaction-models-on-dusk).

Simply put, **Dusk is** a privacy-enabled and regulatory-compliant decentralized ledger paves the way for **decentralized market infrastructure**.

<hr className="subsection" />

## Why Choose Dusk?
The extensive [cryptographic research](/learn/deep-dive/additional-resources#research-papers) and implementations that the Dusk team has carried out during the years allows Dusk to achieve:


### Institutional Requirements

Dusk has been built to address the [institutional standards](/learn/tokenization-comparison#meeting-institutional-standards) required for the native issuance, trading, clearing and settlement of regulated financial assets.

Its whole stack has been built to address all the applicable regulations that apply to the [lifecycle of securities](/learn/deep-dive/assets-and-regulations/lifecycle) in the European market (e.g. MiCA, MiFID II, MiFIR, GDPR ...).


### Unparalleled Privacy

Dusk implements [confidential smart contracts](/developer/smart-contract/guides/01-my-first-contract) by allowing anyone to build ZKP-powered contracts. Our privacy-preserving and public transaction models [Phoenix and Zedger](/learn/tx-models#transaction-models-on-dusk) give users and developers the flexibility they need, based on their use-case, to pick the visibility of transactions. 

To ensure privacy, Dusk utilizes some of the most advanced and widely regarded cryptographic tools available in the realm of zero-knowledge (ZK) technology. Notably, Dusk employs the [PlonK](/learn/deep-dive/cryptography/plonk) proof system and the [Poseidon](/learn/deep-dive/cryptography/hashing#poseidon-hash) hash function, both of which are critical components in the ZK toolkit. PlonK is highly efficient in generating and verifying proofs, while Poseidon enhances security with its specially designed hashing algorithm tailored for ZK applications. 

In addition to providing transactional privacy, Dusk offers a privacy-preserving digital identity protocol, [Citadel](/developer/digital-identity/protocol), which facilitates compliance while ensuring secure and confidential user interactions. This protocol addresses the increasing demand for privacy in digital identity management, particularly in regulatory environments, by enabling users to prove their identity without disclosing sensitive personal information.

### High Performance and Finality

Dusk Network is built with high performance and state finality as core priorities. One of the key innovations driving this performance is the [Kadcast](https://github.com/dusk-network/kadcast/blob/main/README.md) network protocol. Kadcast enhances network efficiency by making block and transaction data propagation **ten times more efficient** than conventional methods. This novel approach to data distribution allows for faster communication and scalability across the network, ensuring that transactions are processed quickly and without unnecessary bottlenecks.

Another important element is Dusk's consensus algorithm, known as [Succinct Attestation](/learn/deep-dive/succinct-attestation), which operates using a proof-of-stake (PoS) sybil-resistant mechanism and is able to achieve **complete state finality** efficiently and securely.

Transaction performance is further enhanced by [Piecrust](/learn/deep-dive/piecrust), a ZK-friendly virtual machine that supports privacy-preserving computations at scale. Piecrust is optimized to handle zero-knowledge (ZK) proofs efficiently, making it a key component in Dusk’s drive for privacy-focused, high-throughput transactions.

### Developer Experience

Developers benefit from the use of [WASM](https://webassembly.org/) bytecode for smart contracts, which allows them to write contracts in [Rust](/developer/smart-contract/guides/01-my-first-contract) or any other language that compiles to WASM. This flexibility in programming language opens up Dusk to a wide range of developers, encouraging adoption.

Dusk also introduces an [innovative economic model](/learn/deep-dive/economic-protocol) that elevates smart contracts into real-world applications and businesses.


## Use Cases

Dusk is ideal for building transactional applications with high throughput and privacy that achieve immediate finality without relying on centralized infrastructure or trusted third parties. For example: 

- Automated and self-governing securities.
- Confidential smart contracts and security tokens.
- Digital share registry management.
- Decentralized smart bulletin boards.
- Proxy voting.
- Self-custodial applications.
- Decentralized finance including on-chain trading of RWAs.

Please refer to [Dusk's use cases](https://dusk.network/pages/usecases) for more information.

## A Note on Privacy and Compliance

Dusk uniquely offers the possibility to automate processes previously requiring the use of trusted (and costly) third parties. The novel use of [ZK technology](/learn/deep-dive/cryptography/zkp) enables organizations to harness the power of DLT while respecting confidentiality agreements and data protection legislation. Anyone can leverage Dusk to inexpensively issue *programmable* financial assets that are governed by privacy-preserving smart contracts.

The privacy aspect of Dusk allows it to overcome issues associated with the use of open ledgers, where transactions are broadcasted publicly among users in clear. Some of these problems include market manipulation from the transaction validators (i.e. the so called [maximal extractable value (MEV)](https://ethereum.org/en/developers/docs/mev/)), the impossibility to [comply to GDPR](https://www.europarl.europa.eu/RegData/etudes/STUD/2019/634445/EPRS_STU(2019)634445_EN.pdf) especially when KYC/AML procedures are involved, the perils associated to the lack of privacy ranging from financial risks to social engineering, hacking, and threats to personal freedom.


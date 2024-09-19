---
title: Digitization, Tokenization and Native Issuance 
description: Understanding the difference between Tokenization and Native Issuance.
---

## Common Misconceptions
In the rapidly changing financial markets, tokenization is often mistaken for native issuance, leading to confusion. However, these are distinct processes with different implications for how regulated financial assets are managed, traded, and settled. Understanding these differences is essential for grasping how blockchain technology applies to real-world assets (RWAs).


Before understanding the differences between tokenization and native issuance, let's first take a step back and quickly mention what digitization is.

### Digitization
Digitization is the process of transforming physical or paper-based financial assets, such as securities or certificates, into a digital format. At its core, digitization is simply about changing the medium of the asset from physical to digital, allowing for easier access, handling, and transfer through electronic systems. However, it does not inherently change the underlying nature of the asset, nor does it introduce new functionalities. A digital representation of an asset still operates within the constraints of traditional market infrastructures, such as central securities depositories (CSDs), clearinghouses, and intermediaries.

For example, a paper-based stock certificate that is digitized remains fundamentally the same stock, only stored and transacted electronically. The inefficiencies of settlement times, trade reconciliation, and reliance on intermediaries still persist, though in a more convenient digital form.

### Tokenization

Tokenization builds on digitization by adding specific functionalities to these digital representations, such as fractional ownership and programmability via smart contracts.

While tokenization introduces exciting possibilities like the ability to fractionalize ownership or automate specific functions through smart contracts, it still faces a fundamental limitation. This limitation comes from the fact that there is the need for reconciliation between the tokenized asset and the underlying asset. Due to regulatory requirements, the underlying asset is still held by a custodial entity (such as a CSD), and this dependence introduces inefficiencies, including delays in settlement and increased costs due to the necessity of verifying that the tokenized form and the underlying asset are in sync.

Tokenization deals with the front-end of financial transactions, making assets more accessible and programmable. However, it does not resolve the deeper infrastructural challenges related to clearing, settlement, and compliance. These challenges can only be resolved by innovating the infrastructure level of finance and hold the necessary licenses to do so. The vast majority of tokenization platforms still need to rely on traditional financial intermediaries, as the underlying asset needs to be reconciled with the synthetic one. Securities are highly regulated assets, and there is no way to avoid the scrutiny of regulators. The requirement of having the necessary licenses to deal with securities is often an obstacle for tech companies, as they depend on complying with applicable regulatory frameworks in order to use their solution.


### Native Issuance
Native issuance is the next step in the evolution of digital finance, and it represents a significant departure from both digitization and tokenization. In native issuance, the asset itself is created and exists natively on the blockchain, without the need for a corresponding underlying asset held elsewhere. Because the asset exists entirely within the digital realm, there is no need for reconciliation between a synthetic token and its physical or off-chain counterpart: everything happens on-chain.

Native issuance eliminates the inefficiencies introduced by custodial systems and enables disintermediation, where assets can be transferred, settled, and cleared entirely on-chain. By removing intermediaries and creating an environment where the asset is fully native to the ledger, native issuance allows for faster finality, lower costs, and stronger compliance with regulatory requirements like privacy and transparency. The advantages of native issuance clearly surpass those of simple tokenization.

## Understanding the Differences
Understanding the difference between digitization, tokenization, and native issuance is essential for anyone involved in the modernization of financial markets, as these processes have profound implications for efficiency, cost, and regulatory compliance.

Digitized and tokenized assets still rely on outdated infrastructure (such as CSDs) for settlement, introducing inefficiencies like delayed finality and increased costs. native issuance, by contrast, enables real-time settlement, reducing the risk of settlement failures and enhancing market liquidity.

Tokenization typically involves a custodial model where the underlying asset is held by a third party, creating reliance on intermediaries and regulatory frameworks that can slow down the system. Native issuance eliminates these middlemen, leading to faster and cheaper transactions.

### Digitization vs Tokenization vs Native Issuance
Below, you can find a diagram that gives an overview about the main differences:

|                      | **Digitization**                                                      | **Tokenization**                                                    | **Native Issuance**                                                |
|---------------------------------|----------------------------------------------------------------------|--------------------------------------------------------------------|--------------------------------------------------------------------|
| **Definition**                  | Conversion of paper-based systems into a digital format                   | Creation of a synthetic asset representing an underlying asset | Assets created directly on-chain without needing an underlying asset |
| **Functionality**               | Basic digital representation, no added functionality                  | Fractionalization and Programmability (Smart Contracts) | Full asset lifecycle on-chain with no reconciliation requirements  |
| **Settlement Process**          | Relies on traditional systems like CSDs and clearinghouses             | Relies on traditional systems like CSDs and clearinghouses             | Instant on-chain settlement, no reliance on external systems        |
| **Custody**                     | Custodial (assets held by third-party)                               | Custodial (underlying asset held by a third-party)                     | Non-custodial, asset exists fully on-chain                          |
| **Efficiency**                  | Inefficient due to reliance on intermediaries and slow settlement      | Some efficiency improvements but still faces reconciliation delays and costs   | High efficiency with near-instant settlement and reduced costs   |
| **Risk of Settlement Failure**   | Yes, due to manual reconciliation and intermediary involvement       | Yes, due to manual reconciliation and intermediary involvement                 | No, as settlement is on-chain                    |
| **Innovation Level**            | Zero. This is how things work now                  | Low. It only introduces fractionalization and partial programmability              | High. It removes intermediaries and enables fully on-chain processes    |

## Why Dusk

### Beyond Tokenization

While most projects limit their focus on tokenization, which addresses only the "front-end" of the financial system, Dusk innovates across the entire financial infrastructure, including essential back-end processes like clearance, settlement, and compliance. Dusk provides fast, private, and efficient on-chain settlement that meets institutional standards, delivering a decentralized market infrastructure that removes the need for intermediaries and custodial reliance. Unlike the vast majority of projects, Dusk tackles not only tokenization but also the deeper regulatory and operational challenges necessary for institutional-grade financial markets.

Dusk isn’t just another platform layering tokenization onto outdated systems. It is building an entirely new decentralized financial market infrastructure that allows assets to be natively issued, settled, and cleared on-chain without the need for intermediaries like CSDs. By focusing on both the front-end (tokenization) and the back-end (settlement and compliance), Dusk is paving the way for a truly disintermediated financial market for trading securities.

### Meeting Institutional Standards

Many other blockchains, including popular solutions like Layer 2s on Ethereum, are not well-suited for settling securities transactions due to their inability to meet the stringent requirements of institutional-grade financial markets. 

Some of the challenges are:

- **Fast Finality**: Securities settlement requires transactions to be finalized in under 10 seconds to meet institutional standards. Ethereum Layer 2 solutions, which batch transactions and settle them on Layer 1, usually experience delays of at least several minutes. This disqualifies them from real-time settlement use cases, making them unsuitable for securities transactions where fast finality is crucial.

- **Compliance and Privacy**: Regulatory frameworks like GDPR require privacy-preserving transaction models. Dusk’s protocol is designed to ensure compliance by offering features like selective disclosure and explicit acceptance, which are essential for adhering to legal and regulatory standards throughout the transaction lifecycle. In contrast, networks with account-based models (like EVM-based chains) do not provide the privacy needed for such compliance. This lack of privacy also increases the risk of market manipulation, further complicating their use for regulated assets like securities.
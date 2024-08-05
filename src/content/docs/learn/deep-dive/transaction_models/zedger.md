---
title: Zedger
---
Zedger is a protocol built on Dusk, designed to protect users' privacy while allowing regulatory compliance through selective disclosure. This feature enables transactions to be audited by regulatory agencies while remaining anonymous to other users. Zedger is tailored for deploying specific assets in the securities market, handling operations with Zedger tokens that represent securities such as stocks or bonds from various companies.

Zedger encodes the <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0065" target="_blank"> Mifid II directive </a>, allowing for the digital representation and management of fund shares in a privacy-preserving manner.

By complementing Phoenix, Zedger provides account-based capabilities to support a large set of Confidential Security Contracts (<a href="https://dusk.network/use-cases/confidential-security-tokens/" target="_blank">XSC</a>). It combines UTXOs with accounts to create a compliant model that enables issuers to utilize extensive functionality while maintaining transaction confidentiality without relying on trusted third parties. Zedger supports the first transaction model to offer trustless, compliant settlement and redemption of securities transactions. The protocol also ensures pre-approved users cannot own more than one account, supports corporate actions (E.g. dividend or coupon payments, voting), and manages capped transfers where receivers cannot exceed the asset ownership threshold set in the XSC contract. Zedger is fundamental to Dusk's technology for security-related use cases from native issuance on the blockchain to trading and settlement on it, therefore Zedger will be the default technology for any XSC on Dusk.

Dusk employs Zero-knowledge Proofs to enable users to verify a statement's truth without revealing additional information. This means a user can prove ownership of an asset without disclosing other details about it. Zedger’s selective disclosures are particularly beneficial for governmental inquiries, which depend on the nature of the transacted asset.

Privacy is ensured by encrypting the transaction amount and recipient address, with the sender using a zk-proof to demonstrate their ability to send a specific amount of tokens. Regulators can decrypt transactions and reconstruct balances using encryption keys.


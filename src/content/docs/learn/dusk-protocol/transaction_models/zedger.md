---
title: Zedger
---
Zedger is a hybrid transaction model built on Dusk, designed to protect users' privacy while allowing regulatory compliance through selective disclosure. This feature enables transactions to be audited by regulatory agencies while remaining anonymous to other users. Zedger is tailored for deploying specific assets in the securities market, handling operations with Zedger tokens that represent securities such as stocks or bonds from various companies.

By complementing Phoenix, Zedger provides account-based capabilities to support Confidential Security Contract (XSC) functionality. It combines UTXOs with accounts to create a compliant model that enables issuers to utilize extensive functionality while maintaining transaction confidentiality without relying on trusted third parties. Zedger is the first transaction model to offer trustless, compliant settlement and redemption of securities transactions. It also ensures pre-approved users cannot own more than one account, supports dividend distribution and voting, and manages capped transfers where receivers cannot exceed the asset ownership threshold set in the XSC contract. Zedger is fundamental to Dusk Network's technology for security-related use cases and will be the default transaction model for XSC.

Dusk employs Zero-knowledge Proofs to enable users to verify a statement's truth without revealing additional information. This means a user can prove ownership of an asset without disclosing other details about it. Zedger’s selective disclosures are particularly beneficial for governmental inquiries, which depend on the nature of the transacted asset.

Privacy is ensured by encrypting the transaction amount and recipient address, with the sender using a ZK Proof to demonstrate their ability to send a specific amount of tokens. Regulators can decrypt transactions and reconstruct balances using encryption keys.


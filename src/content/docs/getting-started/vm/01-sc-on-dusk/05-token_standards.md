---
title: Token Standards
---

# What is a Token Standard?

Token Standards are predefined sets of rules and guidelines that define how tokens on a blockchain should behave and interact. These standards ensure interoperability and consistency across applications. 

A Token Standard specifies the parameters and data types that must be used in the functions associated with the token contract, ensuring that the format for inputs and outputs for each smart contract function is well defined. A Token Standard lists the necessary functions that a token must implement, ensuring that any application interoperable with the standard can interact with the token without needing additional code. Adhering to a standard involves implementing the exact same contract functions, which accept the same inputs and produce the same outputs.

# Dusk's Token Standards

Dusk has several token standards to meet different use cases, providing developers the tools they need to build secure and interoperable blockchain applications:
- TC (Transparent Token Contract): The transparent token standard on Dusk functions similarly to ERC20 and Moonlight, where token transfers are transparent.
- XC (Confidential Token Contract): The privacy-preserving token standard on Dusk offers privacy features, ensuring that transaction details are kept confidential. This standard is similar to Phoenix transactions, where the sender, receiver and amount transferred are not exposed to anyone other than the involved parties.
- XSC (Confidential Security Contract): The security token standard on Dusk is specifically designed for the issuance and life-cycle management of securities. This standard has features that ensure regulatory compliance and provides functions for whitelisting, force transfers, dividend payouts, voting, and auditor access to private state.

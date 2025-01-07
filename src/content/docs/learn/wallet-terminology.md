---
title: Wallet Terminology
description: Learn the differences between Dusk mnemonic, profile, accounts and addresses.
---

In Dusk, profiles and accounts are designed to provide enhanced flexibility, seamlessly integrating unique privacy and compliance features. At the core is the mnemonic, a human-readable sequence of words. This mnemonic serves as the foundation for wallet creation, generating a binary cryptographic seed that derives all keys and addresses within the wallet. Acting as a secure entry point, the wallet enables users to manage profiles, accounts, and addresses with ease.

#### Mnemonic/Wallet:

The mnemonic is a human-readable sequence of words, that serves as the foundation for wallet creation. 

The binary representation of the mnemonic is used to generate all keys and addresses in the wallet.
  
The wallet is the entry point for managing all profiles, accounts, and addresses. It serves as the secure container for digital assets.

### Profile and Accounts

A profile represents a pair of accounts, each designed for specific transaction types:

- **Phoenix Account:** For shielded (private) transactions. This account uses the [Phoenix transaction model](/learn/deep-dive/transaction_models/phoenix), which is designed to ensure privacy and regulatory compliance.
- **Moonlight Account:** For public (transparent) transactions. This account uses the [Moonlight transaction model](/learn/deep-dive/transaction_models/moonlight), which is fully transparent.

The Profile enables seamless management of both privacy-preserving and transparent transactions.

### Addresses

An address is a unique identifier derived from an account’s public key, used for sending and receiving funds. Each account generates its own type of address:

- **Shielded Address**: Linked to the Phoenix Account, ensuring privacy.
- **Public Address**: Linked to the Moonlight Account, ensuring transparency.

## Hierarchy
```
Mnemonic (BIP-39 Seed Phrase) 🔑
   ↓
Wallet (Cryptographic Seed) 🛠️
   ↓
Profile (Phoenix & Moonlight Accounts) 👤
   ├── Phoenix Account → Shielded Address 🔒
   └── Moonlight Account → Public Address 🌍
```
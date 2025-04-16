---
title: Integrate with Exchanges
description: Add $DUSK to your exchanges. Discover the integration process, technical requirements, and support resources.
---

# Introduction

This guide shows how to add DUSK to an Exchange by providing all the relevant information. In the first section we outline general details regarding mainnet integration and token migration. We will then look into what are the available libraries and APIs to access and interact with the blockchain, as well as providing links to all the relevant resources, and addressing some common requests.

## Connect to Dusk

To access the blockchain you can either:
- Spin up a node (query data, submit transactions, provide APIs)
- Use Dusk APIs (events system, HTTP ...)
- Use RPC providers

### Spin up a node

You can interact with the blockchain and submit transactions by operating a Dusk node.

To set up a node, you may choose to use the [node installer](/operator/guides/provisioner-node/#node-installer) or manually install Rusk by following the provided [installation instructions](/operator/installation).

Requirements vary depending on whether you are configuring a [Provisioner](/operator/provisioner) node or an [Archive](/operator/archive-node) node.

### Use Dusk APIs

Dusk offers a streamlined event system through the [Rusk Universal Event System (RUES)](/developer/integrations/rues), as data can be fetched from the following endpoints:

- **Mainnet**: https://nodes.dusk.network/
- **Testnet**: https://nodes.testnet.dusk.network/

These links also provide access to archive-related endpoints for comprehensive historical data retrieval.

:::note[Note]
To avoid service disruptions, it is highly recommended to avoid relying on public endpoints and instead run your own node or use reliable RPC providers.
::: 

### Use RPC providers

You can rely on the RPC infrastructure hosted by the community, or run an [archive node](/operator/archive-node) yourself.

## Token deposits and withdrawals

To monitor deposit and withdrawal events, you can utilize [RUES](/developer/integrations/rues#event-subscriptions) by subscribing via a websocket.

In most cases, 1 block confirmation is sufficient for finality. The only exception to the 1 block finality is when the network is in a rolling finality state, in which up to 5 additional blocks may be required to achieve finality.

You can find a detailed overview of the full transaction lifecycle [here](/developer/integrations/tx-lifecycle).

## Construct, sign and decode transactions

The [W3sper SDK](/developer/integrations/w3sper) provides address generation, transaction building, signing, and decoding functionalities. It can operate completely offline, without the need for an online wallet or node. 

The W3sper SDK leverages [wallet-core](/developer/integrations/wallet-core) to facilitate offline transaction processing and signing, producing both the transaction hash and signed transaction outputs. 

The library for transaction serialization and decoding is called [dusk-bytes](https://github.com/dusk-network/dusk-bytes).


## Cold storage

The [multisig contract](https://github.com/dusk-network/multisig-contract) contains an example of how to do multi-signature transfers, where only *N* out of *M* keys must sign a message to transfer DUSK to another account.

Users get to create accounts owned by multiple different BLS keys, where any important action must be signed (agreed upon) by some configurable portion of those keys.

## Compliance

Dusk is **fully compliant** with key global regulatory frameworks, providing robust adherence to financial and data protection standards:

- Market Abuse Regulations (MAR)
- Data Protection Regulations (GDPR)
- Anti-Money Laundering Directive (AMLD5)
- MiCA (Markets in Crypto-Assets Regulation)
- TFR (Transfer of Funds Regulation)

The protocol’s dual-model ([Moonlight](/learn/tx-models#moonlight) and [Phoenix](/learn/tx-models#phoenix)) offers a unique design that combines both confidentiality and regulatory compliance. Unlike traditional privacy coins, Dusk doesn't aim for full anonymity, but instead provides both privacy and regulatory compliance.

### Compliance in Moonlight (public)

[Moonlight](/learn/tx-models#moonlight) is designed specifically for full transaction transparency, making it ideal for integration with exchanges and ensuring that:

- **CASPs** can easily meet compliance obligations under **AMLD5**, **MiCA**, and **TFR**.
- There is full support for **KYC**, transaction monitoring, and reporting requirements without any legal or technical barriers.

:::note[Important]
Exchanges **only** need to support the Moonlight transaction model.
::: 

### Compliance in Phoenix (shielded)
A user can **only** convert shielded funds to a public address that they control, and this is **cryptographically enforced** through signature verification.

This implies that, as long as an exchange does not explicitly share their shielded addresses to its users, there is **no way** for deposits to be made via shielded transactions. Even within shielded transfers, the sender’s identity is **always** revealed to the receiver, preventing anonymous inflows. An exchange is always able to send back funds received from a shielded address to the owner of the sending address.

These design decisions serve an important compliance function:

- 🔐 Conversions between shielded and public balances are **only** possible for the rightful owner.
- ❌ No shielded-to-public transfers can occur without **cryptographically proven ownership** of the target address.
- 🛡️ Exchanges are **inherently** protected from untraceable or unauthorized deposits.
- 🧾 Sender identification is done in **all** shielded transactions.

This architecture makes Dusk fundamentally different from privacy coins, as they focus on full anonimity. Dusk is designed to offer privacy with accountability, enabling full compliance while preserving confidentiality when needed.

:::note[Important]
It is important to note that exchanges do **not** need to support the Phoenix transaction model.
::: 

### Legal opinion
To reinforce confidence in compliance, there is a comprehensive and detailed **legal opinion** confirming adherence to applicable laws and regulations. This document is available for review upon request.


## Resources

- [Whitepaper](https://dusk-cms.ams3.digitaloceanspaces.com/Dusk_Whitepaper_2024_4db72f92a1.pdf)
- [Audits](https://github.com/dusk-network/audits)
### Libraries

- [W3sper SDK](/developer/integrations/w3sper)
- [Wallet Stack](/developer/integrations/wallet-stack)
- [RUES (events system)](/developer/integrations/w3sper)

### User-facing tools

- [Block explorer](https://explorer.dusk.network/)
- [Web Wallet](https://wallet.dusk.network/)

### Token details

- Token: `dusk`
- Token decimals: `9` (18 decimals for ERC-20 / BEP-20 versions)
- [Tokenomics and metrics](https://docs.dusk.network/learn/tokenomics)
- Consensus Mechanism: [Succinct Attestation Consensus](https://docs.dusk.network/learn/deep-dive/succinct-attestation)

  
## Q&As
### Status of Hardware Wallet Support

Hardware Wallet integration is a work in progress.

### Status of Custody Solution Support

Custodial integration is a work in progress.

### Cross-Chain Fees

For token migrations, the Dusk team covers the fees on the Dusk mainnet.
Users are responsible for the fees of Binance Smart Chain and Ethereum.


### Token Migration

Mainnet is now live, and users can still migrate from ERC-20 DUSK and BEP-20 DUSK to native DUSK by using the [migration contract](https://github.com/dusk-network/dusk-migration) to burn their tokens and release an equivalent amount of DUSK on the Dusk mainnet to the specified target address. 

More information about the Mainnet migration can be found [here](/learn/guides/mainnet-migration).

Current token contracts are:
- ERC-20 Contract Address: [0x940a2db1b7008b6c776d4faaca729d6d4a4aa551](https://etherscan.io/address/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551)
- BEP-20 Contract Address: [0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c](https://bscscan.com/token/0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c)

The [migration contract](https://github.com/dusk-network/dusk-migration) has been [audited](https://github.com/dusk-network/audits/blob/main/core-audits/2024-10_migration-smart-contract-security-assessment_zellic.pdf) and is be accessible via the [Dusk Wallet](https://wallet.dusk.network/).
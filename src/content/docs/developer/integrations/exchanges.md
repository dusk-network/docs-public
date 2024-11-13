---
title: Integrate with Exchanges
description: Add Dusk to an Exchange
---

# Introduction

This guide shows how to add DUSK to an Exchange by providing all the relevant information. In the first section we outline general details regarding the upcoming mainnet launch and token migration. We will then look into what are the available libraries and APIs to access and interact with the blockchan, as well as providing links to all the relevant resources, and addressing some common requests.

## Token Migration

Users will be able to migrate from ERC-20 DUSK and BEP-20 DUSK to native DUSK by using the [migration contract](https://github.com/dusk-network/dusk-migration) to burn their tokens and release an equivalent amount of DUSK on the Dusk mainnet to the specified target address. 

More information about the Mainnet migration can be found [here](/learn/guides/mainnet-migration).

Current token contracts are:
- ERC-20 Contract Address: [0x940a2db1b7008b6c776d4faaca729d6d4a4aa551](https://etherscan.io/address/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551)
- BEP-20 Contract Address: [0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c](https://bscscan.com/token/0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c)

The [migration contract](https://github.com/dusk-network/dusk-migration) has been [audited](https://github.com/dusk-network/audits/blob/main/core-audits/2024-10_migration-smart-contract-security-assessment_zellic.pdf) and will be accessible via the [Dusk Wallet](https://wallet.dusk.network/).

## Connect to Dusk

To access the blockchain you can either:
- Spin up a node (query data, submit transactions, provide APIs)
- Use Dusk APIs (events system, HTTP ...)
- Use RPC providers

### Spin up a node

You can access the blockchain and submit transactions by running a Dusk node.

The installation instructions can be found [here](/operator/01-installation), and requirements are different depending on if the node is a [Provisioner](/operator/02-provisioner) or an [Archiver](/operator/03-archiver).

### Use Dusk APIs

Dusk exposes the following APIs:
- [RUES](/developer/integrations/rues): Provides an event system for streamlining information from the network.
- HTTP API (Work in Progress)
  
### Use RPC providers

You can rely on the RPC infrastructure hosted by the community, or run an [Archiver](/operator/03-archiver) yourself.

## Token Deposits and Withdrawals

You can subscribe via websocket to deposit and withdrawal events using [RUES](/developer/integrations/rues#event-subscriptions).

In most cases, 1 block confirmation is sufficient for finality. The only exception to the 1 block finality is when the network is in a rolling finality state, in which up to 5 additional blocks may be required to achieve finality.

## Construct, sign and decode transactions

The [W3sper SDK](https://github.com/dusk-network/rusk/tree/master/w3sper.js) provides address generation, transaction building, signing, and decoding functionalities. It can operate completely offline, without the need for an online wallet or node. The W3sper SDK leverages [wallet-core](https://github.com/dusk-network/dusk-wallet-core) to facilitate offline transaction processing and signing, producing both the transaction hash and signed transaction outputs. The library for transaction serialization and decoding is called [dusk-bytes](https://github.com/dusk-network/dusk-bytes).


## Cold Storage Method

The [multisig contract](https://github.com/dusk-network/multisig-contract) contains an example of how to do multi-signature transfers, where only *N* out of *M* keys must sign a message to transfer DUSK to another account.

Users get to create accounts owned by multiple different BLS keys, where any important action must be signed (agreed upon) by some configurable portion of those keys.



## Resources
### Libraries

- [Wallet Stack](/developer/integrations/wallet-stack.mdx)
- [Wallet Core](/developer/integration/wallet-core)
- [W3sper SDK](/developer/integrations/w3sper)
- [RUES (events system)](/developer/integrations/w3sper)

### Links

- [Block explorer](https://explorer.dusk.network/)
- [Web Wallet](https://wallet.dusk.network/)

### Token details

- Token: `dusk`
- Token decimals: `9` (18 decimals for ERC-20 / BEP-20 versions)
- [Tokenomics and metrics](https://docs.dusk.network/learn/tokenomics)
- Consensus Mechanism: [Succinct Attestation Consensus](https://docs.dusk.network/learn/deep-dive/succinct-attestation)

### Audits
- [Audits Reports](https://github.com/dusk-network/audits)
  
## Q&As
### Status of Hardware Wallet Support

Hardware Wallet integration is a work in progress.

### Screening tools

Screening tools are available for DUSK.

### Cross-Chain Fees

For token migrations, the Dusk team will cover the fees on the Dusk mainnet.
Users are responsible for the fees of Binance Smart Chain and Ethereum.

---
title: Exchanges
description: Add Dusk to an Exchange
---
# Introduction

This guide shows how to add DUSK to an Exchange by providing all the relevant information. In the first section we outline general details regarding the token and links to relevant resources. We will then see what are the available libriaries and APIs to access and interact with the blockchan,  as well as addressing some common requests from exchanges.

# Mainnet Launch
Dusk is launching its mainnet on the **20th of September**, meaning that Exchanges will be able to offer native DUSK. 


# Token Migration
Users will be able to migrate from ERC-20 DUSK and BEP-20 DUSK to native DUSK (`dusk`) by using the one-way bridge. By burning a ERC-20/BEP-20 token amoint, an equivalent amount of `dusk` is released on the Dusk mainnet to the specified target address. In other words, by sending ERC-20/BEP-20 DUSK to a burner contract, users will receive `dusk` to the address they specified. There is no ETA on when /if the migration will be deprecated.

The burner contract will be accessible from the [Dusk Wallet](https://wallet.dusk.network/).

To ensure the integrity of cross-chain operations, the bridge is undergoing a comprehensive security audit. Successively, the one-way migration bridge will become a full two-ways Dusk <> EVM bridge.

Token contracts:

- ERC-20 Contract Address: [0x940a2db1b7008b6c776d4faaca729d6d4a4aa551](https://etherscan.io/address/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551)
- BEP-20 Contract Address: [0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c](https://bscscan.com/token/0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c)


# Connect to Dusk
To access the blockchain you can either:
- Spin up a node (query data, submit transactions, provide APIs)
- Use Dusk APIs (events system, HTTP ...)
- Use RPCs providers

  
## Spin up a node
You can access the blockchain and submit transactions by running a Dusk node. [Technical requirements](https://docs.dusk.network/getting-started/node-setup/node-requirements) are quite light, and you can either [build it from source](https://docs.dusk.network/getting-started/node-setup/build-from-source) or run a [Docker image](https://docs.dusk.network/getting-started/node-setup/docker-image).

## Use Dusk APIs
Dusk exposes the following APIs;
- [RUES](https://github.com/dusk-network/rusk/wiki/RUES-%28Rusk-Universal-Event-System%29): Provides an event system for streamlining information from the network.
- HTTP API: The HTTP API is currently under development.
  
## Use RPCs providers
You can rely on the RPCs infrastructure hosted by the community.

# Construct, sign and decode transactions

The [W3sper SDK](https://github.com/dusk-network/rusk/wiki/%5BDraft%5D-W3sper-SDK) provides address generation, transaction building, signing, and decoding functionalities. It can operate completely offline, without the need for an online wallet or node. The W3sper SDK leverages [wallet-core](https://github.com/dusk-network/dusk-wallet-core) to facilitate offline transaction processing and signing, producing both the transaction hash and signed transaction outputs. The format for transaction serialization and decoding is called `duskbytes`.

# Token Deposits and Withdrawals
You can subscribe via websocket to deposits and withdrawals events using [RUES](https://github.com/dusk-network/rusk/wiki/RUES-%28Rusk-Universal-Event-System%29) can be fetche Block Confirmations: 1 block for deposit finality. The only exception to the 1 block finality is when the network is in a rolling finality state, in which few more blocks are required for finality.
- Blockchain Explorer & Developer Tools
Blockchain Explorer: Access the Dusk [Dusk block explorer](https://explorer.dusk.network/) here.
Technical Documentation: Developer resources regarding integrations can be found [here](http://dusk.network/developer/integrations/introduction/).


1. Support & Tools
Hardware Wallet Support: Work in progress; cold storage is planned.
Cross-Chain Fees: The Dusk team will cover the fees on the Dusk mainnet for migrations, while users are responsible for fees on Binance Smart Chain and Ethereum.



## Token Details
The currency for paying gas fees on mainnet is `dusk`, which has 9 decimals (as opposed to the ERC-20/BEP-20 token contracts of `18` decimals). 

# Users
- Testnet Information
Dusk Incentivized Testnet had approximately 8,000 nodes, and the number of Provisioners currently validating on Nocturne Testnet can be found in the [blockexplorer](https://explorer.dusk.network/).
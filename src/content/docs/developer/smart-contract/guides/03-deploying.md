---
title: Deploy a contract
description: Deploy smart contracts to the Dusk blockchain.
---

This page is about deploying contracts to the Dusk blockchain.

#### Deployment CLI

To make deployment easier we provide a deployment CLI tool:
[Dusk deploy cli](https://github.com/dusk-network/dusk-deploy-cli/)

#### Let contracts deploy other contracts

With the introduction of a contract deployment transaction type, smart contracts deployments can be executed via transactions. This implies that developers can deploy smart contracts after the genesis block, as the new transaction type includes:

- The owner of the transaction, identified by a BLS Public Key.
- The <a href="https://github.com/dusk-network/rusk/wiki/Contract-File-Format" target="_blank">contract</a>.
- The init arguments. These arguments are passed to the init function in your contract.

The gas fees related to the contract deployment are proportional to the number of bytes of the contract's bytecode:

`Total Cost=Bytecode Length × GAS_PER_DEPLOY_BYTE × Current Gas Price`

Since a deployment may execute some contract initialization code, that code will also be metered and executed with the given `gas_limit`.



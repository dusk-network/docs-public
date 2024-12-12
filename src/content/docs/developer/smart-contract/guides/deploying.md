---
title: Deploy a Contract
description: Learn how to deploy smart contracts on the Dusk blockchain.
---

This guide explains how to deploy smart contracts to the Dusk blockchain using the Rusk wallet.

## Deploying with Rusk Wallet

To simplify smart contract deployment, we provide built-in functionality within the [Rusk Wallet](https://github.com/dusk-network/rusk/tree/master/rusk-wallet/src/bin). Follow the [Rusk Wallet README](https://github.com/dusk-network/rusk/blob/master/rusk-wallet/src/bin/README.md#installation) to install a local instance.

### Preparation

1. **Install Rusk Wallet:** Follow the installation guide linked above.
2. **Compile Your Contract:** Refer to the [Smart Contract Compilation Guide](/developer/smart-contract/guides/compiling) and obtain the `WASM` output for your smart contract.
3. **Fund Your Wallet:** Ensure your wallet has sufficient funds for deployment.

### Deployment Command

Use the following command to deploy a contract:

```bash
rusk-wallet contract-deploy \
  --code <PATH_TO_WASM_CONTRACT> \
  --init-args <INITIALIZATION_ARGUMENTS> \
  --deploy-nonce <DEPLOY_NONCE> \
  [--address <DEPLOYER_ADDRESS>] \
  [--gas-limit <GAS_LIMIT>] \
  [--gas-price <GAS_PRICE>]
```

The `deploy_once` should be a unique number for the deployer’s wallet. It distinguishes the deployment from other deployments of the same contract (code) made by the same wallet. If the same deployer deploys the same contract again, a different nonce must be used.

If different wallets deploy the same contract with the same nonce, the resulting contract addresses will still be unique because they are determined by combining the contract's bytecode, the deploy nonce, and the deployer’s public key.

## Deployment fee

The gas fees related to the contract deployment are proportional to the number of bytes of the contract's bytecode:

`Total Cost=Bytecode Length × GAS_PER_DEPLOY_BYTE × Current Gas Price`

Since a deployment may execute some contract initialization code, that code will also be metered and executed with the given `gas_limit`.

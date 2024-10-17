---
title: Getting Started
description: This resource outlines the hardware and software requirements for the node. Explore the different node types and different ways to setup a node.
---


Once you have [installed Rusk](/operator/node-installation/getting-started), you will be asked to add your consensus keys. These keys are used to sign and vote for blocks.

## Obtain a mnemonic
If you haven't obtained a mnemonic yet, you can do so by do so by:
- Using the command `rusk-wallet`and select *New Address*
- Using the [Web Wallet](https://wallet.dusk.network/setup/) to obtain a mnemonic, and then run the following command:
```sh
rusk-wallet restore
```

If your node is not running, you will see a log saying: `some operations won't be available`. This is fine, and happens due to your node not being online yet. You can still continue to follow the steps below.

You will be asked to provide your recovery phrase/mnemonic, **in lowercase**, and to enter a password for the wallet. 

## Set up the wallet password
You will be asked to set a password for your wallet, make sure to back it up. If you are copy-pasting it, make sure that the characters are properly formatted.

## Set up the consensus keys
Once you have a mnemonic and set up a password for your wallet, you can run the following command to export a consensus key for the given wallet:
```sh
rusk-wallet export -d /opt/dusk/conf -n consensus.keys
```

These keys are used to sign messages related to the consensus, such as block proposal, validation, and voting processes.

You will be asked to set an encryption password for the consensus key. Make sure to back it up, and then run the following script to set it as an environment variable:
```sh
sh /opt/dusk/bin/setup_consensus_pwd.sh
```
## Start the node
Once you've configured everything correctly, you can now start rusk:
```sh
service rusk start
```

Your node will now start syncing, and you can check its sync status by running:
```sh
ruskquery block-height
```

You can compare the result with the latest block height on [the block explorer](https://explorer.dusk.network/). Alternatively, you can look into syncing your node by using a [fast-sync](/operator/node-setup/fast-sync) method.

Once your noe is synced, you can [stake some DUSK](/docs/operator/node-setup/staking-dusk).

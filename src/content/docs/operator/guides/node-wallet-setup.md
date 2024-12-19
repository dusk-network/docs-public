---
title: Wallet setup
description: Learn how to setup your Dusk wallet for staking and node running.
---

:::note[Node Installer]
This guide assumes that you have already installed rusk using the node-installer.

You can use read the node installer guide to [quickly launch your node on Dusk mainnet](https://github.com/dusk-network/node-installer) or [testnet](/operator/guides/nocturne-node)
:::

This guide explains setting up the wallet and the last steps needed to start running your node.

## Preparation

### Obtain a mnemonic

If you haven't obtained a mnemonic yet, you can do so by:
- Using the command `rusk-wallet`and select the option to create a new wallet.
- Using the [Web Wallet](https://apps.dusk.network/wallet/setup/) to obtain a mnemonic, and then run the following command:

If you haven't made a wallet yet, use our CLI [Rusk Wallet](https://apps.dusk.network/wallet/setup/), which you can download [here](https://github.com/dusk-network/rusk/actions/runs/11113602682/artifacts/1997624810), and create a new wallet.

**It is important that you back up your mnemonic phrase and don't share it with anyone as this is gives anyone access to your wallet and funds**

You can either write the mnemonic phrase down or create the wallet locally on your computer, backup the file and use the restore option on the server.

### Restore Wallet

If you already have a mnemonic it is time to set your wallet up on the node.

Once you have access to a Dusk mnemonic, run the following command:
```sh
rusk-wallet restore
```

If your node is not running, the wallet might tell you `some operations won't be available`. This is fine, and happens due to your node not being online yet. You can still continue to follow the steps below.

You will be asked to provide your recovery phrase/mnemonic, **in lowercase**, and to enter a password for the wallet.

#### Export consensus key

Once you've done so, run the following command to export a **consensus key** for the given wallet:
```sh
rusk-wallet export -d /opt/dusk/conf -n consensus.keys
```

To participate in consensus, Rusk needs your consensus keys. These keys are used to sign and vote for blocks. You will be asked to set an encryption password for the consensus key, make sure to remember it.

Now, run the following script and provide the **same password** (for consensus key) from before. This will set the password as an environment variable for Rusk to use.
```sh
sh /opt/dusk/bin/setup_consensus_pwd.sh
```

#### Start your node

If you've configured everything correctly, you can now start rusk:
```sh
service rusk start
```

Your node will now start syncing. You can check if it indeed is by running:
```sh
ruskquery block-height
```

It is best to wait until your node is synced up. You can find the latest block height on [the block explorer](https://explorer.dusk.network/). Alternatively, consider [fast-syncing](/operator/guides/fast-sync) for a quicker method.

## Stake your DUSK

The final step is to stake. To allow your node to actively participate in the consensus & receive rewards for doing so, your wallet needs to stake a minimum of 1000 DUSK. If you want to stake 1000 DUSK, you can initiate staking by running the following command in the terminal:

You can stake by running:

```sh
rusk-wallet stake --amt 1000 # Or however much you want to stake
```

Once the transaction has gone through, you can view your staking information by running:
```sh
rusk-wallet stake-info
```

To see if your node is participating in consensus and creating blocks, occasionally check:
```sh
grep "execute_state_transition" /var/log/rusk.log | tail -n 5
```

Note that this can take a while, given that your stake needs at least 2 epochs, or 4320 blocks, to mature. Your stake, relative to the total stake, also plays a factor.

If everything went right, and your node starts accepting and creating blocks, you have successfully set up your wallet & node!

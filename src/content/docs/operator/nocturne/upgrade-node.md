---
title: Node Upgrade
description: This page outlines how you can upgrade your Nocturne node setup.
---

We will occasional upgrade and patch Nocturne with new features and patches to improve the overall network.

To make the upgrade process as flawless as possible, we will update the [node installer](https://github.com/dusk-network/node-installer) script from time to time. This script can be ran in a non-destructive way, meaning it changes only what is needed. It will gracefully shut down Rusk for you.

Are you migrating from Nocturne 1 to Nocturne 2? See [Nocturne Reset](#nocturne-reset).

## How to Upgrade

To upgrade to the latest Nocturne version, run:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/node-installer/releases/download/v0.3.3/node-installer.sh | sudo sh
```

Once it's done and gives no errors, start Rusk again:
```sh
service rusk start
```

If everything is up and running again, query the node a couple of times to see if the block height is progressing:
```sh
ruskquery block-height
```

Or keep an eye on the logs to see if it's making and accepting new blocks:
```sh
tail -F /var/log/rusk.log
```

If you see new blocks being accepted, you're up and running again. Is your node stuck, or are you not sure if it is?

You can see the status of the Rusk service here:
```sh
service rusk status
```

If it is not running after starting it, and reports an error, you can check your logs to see if something is wrong, like a wrong password or no peers being found:
```sh
tail -n 30 /var/log/rusk.log
```

Unable to figure it out yourself? Visit our [Node Runner Troubleshooting](https://discord.com/channels/847466263064346624/1118582421055606805) on Discord.

If everything else fails, check out the [manual resync](/operator/node-setup/manual-resync) instructions.

## Nocturne Reset

1. To reset the state of Nocturne, download the latest version of our installer:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/node-installer/releases/download/v0.3.3/node-installer.sh | sudo sh
```

2. Reset all the data on your node:
```sh
ruskreset
```
Press Y to accept the deletion of all the state.

3. Start Rusk:
```sh
service rusk start
```

4. Check if you're already staking by running:
```sh
rusk-wallet stake-info
```
If you already have DUSK staked, wait until the chain starts producing blocks. You can check [our explorer](https://testnet.apps.dusk.network/explorer/) to see if the chain is progressing or when it will produce the genesis block.

5. If you do not have testnet DUSK, request nDUSK from the faucet. A guide can be found [here](/operator/nocturne/testnet-faucet).

6. Stake your nDUSK:
```sh
rusk-wallet stake --amt 1000 # Or however much you want to stake
```
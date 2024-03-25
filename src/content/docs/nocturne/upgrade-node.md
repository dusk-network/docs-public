---
title: Node Upgrade
description: "This page outlines how you can upgrade your Nocturne node setup"
---

We will occasional upgrade and patch Nocturne with new features and patches to improve the overall network.

To make the upgrade process as flawless as possible, we will update the [node installer](https://github.com/dusk-network/node-installer) script from time to time. This script can be ran in a non-destructive way, meaning it changes only what is needed. It will gracefully shut down Rusk for you.

To upgrade to the latest Nocturne version, run:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/node-installer/releases/download/v0.1.10/node-installer.sh | sudo sh
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

If everything else fails, check out the [manual resync](/getting-started/node-setup/manual-resync) instructions.

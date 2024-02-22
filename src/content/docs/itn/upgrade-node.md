---
title: Node Upgrade
description: "This page outlines how you can upgrade your ITN node setup"
---

We will occasional upgrade and patch the ITN with new features and patches to improve the overall network.

To make the upgrade process as flawless as possible, we will update the [ITN installer](https://github.com/dusk-network/itn-installer) script from time to time. This script can be ran in a non-destructive way, meaning it changes only what is needed.

To upgrade to the latest ITN version, run:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/itn-installer/releases/download/v0.1.4/itn-installer.sh | sudo sh
```

Once it's done and gives no errors, start Rusk again:
```sh
service rusk start
```

Keep an eye on the logs to see if it's making and accepting new blocks:
```sh
tail -F /var/log/rusk.log
```

If you see new blocks being accepted, you're up and running again. Is your node stuck, or are you not sure if it is? Check out the [manual resync](/getting-started/node-setup/manual-resync) instructions.
---
title: Node Installer
description: Install and launch your node easily with the installer script.
---

If you want to spin up a node on the Nocturne testnet, you can use the [node installer](https://github.com/dusk-network/node-installer) script. This installer will set up Rusk as a service, preconfigure parts of the node, and provide a couple of helper scripts.

You can install Rusk by pasting the following command in your droplet terminal:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/node-installer/releases/download/v0.3.3/node-installer.sh | sudo sh
```

:::note[UFW and other configurations]
The script may enable <a href="https://help.ubuntu.com/community/UFW" target="_blank">ufw</a>  and apply other configurations to your system. If you want to avoid this, please follow the instructions on how to [build from source](/operator/node-installation/build-from-source).
:::

Once your node is installed, you can [configure Rusk](/operator/node-setup/configure_rusk).

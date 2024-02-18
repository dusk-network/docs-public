---
title: Node Running Guide
description: "This guide outlines how to install the Dusk node and join ITN2"
---

In this guide, we’ll be using [DigitalOcean](https://www.digitalocean.com/) (DO) as our go-to [Virtual Private Server](https://en.wikipedia.org/wiki/Virtual_private_server) (VPS) service. The same can be replicated on Vultr, AWS, or any other cloud service. While it is also possible to run a node on home infrastructure, this guide will not deal with those types of setups. 

We work under the assumption that you’ve already created an account for your respective service, and provided it with a payment method.

# Create a droplet

DO uses droplets, which are Linux-based virtual machines. When you’re [logged in](https://cloud.digitalocean.com/login) and have set up a default project, navigate to _Droplets_ under the _Manage_ section of your project, and click on [_Create Droplet_](https://cloud.digitalocean.com/droplets/new).

![Create droplet page.](../../../assets/itn/node-guide/create-droplet.png)

On the _Create Droplets_ page, select any of the provided regions under the _Choose Region_ header. Choosing different regions is good for decentralization and resilience.

Under _Choose an image_, pick Ubuntu version 22.04 (LTS) x64.

![Select region and image for the droplet.](../../../assets/itn/node-guide/region-image-droplet.png)

Next, we have to pick the size of the droplet. The [node requirements](https://docs.dusk.network/getting-started/node-setup/node-requirements) for a provisioner node are in line with the _SHARED CPU_ -> _Regular_ -> $24/mo option. Select it.

![Select size of the droplet.](../../../assets/itn/node-guide/requirements-droplet.png)

Choose an authentication method to access your droplet. Using an SSH key is more secure, but you can also use a password if you prefer. We recommend the SSH key approach. You can follow DOs instructions here: [How to Add SSH Keys to New or Existing Droplets](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/)

![Set an authentication method.](../../../assets/itn/node-guide/authenticate-droplet.png)

That's it for creating your droplet! Give it a hostname, and click on _Create Droplet_:

![Create the droplet.](../../../assets/itn/node-guide/finish-droplet.png)

DO will now set the droplet up for you. This can take a minute:

![Droplet being created.](../../../assets/itn/node-guide/droplet-creation.png)

# Configure Firewall

The Rusk node makes use of the Kadcast protocol to communicate messages between nodes on the network. This protocol uses UDP, and runs on a custom port. Due to the nature of how UDP works, Kadcast is not automatically port forwarded. Regardless of where the node is hosted, it is important that this is done.

Depending on the cloud provider, we need to either add a firewall rule on the instance you’re running, or add a firewall group. If you’re running a local setup, you will need to enable port forward in your router.

DO works with firewall groups. Navigate to _Networking_ -> _Firewalls_ under the _Manage_ section of your project. Click on the [_Create Firewall_](https://cloud.digitalocean.com/networking/firewalls) button.

![Create firewall page.](../../../assets/itn/node-guide/create-firewall.png)

Give the firewall a name, open UDP under port 9000 and TCP under 8080. Leave all the Outbound rules as they are. 

Apply the rules to the itn-node droplet you made.

Your firewall should look as follows:

![Configure firewall.](../../../assets/itn/node-guide/configure-firewall.png)

Click on _Create Firewall_ to apply this firewall to your node's droplet.

# Install Rusk

Navigate back to your [droplets overview](https://cloud.digitalocean.com/droplets) and select your ITN droplet:

![Droplet overview.](../../../assets/itn/node-guide/droplet-overview.png)

You can connect to your node through SSH on your local machine, or simply click on _Console_ on your droplets page:

![Connect to droplet through web UI.](../../../assets/itn/node-guide/droplet-console.png)

A terminal should pop-up and connect you to your Droplet

![Droplet terminal.](../../../assets/itn/node-guide/droplet-terminal.png)

Just like last time, we've created an easy to use [ITN installer](https://github.com/dusk-network/itn-installer). This installer will set up Rusk as a service on your droplet, preconfigure parts of the node, and provide a couple of helper scripts.

Install Rusk by pasting the following command in your droplet terminal:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/itn-installer/releases/download/v0.1.0/itn-installer.sh | sudo sh
```

# Configure Rusk

Once everything has been set up, you will be asked to add your consensus keys. These keys are used to sign and vote for blocks.

If you haven't made a wallet yet, go to our [Web Wallet](https://wallet.dusk.network/setup/) and create a new wallet. You can request funds from our [faucet here](https://faucet.dusk.network/). The faucet will give you 1100 tDUSK. The minimum to stake is 1000 tDUSK.

Once you have access to a Dusk mnemonic, run the following command:
```sh
rusk-wallet restore
```

You will be asked to provide your recovery phrase/mnemonic, **in lowercase**, and to enter a password for the wallet. 

Once you've done so, run the following command to export a consensus key for the given wallet:
```sh
rusk-wallet export -d /opt/dusk/conf -n consensus.keys
```

You will be asked to set an encryption password for the consensus key. Remember it and run the following script to set it as an environment variable:
```sh
sh /opt/dusk/bin/setup_consensus_pwd.sh
```

If you've configured everything correctly, you can now start rusk:
```sh
service rusk start
```

Your node will now start syncing. You can check if it indeed is by running:
```sh
grep "block accepted" /var/log/rusk.log
```

It is best to wait until your node is synced up. You can find the latest block height on [our explorer](https://explorer.dusk.network/).

# Stake tDUSK

The final step is to stake. You can stake by running:
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

If everything went right, and your node starts accepting and creating blocks, you have succesfully set up your ITN node!
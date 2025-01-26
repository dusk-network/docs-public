---
title: Run an archive node
description: A step-by-step guide to setting up a Dusk archive node.
---

This guide will explain you how to install and setup an archive node on Ubuntu 24.04 through the [node installer](https://github.com/dusk-network/node-installer). This installer will set up Rusk as a service on your server, preconfigure parts of the node, and provide a couple of helper scripts.

Install Rusk with the archive feature enabled by pasting the following command in your server terminal:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/node-installer/releases/latest/download/node-installer.sh | sudo bash -s -- --feature archive
```

This will install an archive node with the network being set to mainnet.

## Configure Rusk

You now should have successfully installed Rusk.

A quick check with:

```sh
ruskquery version
```

Should tell you, that you are running the latest installer version.

## Start your node

If you've configured everything correctly, you can now start rusk:
```sh
service rusk start
```

Your node will now start syncing. You can check if it indeed is by running:
```sh
ruskquery block-height
```

It is best to wait until your node is synced up. You can find the latest block height on [the block explorer](https://explorer.dusk.network/). Alternatively, consider [fast-syncing](/operator/guides/fast-sync) for a quicker method.

## Enable http

If you want to serve archive data to the outside world, your node needs to enable the http capabilities. This can be done by adding

```toml
// rusk.toml
[http]
listen = true
listen_address = '0.0.0.0:8080'
```

To your rusk.toml file in your system's `/opt/dusk/conf` folder. That's it.

Now you can query the archive for data with an external client application.

## Test archive endpoint

You can check which graphQL endpoints are available by calling the endpoint with an empty query:
```bash
curl -i -H 'Content-Type: application/json' \
   -X POST -d "" https://yournodeIPorDomain.example
```

This should now return a different list than a normal node returns. An example endpoint that is now available is the **checkBlock** endpoint, which returns true or false whether a block height matches a specific block hash, which can also be queried only for finalized blocks.

In order to test this endpoint, you can run the following command.

```bash
curl -i -H 'Content-Type: application/json' \
   -X POST -d "query { checkBlock(height: 1, hash: \"abc\", onlyFinalized: true) }" https://yournodeIPorDomain.example
```

which should return `{"checkBlock":false}`

## Stake with archive node

It is possible to stake and participate in consensus while the archive node is running. This is usually not recommended, but is possible since the archive is built on top of a normal provisioner node and therefore has all the capabilities to do so.

You can read the [node wallet guide](/operator/guides/node-wallet-setup) for a step-by-step instruction on setting up the wallet, depending on if you want the archive node to participate in consensus too or not.

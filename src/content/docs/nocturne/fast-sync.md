---
title: Fast syncing
description: "How to fast sync your node"
---

The node installer comes with an easy to use fast syncing tool. To significantly reduce the time required to sync your node to the latest published state, you can use the `download_state` command. This command stops your node and replaces its current state with the latest published state from one of Dusk's archival nodes.

## Available states

To see the available published states, run:
```sh
download_state --list
```

## Download state

To install the latest state, simply run:
```sh
download_state
```

Once it tells you the operation is complete, run the following command to start your node again:
```sh
service rusk start
```

This process will ensure your node is up-to-date with the latest blockchain state, allowing you to sync faster and get back to participating in the network in less time.

:::note
If you are experiencing errors in downloading the state, it might be due to some remnants of previous state syncing. Try to clean up with:
```sh
sudo rm /tmp/state.tar.gz
```
:::
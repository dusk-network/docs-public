---
title: Restore Block Height
description: Speed up your wallet synchronization! Discover what restore block height is, why it matters, and how to adjust it for optimal performance.
---

Your cryptocurrency wallet works by keeping track of the blockchain, the complete record of all transactions on the network. Normally, when you reset a wallet, it will "sync" with the network and download the entire blockchain history. This is also known as sync from genesis block. However, we also provide an option to sync from a specific point in the blockchain's history (a specific block height).

:::note[Note]
New wallets are instantly usable. To sync the full blockchain history (from genesis), visit the Settings section.
:::

## Why Sync From a Specific Block Height

- **Faster Initial Setup:** Starting at a later block height can significantly reduce the time it takes your wallet to get up and running.
- **Reduced Storage:** Syncing from the very beginning requires a huge amount of storage space. Choosing a later starting point lessens these storage needs.

## Cautions and Considerations

- **Missing Earlier Transactions:** Your wallet will only be aware of transactions after the block height you choose. If there are transactions related to your wallet before that point, you will not see them. This will also lead to a wrong balance being displayed.
- **Longer Initial Sync Time:** Choosing a lower restore height than your earliest transaction will unnecessarily increase your wallet's initial sync time.
- **Regulatory and Compliance:** Syncing from a later point may lead to incomplete records, potentially hindering compliance or creating legal risks. Always consult applicable regulations.

## Finding Your Wallet's Creation Block

**During Wallet Creation:** The current block height is displayed as a step during the wallet creation process.

**After Wallet Creation/Restoration:** The safest block height to resync from is available in Settings. _(coming soon)_

## Restoring From Custom Block Height

:::note[Caution]
If you do not know the exact block height of your first transaction, or the wallet creation, it is better to err on the side of caution and choose a slightly earlier restore height. Alternatively, you could sync from the genesis block.
:::

**During Wallet Restoration:** The option to restore from a specific block height is an optional step during the wallet restoration process. By default, a sync from the genesis block will be initialized.

**After Wallet Creation/Restoration:** The option to either resync from genesis or a custom block height is available in Settings. This rebuilds the wallet's cache and can potentially take a long time, dependant on the option and the block height selected. _(coming soon)_

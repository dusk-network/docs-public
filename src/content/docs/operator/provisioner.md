---
title: Run a Provisioner
description: Discover how to install and configure a Dusk Validator Node (Provisioner) to participate in consensus and start staking.
---

Dusk supports multiple node configurations, with Provisioners being the only node type directly incentivized by the protocol through staking rewards. As the backbone of network security and transaction validation, Provisioners play a crucial role in processing and appending new blocks to the Dusk blockchain.

Provisioners are required to stake a **minimum of 1000 DUSK** to participate in the consensus mechanism. In return, they earn rewards for validating transactions and generating blocks, providing a financial incentive for securing the network. These rewards not only compensate users for locking up their assets but also encourage ongoing participation in block creation and voting.

To protect network integrity, Dusk enforces [hard-slashing and soft-slashing](/operator/provisioner#slashing) mechanisms. These are designed to discourage malicious or negligent actions by penalizing Provisioners who deviate from protocol standards.

If you want to quickly launch a Provisioner on Nocturne Testnet, you can use the <a href="https://github.com/dusk-network/node-installer" target="_blank">Noctune node installer</a> by following [this guide](/operator/guides/nocturne-node).

### Provisioner Specifications

The following specifications support Provisioner nodes with limited proving capacity.

For optimized performance, nodes should support efficient single-threaded processing.

| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 2 cores; 2 GHz | 4 GB | 50 GB | 10 Mbps |


Once you have [installed Rusk](/operator/installation), you will be asked to add your consensus keys. These consensus keys are essential for signing messages in block proposal, validation, and voting processes.

## Obtain a mnemonic
If you haven't obtained a mnemonic yet, you can do so by:
- Using the command `rusk-wallet`and select *New Address*
- Using the [Web Wallet](https://wallet.dusk.network/setup/) to obtain a mnemonic, and then run the following command:
```sh
rusk-wallet restore
```

If the node isn’t running, a log message will indicate that: `some operations won't be available`. This is fine, and happens due to your node not being online yet. You can still continue to follow the steps below.

You will be asked to provide your recovery phrase/mnemonic, **in lowercase**, and to enter a password for the wallet. 

## Set up the wallet password

Choose a secure password for your wallet and store it safely, checking that all characters are correctly formatted if you are copy-pasting

## Set up the consensus keys
Once you have a mnemonic and set up a password for your wallet, you can run the following command to export a consensus key for the given wallet:
```sh
rusk-wallet export -d /opt/dusk/conf -n consensus.keys
```

Consensus keys are essential for signing messages during block proposal, validation, and voting.

You will be asked to set an encryption password for the consensus key. Make sure to back it up, and then run the following script to set it as an environment variable:
```sh
sh /opt/dusk/bin/setup_consensus_pwd.sh
```
## Start the node
Once you've configured everything correctly, you can now start Rusk:
```sh
service rusk start
```

Your node will now start syncing, and you can check its sync status by running:
```sh
ruskquery block-height
```
Once syncing, you can verify the node’s status by comparing its block height with the latest on [the block explorer](https://explorer.dusk.network/). Alternatively, consider [fast-syncing](/operator/guides/fast-sync) for a quicker method.

Once your node is synced, you can [stake some DUSK](/operator/provisioner#stake-dusk).

## Stake DUSK

To allow your node to actively participate in the consensus, staking a minimum of 1000 DUSK is required. If you want to stake 1000 DUSK, you can initiate staking by running the following command in the terminal:

```sh
rusk-wallet stake --amt 1000 
```

Once the transaction has gone through, you can view your staking information by running:
```sh
rusk-wallet stake-info
```

To see if your node is participating in consensus and creating blocks, you can occasionally check:
```sh
grep "execute_state_transition" /var/log/rusk.log | tail -n 5
```

Note that this can take a while, given that your stake needs at least 2 epochs, or 4320 blocks, to mature. Your stake, relative to the total stake, also plays a factor.


## Slashing

Slashing is a mechanism used in consensus mechanisms using Proof-of-Stake (PoS), to penalize validators (Provisioners) who engage in malicious behavior or protocol violations.. The primary purpose of slashing is to maintain the security and integrity of the network by disincentivizing harmful actions and ensuring that participants adhere to the protocol's rules.

Slashing penalties can be categorized into two main types depending on the severity of the violation: hard slashing and soft slashing.

## Hard slashing

Hard slashing is applied for serious violations that can significantly undermine the security or stability of the network. Here are some of the scenarios that qualify for hard slashing:
- Producing a block attested as Invalid;
- Producing two different candidates for the same round/iteration;
- Producing two conflicting votes for a single candidate;

The slashed amounts depend on the specific case:
- **Invalid block**: increasing penalties of 10%, 20%, and up to 60% of the initial stake.
- **Double candidate/vote**: 25% of the initial stake.

The slashed amount gets burned, and the provisioner is also suspended for an incremental number of epochs (similarly to the soft-slashing mechanism).

## Soft slashing

Soft slashing encourages provisioners to act honestly and efficiently without imposing overly harsh penalties for minor infractions. This mechanism reduces the impact of a provisioner’s stake rather than decreasing the actual stake.

A scenario that qualifies for soft slashing is, for example, a Block Generator occasionally missing his slot.

The type of soft slashing in Dusk includes two primary mechanisms:
- **Suspension**: temporarily disables the eligibility of a misbehaving Provisioner after a certain number of warnings received. Each fault decreases the warning count, and when warnings reach zero the Provisioner’s stake is suspended for one epoch. After this period, the stake becomes eligible again. If the Provisioner produces a block or a vote, the warning count is restored. If another fault occurs, the suspension period increases incrementally (e.g., two epochs for the second fault). This progressive suspension system gives Provisioners a chance to correct their behavior before facing harsher penalties.
- **Penalization**: reduces a portion of the misbehaving Provisioner’s stake, moving the portion to the claimable rewards, to prevent the loss of DUSK. The penalty amount increases with consecutive suspensions, starting at 10% for the first suspension and increasing by an additional 10% for each subsequent suspension. This method incrementally reduces the Provisioner’s weight in the sortition process without entirely forfeiting their stake. If the stake falls below the minimum value (1000 DUSK), it is frozen and must be recovered by un-staking and re-staking.

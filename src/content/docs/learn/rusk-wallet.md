---
title: Rusk Wallet
description: Using the Rusk Wallet to leverage CLI functionalities when interacting with Dusk.
---

The [**Rusk Wallet**](https://github.com/dusk-network/rusk/tree/master/rusk-wallet) is a powerful and feature-rich command-line interface (CLI) wallet designed for managing DUSK and interacting directly with the network. It allows users to use the command line to perform tasks like sending funds, managing balances, staking, and interacting with smart contracts.


## Commands Overview

The Rusk CLI Wallet comes with several useful options and subcommands for wallet creation, transactions, staking, and more:

| **Subcommand**      | **Description**                                         |
|--------------------|---------------------------------------------------------|
| `create`            | Create a new wallet                                    |
| `restore`           | Restore a lost wallet using the recovery phrase        |
| `balance`           | Check your current DUSK balance                        |
| `history`           | View the transaction history of a wallet address       |
| `transfer`          | Send DUSK through the network                          |
| `shield`            | Convert public DUSK to shielded DUSK                  |
| `unshield`          | Convert shielded DUSK to public DUSK                  |
| `stake`             | Stake DUSK to earn rewards                             |
| `unstake`           | Unstake your DUSK                                      |
| `withdraw`          | Withdraw accumulated staking rewards                   |
| `contract-deploy`   | Deploy a smart contract                                |
| `contract-call`     | Call a contract                                        |
| `export`            | Export your BLS provisioner key-pair                  |
| `settings`          | View current settings                                  |


Some commands can run without an active connection to Rusk (standalone/offline mode):

- `create`: Create a new wallet
- `restore`: Restore an existing wallet
- `addresses`: Retrieve wallet addresses
- `export`: Export your BLS provisioner key-pair
  
All other commands, including transactions, require an active connection to a running Rusk instance.

To explore all available commands, you can run:  
```bash
rusk-wallet help
```

## Wallet Password
By default, the wallet will prompt you for a password to decrypt or encrypt sensitive information. To bypass this prompt in headless environments (e.g., CI pipelines), set the `RUSK_WALLET_PWD` environment variable:

```bash
export RUSK_WALLET_PWD=<your_password>
```

The `RUSK_WALLET_PWD` is used for:

- Wallet decryption (in all commands that use a wallet)
- Wallet encryption (in `create`)
- BLS key encryption (in `export`)
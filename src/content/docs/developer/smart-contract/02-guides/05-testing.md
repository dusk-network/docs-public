---
title: Testing
---

<!-- This guide will explain how to test a contract based on the previous counter Contract from [My first contract](/developer/smart-contract/02-guides/01-my-first-contract) -->

## Writing tests for Contracts

Writing tests for contracts is not as straightforward as for normal Rust programs, because we are in a no_std environment and are using smart contracts that are meant to run in the VM.

There are currently two feasible ways to test your contracts:

- Integration tests can be used to test the interface of the created WASM module with an [ephemeral_vm](https://github.com/dusk-network/rusk/blob/146d97430194a6dc7988e69e04439d8e70cdcd6f/rusk-abi/src/host.rs#L65) from `rusk-abi`. Integration tests can only call the functions which are publicly available (Every function that got wrapped with [rusk-abi](/developer/smart-contract/01-components/02-rusk) through `wrap_call`).
- Deployment & testing on the testnet Nocturne. This can also be automated through a testing project that makes use of the wallet-sdk from Integrations.

An example for integration testing can be seen in the tests folder of our genesis contracts, for example the [staking contract](https://github.com/dusk-network/rusk/tree/master/contracts/stake/tests) or the [transfer contract](https://github.com/dusk-network/rusk/tree/master/contracts/transfer/tests).

<!-- ## Testing on Testnet

-->

### Testing on Nocturne

Testing on Nocturne requires you to deploy the smart contract to the Nocturne chain and call the functions there via transactions. To get nDusk for the testnet you can use the [Faucet](/operator/nocturne/testnet-faucet).

## Additional Resources

- More information on Rusts integration testing capabilities can also be found in the <a href="https://doc.rust-lang.org/book/ch11-03-test-organization.html#integration-tests" target="_blank">Rust book</a> section about integration tests.
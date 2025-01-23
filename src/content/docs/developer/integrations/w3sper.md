---
title: W3sper SDK
description: Use the Dusk toolkit to build, test, and deploy compliant dApps for regulated financial markets.
---

The  <a href="https://github.com/dusk-network/rusk/tree/master/w3sper.js" target="_blank">W3sper SDK</a> (*/ˈwɛs.pər/*) is a comprehensive toolkit of modules designed to facilitate the development of applications that interact seamlessly with the Dusk network.  W3sper ensures secure, flexible interactions directly within the user's environment, eliminating the need for installations.


It empowers developers to deploy not just smart contracts but also the complete user experience, including custom UIs for transaction generation and contract interaction. W3sper allows developers to obtain a rich expressiveness and a standard way to define the client UX.

The W3sper SDK includes the following core features:

- **Address & Account Management**: easily generate and manage user profiles and addresses, streamlining user onboarding and identity management.
- **Balance and Transaction Management**: check balances, create signed transactions, and manage gas effectively.
- **Event Subscription**: stay up-to-date with network events and access blockchain data in real-time.
- **Proof Management**: generate and delegate Zero Knowledge proofs.


## Implementations

The W3sper SDK is making use of WASM, and is available in two implementations:

- **Web SDK**: a JavaScript-based SDK designed for web applications, allowing for seamless integration with browser-based DApps.
- **Native SDK**: built in Rust and available in a separate repository, ideal for native applications requiring high-performance execution.

<a href="https://github.com/dusk-network/rusk/tree/master/w3sper.js" target="_blank">Use the W3sper SDK</a>


## Examples

### Generate a profile using a BIP39 generated seed

_This code can be run in an offline environment_

#### Step 1: Install BIP39 library

```sh
npm install bip39
```

#### Step 2: Use BIP39 library to generate a 64 bit seed, then use this seed to generate a profile and output the default address and account

```js
import bip39 from "bip39";
import { ProfileGenerator } from "@dusk/w3sper";

// Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy, then split this into an array of strings.
const mnemonic = bip39.generateMnemonic();

// Generate 64 byte seed from the mnemonic
const seeder = async () => Uint8Array.from(bip39.mnemonicToSeedSync(mnemonic));

// Instantiate ProfileGenerator
const profiles = new ProfileGenerator(seeder);

// Get the default profile
const defaultProfile = await profiles.default;

// Output the first generated (default) profile account as a string
console.log(defaultProfile.account.toString());

// You could write the output to a file or into storage depending on your needs.
```

### Create transaction

_This code can be run in an offline environment_

```js
import { Network, Transfer } from "@dusk/w3sper";

const amount = 77n; // Example (arbitrary) amount
const to = "oCqYsUMRqpRn2kSabH52Gt6FQCwH5JXj5MtRdYVtjMSJ73AFvdbPf98p3gz98fQwNy9ZBiDem6m9BivzURKFSKLYWP3N9JahSPZs9PnZ996P18rTGAjQTNFsxtbrKx79yWu"; // Example public key
const nonce = 22n // Example (arbitrary) nonce
const gas = { limit: 500_000_000n }; // Example (sensible) gas limit

const transfer = new Transfer(defaultProfile) // defaultProfile can be the same as we generated earlier
    .amount(amount)
    .to(to)
    .nonce(nonce)
    .chain(Network.LOCALNET)
    .gas(gas)
    .build();

// Output the transfer as a string
console.log(transfer.toString()); // "[object Object]"

// You could write the transfer object to a file or into storage depending on your needs.
```

### Execute transaction

_This code needs to be run in an internet connected environment_

```js
import { Network, Transfer } from "@dusk/w3sper";

// Connect to a node (using the Dusk mainnet load balanced URL for this example, but it could be any valid node)
const network = await Network.connect("https://nodes.dusk.network/");


// We will use the transfer object we created above. In a real-world application you would need to retrieve this from a file or out of storage...

// Execute the transaction, propagating to the network
const { hash } = await network.execute(transfer);

// Wait for the response from the network with the hash of the transaction we just executed
const evt = await network.transactions.withId(hash).once.executed();

// Get the gas paid for the transaction
const gasPaid = evt.gasPaid;

// Output the transaction hash
console.log({ hash });

// Output the gas paid (value in lux)
console.log({ gasPaid });
```

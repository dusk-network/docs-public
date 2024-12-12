---
title: Citadel SDK
description: Use the Dusk Citadel SDK to integrate with privacy-preserving and compliant Self-Sovereign Identity (SSI) solutions.
---

**Moat** (a.k.a. the Citadel SDK) is a Software Development Kit allowing developers to implement SSI solutions using Citadel and the Dusk Blockchain. In the next subsections we explain how to use it.

You can find the complete API [here](https://github.com/dusk-network/moat/blob/main/moat/src/api.rs), and a complete example using such API [here](https://github.com/dusk-network/moat/blob/main/moat-example/src/main.rs).


## Prerequisites

**Moat** requires a reachable Rusk node installed and running, or selecting a trusted one. You can set up a node as explained [here](/operator/installation/). It also requires an installed wallet connected to the given Rusk node, as explained [here](https://github.com/dusk-network/rusk/blob/master/rusk-wallet/src/bin/README.md).

## Using the CLI

To use the CLI, you first need to clone the following repository:

```sh
git clone https://github.com/dusk-network/moat.git
cd moat
```

Now, specify the Rusk node address in `moat-cli/config.toml`. Then, you can execute the CLI for any of the involved parties, as follows.

### User

```sh
cargo r --release --bin moat-cli-user -- --wallet-pass <PASSWORD>
```

### License Provider

```sh
cargo r --release --bin moat-cli-lp -- --wallet-pass <PASSWORD>
```

### Service Provider

```sh
cargo r --release --bin moat-cli-sp -- --wallet-pass <PASSWORD>
```

## Import the Required Modules

To use **Moat**, you need the `zk-citadel-moat` Rust crate, available [here](https://crates.io/crates/zk-citadel-moat). In order to use it, you are required to add it as a dependency in your `Cargo.toml` and to use the following modules in your code.

```rust
use dusk_jubjub::JubJubScalar;
use rand::rngs::OsRng;

use zk_citadel_moat::api::{Error, MoatContext, MoatCore};
```

## Create a Moat Context

The first thing to do to use the different options given by Moat, is to specify some settings by means of a Moat Context, as follows.

```rust
// Specify a configuration file path to connect to the Blockchain
let config_path = "./config.toml";

// Specify a wallet file path and its encryption password
let wallet_path = concat!(env!("HOME"), "/.dusk/rusk-wallet/wallet.dat");
let wallet_password = "password";

// Specify the gas configuration for the transactions
let gas_limit = 500000000;
let gas_price = 1;

// Build a configuration object with the previously set information
let moat_context = MoatContext::create(
    config_path,
    wallet_path,
    wallet_password,
    gas_limit,
    gas_price,
)?;
```

## Retrieve Credentials from the Installed Wallet

You can choose to use the same credentials used by the wallet in your Citadel application as well. To get them, you as do as follows.

```rust
// Retrieve the keypair from the installed wallet
let (psk, ssk) = MoatCore::get_wallet_keypair(&moat_context)?;
```

## Request a License

The user can request a license on-chain. In order to create a transaction including that request, it will be necessary to provide the public key `psk_lp` of the LP, doing as follows.

```rust
// Submit a request to the Blockchain
let request_hash = MoatCore::request_license(
    &ssk_user,
    &psk_lp,
    &moat_context,
    &mut OsRng,
)
.await?;
```

## Get Owned Requests

The LP can retrieve all the requests belonging to them (using their secret key `ssk_lp`) from the Blockchain, as follows.

```rust
// Get owned requests
let requests = MoatCore::get_owned_requests(&ssk_lp, &moat_context).await?;
```

## Issuing a License

After receiving a request, the LP can issue a license for that given request. First, it is required to set the attribute data as follows.

:::note[Important]
The attribute data is privately shared on-chain using the Poseidon Cipher. However, it should never contain sensitive information. Instead, the application layer must hash it using, for instance, the Poseidon hash.
:::

```rust
// Set attribute data to, for instance, 1234
let attr_data = JubJubScalar::from(1234u64);
```

The LP can now create a transaction which will issue a license, as follows.

```rust
// Issue a license
let rng = &mut OsRng;
let license_hash = MoatCore::issue_license(
    requests.get(0).expect("A request was owned."),
    &ssk_lp,
    &moat_context,
    &attr_data,
    rng,
)
.await?;
```

## Get Owned Licenses

The user can use their secret key to list the owned licenses, as follows.

```rust
let licenses =
    MoatCore::get_owned_licenses(&ssk_user, &moat_context).await?;
```

## Use a License

To use a license, the user first needs to set the challenge value `c`, which allows to use the license under certain conditions specified by the SP. It can be done as follows.

:::note[Important]
The Blockchain will accept use of a license for a given challenge `c` only once. The format of this value is dictated by the SP. For instance, the SP can publicly state that they will only grant services if the challenge is `0`. In such case, the license will be accepted by the Blockchain only once. It could also be required to be a changing format, for example, the current date. This would ensure that a given license is accepted by the Blockchain once per day, and the SP will accept it as long as the given date corresponds to the current date.
:::

```rust
// Set challenge to, for instance, 1234
let challenge = JubJubScalar::from(1234u64);
```

The user can now create a transaction using a given license, providing the public key `psk_sp` of the SP. In this step, a session will be created in the contract's state, and a session cookie will be provided in the process.

:::note[Important]
The session cookie is needed by the SP to verify that you opened a valid session, hence it shouldn't be shared with no one else but the SP.
:::

```rust
let session_cookie = MoatCore::use_license(
    &moat_context,
    &psk_lp,
    &psk_sp,
    &ssk_user,
    &challenge,
    licenses.get(0).expect("A license was owned."),
    rng,
)
.await?
.expect("session cookie has been obtained");
```

## Verify a Session Cookie

The SP can verify if a given session cookie is correct. Upon success, it will mean that the requested service in such process shall be granted. It can be done as follows.

```rust
if MoatCore::verify_requested_service(
    &moat_context,
    &psk_lp,
    &psk_sp,
    &session_cookie,
)
.await?
{
    println!("Session Cookie was correct, service should be granted.");
} else {
    println!("Session Cookie was not correct, service must be denied.");
}
```

Additionally, the SP should verify the challenge used by the user, as follows.

```rust
if session_cookie.c == challenge {
    // grant service
}
```
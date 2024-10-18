---
title: Build from Source
description: This resource explains how to setup a Dusk node starting from source.
---


## What You'll Need

* **A Linux Operating System**: This guide is tailored for Linux users. If you're using another operating system, you might run into issues.
* **An Internet Connection**: Ensure you can download files and communicate to other nodes on the target device.
* **Firewall Access**: Dusk's networking protocol, Kadcast, uses [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) to communicate among nodes. If you want your node to connect to an external network, ensure that your firewall and router's UDP ports are forwarded correctly. The default configuration targets port 9000.
* **Software Prerequisites**: You'll need the following software installed to follow this guide: `curl`, `zip`, `libssl-dev`, `rustc`, `clang`, `gcc` and `git`.


:::tip[Nocturne Installer Script]
If your goal is to run a node on the Nocturne testnet, you can easily do so by using the installer script. For detailed instructions, refer to this [guide](operator/guides/node-running-guide).
:::


## Step-by-Step Instructions

If your goal is to run a node on the Nocturne testnet, you can easily do so by using the installer script provided in the [guide for running a node on Nocturne](/operator/nocturne/node-running-guide). If you choose so, there is no need of following the instructions below.

Anyways, if your goal is to build from source by completing all the steps, or if you're planning to set up a local cluster you can simply continue reading this guide.

### 1. Setting up the Environment

To make sure you have access to the latest versions of packages, update your system's package list:

```sh
sudo apt update
```

#### 1.1 Install the Rust Programming Language

The majority of Dusk software is written in Rust. To compile our code, we will first need to make sure it's installed. 

Open a terminal and run the following command to see if Rust is available:
```sh
rustc --version
```
If this returns a `command not found` error, we'll need to install and activate Rust.

Run the following command to download and install Rust:
```bash
# Download and install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh

# Activate rust
source $HOME/.cargo/env
```

#### 1.2 Install Clang

Clang is necessary to compile the internal database of the node, RocksDB.

* For Ubuntu/Debian:
```bash
sudo apt-get install clang
```

* For Arch:
```bash
sudo pacman -S clang
```

* For CentOS/RHEL:
```bash
sudo yum install clang
```

#### 1.3 Install git

Git is a version control system. We will use it to download the Node code.

* For Ubuntu/Debian:
```bash
sudo apt-get install git
```

* For Arch:
```bash
sudo pacman -S git
```

* For CentOS/RHEL:
```bash
sudo yum install git
```


#### Install Other Dependencies

You can then install the rest of the necessary tools (`curl`, `zip`, `libssl-dev`, `gcc`).

For Ubuntu/Debian:
```bash
sudo apt-get install -y curl zip libssl-dev gcc
```

For Arch:
```bash
sudo pacman -S curl zip openssl gcc
```

For CentOS/RHEL:
```bash
sudo yum install curl zip openssl-devel gcc
```



### 2. Compiling the Dusk node

#### 2.1 Download the Node Software

Clone the Rusk repository:
```bash
git clone https://github.com/dusk-network/rusk.git
cd rusk
```

Build the node:
```bash
# Generate the keys used by the circuits
make keys

# Compile all the genesis contracts
make wasm

# Build the node
cargo b --release -p rusk
```


Once your node is installed, you can [configure Rusk](/operator/node-setup/configure_rusk).
If you want to run a local cluster, you can follow the instructions below.

#### 2.2 Run a single-node cluster with example's data

Create a new directory and copy the example consensus keys to it. In a production environment, you would put your own consensus keys here.
```bash
mkdir -p ~/.dusk/rusk
cp examples/consensus.keys ~/.dusk/rusk/consensus.keys
```

Create the Genesis state according to your local [`examples/genesis.toml`](https://github.com/dusk-network/rusk/blob/master/examples/genesis.toml). See the [`examples.toml`](https://github.com/dusk-network/rusk/blob/master/rusk-recovery/config/example.toml) for configuration options you can set in terms of stakes and balances on network initialization.

##### Run ephemeral node

```bash
# Generate genesis state
cargo r --release -p rusk -- recovery-state --init examples/genesis.toml -o /tmp/example.state

# Launch a local ephemeral node
DUSK_CONSENSUS_KEYS_PASS=password cargo r --release -p rusk -- -s /tmp/example.state -c rusk/default.config.toml
```

##### Run persistent node

Delete any leftover in state/chain
```bash
# Delete old state
rm -rf ~/.dusk/rusk/state
# Delete old chain
rm -rf ~/.dusk/rusk/chain.db
```

```bash
# Generate genesis state
cargo r --release -p rusk -- recovery-state --init examples/genesis.toml

# Launch a local pnode
DUSK_CONSENSUS_KEYS_PASS=password cargo r --release -p rusk -- -c rusk/default.config.toml
```

Note that the `password` used here is connected to the example consensus keys, which are also defined in the [`examples/genesis.toml`](https://github.com/dusk-network/rusk/blob/master/examples/genesis.toml).

:::note[Join a cluster]
It is possible to connect to other clusters by defining a set of bootstrapping nodes to which to connect to on initialization, by defining them in the [`rusk/default.config.toml`](https://github.com/dusk-network/rusk/blob/master/rusk/default.config.toml#L13), or by passing the `--bootstrap` argument in the node launch command.
:::

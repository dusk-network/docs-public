---
title: Install Rusk
description: Learn how to install and configure a Dusk node.
---


<a href="https://github.com/dusk-network/rusk" target="_blank">Rusk</a> contains the software needed to run a Dusk node. Users can set specific compilation flags to configure their node for different roles, allowing it to perform tasks like participating in consensus, validating transactions, or storing historical data.

Rusk has been designed for efficiency and decentralization, and users can follow this guide to install their node and later choose which role they want their node to have:



- [Provisioner](/operator/02-provisioner) : to stake and participates in consensus.
- [Archiver](/operator/03-archiver) : to store and serve historical data.
- [Prover](/operator/04-prover) : to compute [Zero-Knowledge Proofs](/learn/deep-dive/cryptography/zkp).

# Requirements
## Operating System

It is recommended to use a stable operating system with long-term support, such as <a href="https://releases.ubuntu.com/jammy/" target="_blank">Ubuntu 24.04</a> or  <a href="https://www.debian.org/releases/bookworm/" target="_blank">Debian Bookworm</a>.  Since this guide is tailored for **Linux** users, those using other operating systems may encounter compatibility issues.

## Hardware
The node software has been tested on x86-64/AMD64 and ARM architectures.

Dusk supports several types of node configurations, and hardware requirements depend on the type of node you want to set up:
- [Provisioner specifications](/operator/02-provisioner#provisioner-specifications)
- [Archiver specification](/operator/03-archiver#archiver-specifications)
- [Prover specifications](/operator/04-prover#prover-specifications)

## Networking

Ensure that your device can download files and communicate with other nodes.

As Dusk uses the ultra-efficient P2P network protocol <a href="https://github.com/dusk-network/kadcast/blob/main/README.md" target="_blank">Kadcast</a>, the network requirements are minimal but should maintain symmetrical, stable, low-latency connections.

## Firewalls and Port Forwarding

Dusk's networking protocol, Kadcast, uses <a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank">UDP</a> to communicate among nodes. For external network connectivity, ensure that your firewall and router's UDP ports are forwarded correctly:

- **9000/udp**: Required for Kadcast consensus messages.
- **8080/tcp**: Optional HTTPS API for querying the node.

:::note[Note]
The ports are configurable either as option to the node binary or by setting them in the configuration files. The node installer automatically configures the necessary ports.
:::

## Server Security

Maintaining a secure and stable node is paramount for the proper functioning of Dusk. We advise using a firewall, restricting access to unused APIs, performing regular updates and using a static IP for an uninterrupted service.

# Install Rusk
To install Rusk, you can either:
- Use the Nocturne installer to [quickly launch your node on the Dusk testnet](/operator/guides/01-nocturne-node)
- Build from source
- Use docker (not recommended for production environment)

## Nocturne Installer

If you want to spin up a Provisioner node on the Nocturne testnet, you can use the <a href="https://github.com/dusk-network/node-installer" target="_blank">node installer</a> script. This installer will set up Rusk as a service, preconfigure parts of the node, and provide a couple of helper scripts.

You can install Rusk by pasting the following command in your terminal:
```sh
curl --proto '=https' --tlsv1.2 -sSfL https://github.com/dusk-network/node-installer/releases/latest/download/node-installer.sh | sudo sh
```

:::note[UFW and other configurations]
The script may enable <a href="https://help.ubuntu.com/community/UFW" target="_blank">ufw</a>  and apply other configurations to your system. If you want to avoid this, please follow the instructions on how to [build from source](/operator/01-installation#build-from-source).
:::

## Build from source

If your goal is to build from source or if you're planning to set up a local cluster, the section below outlines all the steps and requirements.

**Software Prerequisites**: You'll need the following software installed to follow this guide: `curl`, `zip`, `libssl-dev`, `rustc`, `clang`, `gcc` and `git`.

### Step-by-Step Instructions

#### 1. Setting up the Environment

To make sure you have access to the latest versions of packages, update your system's package list:

```sh
sudo apt update
```

##### 1.1 Install the Rust Programming Language

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

##### 1.2 Install Clang

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

##### 1.3 Install git

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


### Additional Dependencies

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



#### 2. Compiling the Dusk node

##### 2.1 Download Node Software

Clone the Rusk repository:
```bash
git clone https://github.com/dusk-network/rusk.git
cd rusk
```
To compile and run the Dusk node from source, launch the commands in sequence.

Generate the keys used by the circuits:
```bash
make keys
```
Compile all the genesis contracts:
```bash

make wasm
```
Build the node:
```bash
cargo b --release -p rusk
```


Once your node is installed, you can either run a [Provisioner](/operator/02-provisioner), an [Archiver](/operator/03-archiver) or a [Prover](/operator/04-prover).

If you want to run a local cluster instead, you can follow the instructions below.

##### 2.2 Run a single-node cluster with example's data

Create a new directory and copy the example consensus keys to it. In a production environment, you would put your own consensus keys here.
```bash
mkdir -p ~/.dusk/rusk
cp examples/consensus.keys ~/.dusk/rusk/consensus.keys
```

Create the Genesis state according to your local <a href="https://github.com/dusk-network/rusk/blob/master/examples/genesis.toml" target="_blank">`examples/genesis.toml`</a>. Refer to <a href="https://github.com/dusk-network/rusk/blob/master/rusk-recovery/config/example.toml" target="_blank">`examples.toml`</a> for configuration options you can set, such as stakes and balances on network initialization.

###### Run ephemeral node

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

# Launch a local node
DUSK_CONSENSUS_KEYS_PASS=password cargo r --release -p rusk -- -c rusk/default.config.toml
```

Note that the `password` used here is connected to the example consensus keys, which are also defined in the <a href="https://github.com/dusk-network/rusk/blob/master/examples/genesis.toml" target="_blank">`examples/genesis.toml`</a>.

:::note[Join a cluster]
It is possible to connect to other clusters by defining a set of bootstrapping nodes to which to connect to on initialization, by defining them in the <a href="https://github.com/dusk-network/rusk/blob/master/rusk/default.config.toml#L13" target="_blank">`rusk/default.config.toml`</a> , or by passing the `--bootstrap` argument in the node launch command.
:::

## Docker Installation

This guide will take you through the process using Docker, allowing you to run your own local Dusk node.

Docker packages applications within containers that include all dependencies, ensuring consistent runtime environments. This guarantees that the software will always run consistently, regardless of where it is installed.

:::note[Caution]
The following guide is designed to assist in setting up a local node for testing and development purposes only. It is not recommended for production use. Docker is utilized here to facilitate convenient local testing and provide developers with a dedicated node for API testing
:::


### Prerequisites

1. 🐳 **Docker**: If you don't have Docker installed, please follow the [official guide](https://docs.docker.com/desktop/)
2. 🛜 **Internet Connection**: Required to download the Docker image and necessary files.
3. 🛠️ **Git**: Optional, but recommended. Useful for retrieving the node code. Git can be downloaded <a href="https://git-scm.com/downloads" target="_blank">here</a>
4. 💻 **Terminal**: To execute the steps in the Step-By-Step below, you will need to use a terminal application.
5. 🎛️ **x86-AMD64**: To create the Docker Image, a processor with the x86-AMD64 architecture is required.

:::tip[Using DockerHub]
If you want to quickstart using a prebuilt docker image, run the following command:
```sh
docker run -p 9000:9000/udp -p 8080:8080/tcp dusknetwork/node
```
:::

### Step-by-Step Instructions

#### 1. Get the Dusk node files

The Dusk Node is called `Rusk`. There are two way to get the software, cloning the <a href="https://github.com/dusk-network/rusk.git" target="_blank">repository</a> using git, or [simply downloading from github](#without-git)

###### Using Git (Recommended)

Execute the following commands on the terminal:

```sh
git clone https://github.com/dusk-network/rusk.git
```

###### Without Git

1. Go to the <a href="https://github.com/dusk-network/rusk" target="_blank">Rusk Github repository</a>.
2. Click the green "**Code**" button and choose "**Download ZIP**".
3. Extract the ZIP file.

#### 2. Build Docker Image

With Docker installed and the repository files obtained, let's build the Docker image. Note that this can take 15 to 20 minutes.

The following command will download all the required dependencies and set up the environment for your Dusk node.

```sh
docker build -t rusk .
```

#### 3. Run the Dusk node with Docker

Once the image is built, you can run a Dusk node simply by running in your terminal:

```sh
docker run -p 9000:9000/udp -p 8080:8080/tcp rusk
```

Your node should now be running and giving you output on the blocks it is creating and validating.


# Tips

Here below you can find some recommendations on how to run your node. Especially when running a Provisioner, it is important to make sure that the node is managed in a secure way, as well as having risk-mitigation strategies.

It is recommended to use a dedicated server with only necessary services, as this minimizes the attack surface.


:::tip[Recommended Setup]
The recommended setup for network participants looking to stake and use the network is to run a Provisioner node on a VPS or server, and a Prover locally on their machine/laptop. This ensures the most efficient configuration where the full resources of your provisioner node is at disposal to the consensus, while maximizing privacy by proving privacy-preserving transactions locally.
:::

## Monitoring

Effective monitoring and alerting systems are crucial to avoid slashing events. There are several tools available for real-time monitoring and alerting, which are particularly important for provisioners participating in consensus. Implementing these systems helps ensure continuous performance and timely responses to potential issues.

## Keys Management
Proper management of your cryptographic keys is essential to ensure the security of your node.

For this reason, *provisioner keys* are strictly limited to signing consensus messages, such as block proposal, validation, and voting. Any other critical operations, such as un-staking or withdrawing funds now require a multi-signature process involving a *funds key*, specifically registered during the staking process.


## Sentry Nodes
Denial-of-service (DoS) attacks occur when an attacker floods a server with excessive traffic, preventing it from maintaining its internet connection. Attackers who scan the network may attempt to identify the IP addresses of provisioner nodes and disrupt their operations by overwhelming them with traffic.

A recommended approach to mitigate this risk is to use a sentry node architecture. In this setup, validator nodes connect only to trusted full nodes. Validators may use private data centers with direct connections to major cloud providers, which, in turn, connect to sentry nodes. These sentry nodes act as an intermediary, absorbing the burden of any potential DoS attacks, allowing provisioners to remain secure.

It’s recommended for Provisioners to implement load balancing and distribute incoming traffic across multiple sentry nodes, further reducing the risk of a single node being overwhelmed and enhancing the defense against DoS attacks.

## Firewalls
A well-configured firewall is another critical layer of defense. Firewalls use predefined rules to filter incoming and outgoing traffic, blocking any suspicious or unauthorized requests. For instance, a virtual private server (VPS) firewall should block all ports that are not essential to your services, only allowing legitimate traffic. You can configure your firewall to permit traffic only from trusted sentry nodes, preventing unauthorized access and reducing the risk of attacks. Make sure to check what is the [required firewalls configuration](#firewalls-and-port-forwarding).

### SSH keys
When setting up a provisioner on a cloud instance, it's recommended to use SSH keys instead of passwords for secure access. SSH keys are more secure, with key lengths up to 4096 bits, and offer greater protection against server-side compromises. Even if a server is breached, the SSH key remains safe, as it is never exposed during the authentication process. To further secure your SSH key, protect it with a strong passphrase, and make sure to back it up securely in case the device storing it is compromised.

## Troubleshooting Tips

* **Installation Issues**: Ensure your operating system is up-to-date, you have adequate permissions and all the necessary prerequisite software is installed.
* **Network Errors**: Check your internet connection and verify UDP ports are open if connecting to an external network.

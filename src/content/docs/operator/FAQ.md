---
title: FAQ
description: Frequently asked questions about running a node on Dusk.
---

#### What is the minimum amount of DUSK I must stake?

**1000** (1 thousand) Dusk.

#### Which operating system is recommended?

It is recommended to use a stable operating system with long-term support, such as Ubuntu 24.04. Ubuntu 24.04 LTS is officially supported, tested and therefore recommended.

#### Are my keys secure on a server/vps?

The wallet stores your keys in encrypted form. In addition, the keys that the node uses in-memory to participate in consensus can be separated from other keys.

Your Stake is defined by a consensus key and an owner. The owner is by default the same key, but can also be a contract or separate key. Your Public Balance is held by a key too, the same goes for the private, shielded Balance.

1. If your owner key is set to a different key, no one is able to unstake, stake or withdraw using your consensus key.
2. If the key you use to send funds around is set to a different key than the consensus key, no one will be able to send funds from your wallet using your consensus key.
   - This is naturally the case for shielded accounts as they use different keys by default.
   - For public accounts you need to create a separated account holding your public account balance.

In summary, consensus keys can be strictly limited to signing consensus messages such as block proposal, validation, and voting. All other critical operations, such as unstaking or sending funds, can be separated to other keys.

##### What if I lose access to my server or keys?

As long as you have your mnemonic phrase stored somewhere, you are able to recovery anything else.

#### Which node do I run to participate in consensus?

The full node that is used to take part in the consensus is a **provisioner node**.

#### Which ports does Dusk use?

- **9000/udp**: Required for Kadcast message dissemination.
- **8080/tcp**: Optional HTTPS API for querying the node.

#### What about maintenance & security?

Maintaining a secure and stable node is important for the proper functioning of your consensus participation. We recommend using a firewall, restricting access to unused APIs, performing regular updates, and using a static IP for uninterrupted service.

####  How to know if my node is running on the correct chain ID?

You can launch `ruskquery info` to check the chain ID of your node. If you have a chain ID of **1**, it indicates that yournode is running on mainnet.

#### How many blocks are there in one epoch?

One epoch consists of **2160** blocks.

#### What is the proper command to stake 3000 DUSK?

You can use:

```bash
rusk-wallet moonlight-stake --amt 3000
```

#### How can I run a Dusk node on Docker?
You can use the following command: 

```bash
docker run -p 9000:9000/udp -p 8080:8080/tcp dusknetwork/node
```

#### How do I configure Kadcast to use a port other than 9000/udp?

When configuring Kadcast for your node, you can update the bootstrapping nodes in different ways, depending on what you are using.

**With the Node Installer:**
If you are using the Node Installer, it is recommended to specify Kadcast configuration updates in `/opt/dusk/services/rusk.conf.user`. This file takes precedence over `rusk.conf.default` and ensures your changes are retained during updates. 

You can add or modify the following section:

```bash
[kadcast]
KADCAST_PUBLIC_ADDRESS=<MY_WAN_IPv4:<NEW_PORT>
KADCAST_LISTEN_ADDRESS=<MY_LOCAL_IPv4:<NEW_PORT>
```

It is important to note that:

- On a VPS, the `KADCAST_PUBLIC_ADDRESS` and `KADCAST_LISTEN_ADDRESS` are often the same, as the public IPv4 is directly exposed to the internet.
- If you are running your node from home, behind NAT, a private network, or VPN, these may differ. Ensure you configure your local IP and port accordingly, and verify that the port is forwarded correctly on your router.
- `/opt/dusk/services/rusk.conf.user` is the highest priority file. Changes to `rusk.toml` will be overridden by the default `rusk.conf.default` configuration.

**Without the Node Installer:**


If you are **not** using the Node Installer, you will need to explicitly define the ports and IPs in the `[kadcast]` section of the `rusk.toml` file. Here's an example:

```bash
[kadcast]
bootstrapping_nodes = [
    { address = "165.22.193.63", port = <new-port> },
    { address = "167.172.175.19", port = <new-port> }
]

[http]
listener_addr = "0.0.0.0:8080" # Default HTTP listener address
```

You can override the HTTP listener port by:

- Using the `--http-listener-addr` flag (e.g. `--http-listener-addr 0.0.0.0:8081`).
- Modifying the `listener_addr` in the rusk.toml file as shown above.
- Setting it as an environment variable (e.g. `HTTP_LISTENER_ADDR=0.0.0.0:8081`).


Configuration precedence is not applicable here, as settings are directly defined in `rusk.toml`.


#### What are the steps for SSH setup on Digital Ocean?

To set up SSH on DO, you can follow the steps below.

1) Generate an SSH key:
```bash
ssh-keygen -t rsa -b 4096
```

2) Add the public key to Digital Ocean during droplet creation:
```bash
ssh -o "IdentitiesOnly=yes" -i myssh root@<your-droplet-ip>
```

3) Secure your droplet by removing the default console:
```bash
sudo apt-get purge droplet-agent
```

#### What should I do if I lose my SSH-key file?
Unstake using the web wallet, destroy your droplet, and follow the setup procedure to recreate your node.

#### How can I transfer an SSH-key to another device?

Copy the `.ssh` folder and key files to the new device from `~/.ssh` (Linux).

#### How can I get data from testnet or mainnet nodes?

First, set up the base URLs:

Testnet: `testnet.nodes.dusk.network`
Mainnet: `nodes.dusk.network`

For example:

```javascript
const WS_URL = 'https://nodes.dusk.network/on';
const EVENT_SUBSCRIPTION_URL = 'https://nodes.dusk.network/on/blocks/accepted';
```
Then, initialize a Rusk session by sending a POST request to the session endpoint (`WS_URL`). The server will `return a Rusk-Session-Id`:

```json
{
    "sessionId": "abcd1234efgh5678ijkl"
}
```
Use this session ID as an HTTP header (Rusk-Session-Id: <ID>) when subscribing to events at `EVENT_SUBSCRIPTION_URL`.

Finally, keep a websocket connection open using the session ID. Events will be sent to your websocket in real time.


#### How can I relay my internal port 8080 when using RUES?
You can relay your internal port using `socat`:

```bash
socat tcp-listen:8081,reuseaddr,fork tcp:localhost:8080
```
This makes local port 8080 available on port 8081 and allow you to access it via external-ip:8081. To turn this into a service, you can create a `/etc/systemd/system/rusk-relay.service` file with the following content:

```bash
[Unit]
Description=Rusk relay
After=rusk.service
Requires=rusk.service

[Service]
Type=simple
ExecStart=socat tcp-listen:8081,reuseaddr,fork tcp:localhost:8080
Restart=always

[Install]
WantedBy=multi-user.target
```


---
title: FAQ
description: Frequently asked questions about running a node on Dusk.
---

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



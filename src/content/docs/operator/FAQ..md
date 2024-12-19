---
title: FAQ
description: Frequently asked questions about running a node on Dusk.
---

#### Which operating system is recommended?

It is recommended to use a stable operating system with long-term support, such as Ubuntu 24.04. Ubuntu 24.04 LTS is officially supported, tested and therefore recommended.

#### Are my keys secure on a server/vps?

The wallet stores your keys encrypted. Additionally the staking keys the node uses in-memory do not allow to send funds out of a wallet.

Provisioner keys are strictly limited to signing consensus messages, such as block proposal, validation, and voting. Any other critical operations, such as un-staking or withdrawing funds now require a multi-signature process involving a funds key, specifically registered during the staking process.

##### What if I lose access to my server or funds key?

As long as you have your mnemonic phrase stored somewhere, you are able to recovery anything else.

#### Which node do I run to participate in consensus?

The full node that is used to take part in the consensus is a **provisioner node**.

#### Which ports does Dusk use?

- **9000/udp**: Required for Kadcast message dissemination.
- **8080/tcp**: Optional HTTPS API for querying the node.

#### What about maintenance & security?

Maintaining a secure and stable node is important for the proper functioning of your consensus participation. We recommend using a firewall, restricting access to unused APIs, performing regular updates, and using a static IP for uninterrupted service.



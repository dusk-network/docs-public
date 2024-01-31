---
title: Citadel
---

# Citadel

## What is Citadel?

Citadel is a protocol which integrates a Self-Sovereign Identity (SSI) system into the Dusk blockchain.
SSI allows participants of digital interaction to fully control the identity information they are sharing
in order to facilitate the interaction. On the one hand, passing identity information is necessary
for the involved parties to exchange services and resources. On the other hand, revealing of
identity information should be minimal and controlled. To achieve that, trust needs to be obtained
using other ways than just by passing and revealing information. To these other ways belong
zero knowledge (ZK) proofs together with using a decentralized network.
ZK allows for proving certain facts within some context, while decentralized network helps
in maintaining this context in a trustful manner. The network also helps in maintaining
anonymity sets, in which certain facts are proven without revealing the identity of the user.
Thus, we can say, that Citadel manages identities which are publicly stored in a trusted manner using a decentralized network.

There are three different parties involved in our protocol:

### User
User is a party willing to get a license that will allow her or him to use a particular service. 
By license, we mean a generalized permit, or a ticket, or a permission.
Users request licenses on-chain from license providers, meaning, they communicate with
license providers by interacting indirectly via blockchain. Thanks to that, license providers do not know who
sent them a given request. Users obtain licenses via blockchain as well.
Upon receiving a license, users can convert it into a cookie, which they can
then use to establish a private off-chain connection with a service provider.
We treat such conversion as an act of using up a license, or in other words, of consuming it.

### License Provider (LP)
License provider is a party receiving on-chain requests from users. 
They can accept the requests and issue licenses also on-chain, which will be passed to users who requested them.
License providers do not get any information about the requesting users, thanks to stealth addresses
in the blockchain.

### Service Provider (SP)
Service Provider is a party receiving off-chain requests to grant services to users. 
When user receives a license, she or he converts the license into a cookie, effectively
starting a session with Service Provider. The user can then send the cookie off-chain
to the Service Provider. Service Provider, upon receiving the cookie off-chain, can verify some information
on-chain and, upon successful verification, can grant or perform a service (off-chain).

## How does Citadel work?

Citadel is composed of two main protocols: the *license request protocol*, and the *service request protocol*. Here is an overview of these protocols:

- **License Request Protocol:** this is the process where user requests a license from the LP, by performing the following steps:
    - (user) *request_license*: user sends a transaction on-chain, including a precomputed return stealth address at which the license will be received.
    - (LP) *fetch_license_request*: LP continuously scans the blockchain for the incoming requests (which are addressed to this LP).
    - (LP) *issue_license*: upon verification of the request, LP issues a license via an on-chain transaction, using the return stealth address from the request.
    - (user) *fetch_license*: user scans the blockchain for incoming licenses (which are addressed to this user).

- **Service Request Protocol:** this is the process where user requests a service from the SP, by performing the following steps:
    - (user) *use_license*: user sends a transaction on-chain, including a zero-knowledge proof which proves that the user owns a valid license. In this process, a session for a specific service is opened, and a session cookie is computed. The cookie is an object which is needed to verify that a license was correctly consumed. The cookie should only be shared with the desired SP, it should not be given away as it could potentially be used by a third party to obtain the same service.
    - (user) *request_service*: user requests the service by sending the session cookie to the SP off-chain, using a secure channel (e.g., an HTTPS connection).
    - (SP) *fetch_session*: upon receiving a session cookie, SP fetches a relevant session from the blockchain (based on a session id from the cookie).
    - (SP) *grant service*: SP verifies locally the session cookie using the fetched session from the blockchain, and, if verified successfully, grants access to the service or performs the service for the user.

The above steps are depicted in detail in the following figure.


![Citadel protocol](../../../assets/protocol_citadel.svg)

The following implementation diagram illustrates how messages are passing between protocol' actors.

![Citadel implementation](../../../assets/implementation_citadel.png)

You can find a more detailed description in the [specs](https://github.com/dusk-network/citadel-docs/blob/main/specs/main.pdf).
An academic paper with further details about the protocol can be found [here](https://arxiv.org/pdf/2301.09378.pdf).

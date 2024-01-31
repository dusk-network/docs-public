---
title: Self-Sovereign Identity
---

#Digital Identity

In a digitized world of today, in which users and institutions are massively interacting with each other 
exchanging even most personal or sensitive information, it is extremely important that interaction
participants have full control over the information they expose and share.
For this reason, Self-Sovereign Identity (SSI) systems have been created and have become a desirable part
of many digital-interaction services. SSI refers to a concept where an individual or an institution 
is able to manage their own identity and other parties' identities in a fully transparent and private manner. 
This means that at any moment, such a party knows which information about them is being shared
while interacting digitally.

Dusk Blockchain has an integrated SSI-mechanism named Citadel, which is a zero-knowledge proof-based solution, 
making it possible for users and institutions to have full control over their personal or sensitive information
while still being able to interact digitally in an efficient manner.

In addition, Dusk also brings Moat (Citadel SDK), a command line interface tool, as well as an application programming interface (API),
which allows users of Dusk to use the built-in Citadel mechanism. By users, we mean either individuals
trying to obtain services in a private manner, or institutions being providers of such services.
Citadel and Moat (also referred to as Citadel Software Development Kit), constitute a complementary pair
of technical solutions making it possible to realize SSI-relevant scenarios with Dusk.
Users can use Moat either as a command line interface tool (simply by issuing commands in their computer's command line
interface window), or include Citadel function calls in their programs, by integrating Moat as a library in
their programmatic tools or systems.

## ZKP and Unlinkability

By unlinkability we mean a feature of the system which makes sure that an attacker cannot tell if any two events
happening in the system are related, in other words, the parties participating in some events cannot
be traced together under any circumstances.
Citadel employs Zero Knowledge (ZK) approach, yet using ZK alone is not enough to make the problem of leaking private
or sensitive information go away. In addition to being able to prove ownership of some rights or group inclusion,
without revealing any information, it is also important to arrange the communication so that the system which verifies
a given proof does not know what is the origin of the proof. In other words, the system works under the
requirement of full unlinkability. For that, it is important to combine benefits of
ZK technology with the benefits of private blockchain. Only if the prover is not capable of finding out who sent
the proof, we do get true unlinkability. And only with large anonymity sets can we be certain that the trust
mechanism works correctly without the possibility of tracing the parties involved. This approach has been taken
by Citadel, and that is the foundation on which its true unlinkability is based. 

## How it works

In Citadel, when user requests a license, she does not reveal any information about her except for her stealth
return address. The license issuer does not know to whom the license is issued, as all it knows is the stealth address.
This is possible thanks to communicating via private blockchain, as otherwise the communication channel could
have been traced. When the user then uses up the license, she generates a ZK proof of ownership, which is again private.
The proof verifier only knows that the proof is valid, but no information is revealed. Again, the proof
verifier cannot trace who has sent the proof to verify, as the on-chain communication channel is entirely obfuscated.
When finally, a session cookie is created to obtain an actual service, the service provider only
knows the part of user information which is absolutely necessary, and which has been agreed upon by the user as the data
that needs to be revealed.
Let's say that to use a service, service provider needs a proof of user's age. Such a proof will be given
to him, without reveling an actual age or any other information about the user. The same can happen with nationality,
area of residence or any other example. Some information needs to be revealed, but only the minimal part
and only the part that the user has agreed to.

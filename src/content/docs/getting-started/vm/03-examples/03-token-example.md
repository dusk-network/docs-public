---
title: Token Example
---

Tokens can be represented in any way, as it is not necessary to use notes or phoenix for it. Anyways, a contract still needs to deal with notes because the gas to execute the contract needs to be paid. The contract would have some state that holds balances against addresses, meaning that it can use some map(address -> value) as a state. Because there is no msg.sender to rely on, what an address is should be defined by the developer.

Dusk also supports obfuscated tokens

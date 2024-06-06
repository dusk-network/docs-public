---
title: Transactions on Dusk
---



# Transactions


In Dusk, transactions operate differently compared to other blockchains. Specifically, transactions do not have an equivalent to ```msg.sender()```, which is used in other blockchains to identify the origin of a transaction. As a result, developers need to rely on alternative methods to represent and manage user identities within their smart contracts.

Even if in theory users could be seen as a collection of unspent notes associated with a key, these notes are not linkable to each other to maintain privacy and security.
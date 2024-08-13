---
title: Examples
---

Developers can gather insights from the <a href="https://github.com/dusk-network/rusk/tree/master/contracts" target="_blank">contract examples</a> in Rusk, and look at their corresponding tests. There is also a collection of <a href="https://github.com/dusk-network/piecrust/tree/main/contracts" target="_blank">contract examples</a> for piecrust, the underlying VM for Dusk.

When going through the examples, developers will notice some patterns:
- There is a distinct set of semantics defined for [smart contracts on Dusk](/getting-started/vm/04-sc-on-dusk/09-semantics)
- The use of [sessions](/getting-started/vm/04-sc-on-dusk/07-sessions)
- The constants `OWNER` and `LIMIT` are used to standardize the owner (deployer) and execution limit

## Where to start

The first example to look at is the [counter example](/getting-started/vm/02-guides/01-my-first-contract) 

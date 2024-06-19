---
title: Examples
---

Developers can gather insights from the <a href="https://github.com/dusk-network/piecrust/tree/main/contracts" target="_blank" >contracts examples</a>, and look at their <a href="https://github.com/dusk-network/piecrust/tree/main/piecrust/tests" target="_blank" >tests</a>.

# Considerations
Each test function uses a temporary VM instance (```VM::ephemeral()```) and creates sessions (```vm.session(SessionData::builder())?```).
Constants ```OWNER``` and ```LIMIT``` are used to standardize the owner and execution limit.

#![no_std]: Indicates the absence of the standard library to optimize for environments with constrained resources.
piecrust_uplink: Used for interacting with the host environment and other contracts.

Exposing Methods: Contract methods are exposed to the host environment using #[no_mangle] and uplink::wrap_call, facilitating safe interaction with the host.
# Examples walkthrough


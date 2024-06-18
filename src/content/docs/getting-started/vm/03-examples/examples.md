---
title: Examples
---

Developers can gather insights from the <a href="https://github.com/dusk-network/piecrust/tree/main/contracts" target="_blank" >contracts examples</a>, and look at their <a href="https://github.com/dusk-network/piecrust/tree/main/piecrust/tests" target="_blank" >tests</a>.

# Considerations
Each test function uses a temporary VM instance (```VM::ephemeral()```) and creates sessions (```vm.session(SessionData::builder())?```).
Constants ```OWNER``` and ```LIMIT``` are used to standardize the owner and execution limit.

# Examples walkthrough


---
title: Troubleshooting
---

## Rusk error occurred: 500 Internal Server Error: Failed proving the circuit - PolynomialDegreeTooLarge

When trying to call a method on a contract describes an error in the Plonk proving system, that most likely means it was attempted to prove something wrong. For example, proving ownership of something that is not actually owned, violating Dusk conservation, etc

When trying to avoid incorporating the source code of rusk-abi in the workspace by using it as a regular crate, the compiler complains that ContractId in rusk-abi lib is ambiguous and to either define it as host::ContractId or abi::ContractId

There' no way around this for a developer that wants to use the most recent versions

The suggestion is using the rusk codebase as a submodule and building against it.

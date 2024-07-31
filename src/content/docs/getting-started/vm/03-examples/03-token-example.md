---
title: Token Example
---

When creating a custom token on Dusk, developers can fully define their token's characteristics, including its representation and underlying cryptographic primitives. To ensure that the token is fully interoperable with other applications, developers can adhere to a [Token Standard](/getting-started/vm/01-sc-on-dusk/05-token_standards).

Dusk allows tokens to be represented in various forms, as it is not mandatory to use the Dusk's native features like Phoenix notes for representing tokens. Instead, a smart contract can maintain its own state that maps addresses to balance values (e.g., using a `map(address -> value)` structure). 

:::note
The contract still needs to deal with notes because the gas to execute the contract needs to be paid.
:::

Dusk supports varying degrees of precision for custom tokens, regardless of the fact that `dusk` uses the `u64` data type. Developers creating custom tokens can opt for higher precision using libraries that support larger numeric types, such as `u256`. 

For the Token Contract, something as close as possible to the Ethereum's ERC20 standard would be ok. It needs to be considered that Dusk also supports obfuscated tokens.

## Example

**TBD**

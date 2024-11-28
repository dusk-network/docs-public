---
title: Token Example
---

When creating a custom token on Dusk, developers can fully define their token's characteristics, including its representation and underlying cryptographic primitives. To ensure that the token is fully interoperable with other applications, developers can adhere to a [Token Standard](/learn/token-standards).

Dusk allows tokens to be represented in various forms, as it is not mandatory to use the Dusk's native features like Phoenix notes for representing tokens. Instead, a smart contract can maintain its own state that maps addresses to balance values (e.g., using a `map(address -> value)` structure). 

Dusk supports varying degrees of precision for custom tokens, regardless of the fact that `dusk` uses the `u64` data type. Developers creating custom tokens can opt for higher precision using libraries that support larger numeric types, such as `u256`. 

## Example

**TBD**

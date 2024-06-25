---
title: Examples
---

Developers can gather insights from the <a href="https://github.com/dusk-network/piecrust/tree/main/contracts" target="_blank" >contracts examples</a>, and look at their <a href="https://github.com/dusk-network/piecrust/tree/main/piecrust/tests" target="_blank" >tests</a>.

When going through the examples, developers will notice some patterns

## Sessions
Each test function uses a temporary VM instance (```VM::ephemeral()```) and creates sessions (```vm.session(SessionData::builder())?```).
Constants ```OWNER``` and ```LIMIT``` are used to standardize the owner and execution limit.

## no_std
The absence of the standard library to due to the fact that won't be available on Piecrust runtime, and removing it allows to optimize resources For this reason you will see #![no_std] at the beginning of contracts.

piecrust_uplink: Used for interacting with the host environment and other contracts.

## no_mangle
Contract methods are exposed to the host environment using #[no_mangle] and uplink::wrap_call, facilitating safe interaction with the host.

In Rust, function names can be mangled during the compilation process. Name mangling is a technique used by compilers to encode additional information about a function (like its namespace and signature) into its name. While this is useful in many programming scenarios to avoid name conflicts and support features like function overloading, it can pose a problem in the context of WASM smart contracts.

When a smart contract is compiled to WASM and run on a blockchain's virtual machine, the host environment (which often includes the blockchain runtime and various off-chain tools) needs to be able to reliably call the functions defined in the contract. If function names are mangled, the host might not be able to correctly identify and invoke these functions because the original function names specified in the contract code would have been altered during compilation.

By using the #[no_mangle] attribute, developers ensure that the compiler does not alter the function names. This preserves the function names exactly as they are defined in the Rust source code, making it straightforward for the host environment to access and execute these functions correctly based on their known names.




When writing smart contracts in Rust that compile to WebAssembly (WASM) for use in blockchain virtual machines, the process involves several considerations to ensure that the contracts interact safely and efficiently with the host environment. The explanation you're asking about involves two key concepts: the #[no_mangle] attribute and uplink::wrap_call. Let's break down why these are used and how they facilitate safe interactions with the host environment:

#[no_mangle] Attribute
In Rust, function names can be mangled during the compilation process. Name mangling is a technique used by compilers to encode additional information about a function (like its namespace and signature) into its name. While this is useful in many programming scenarios to avoid name conflicts and support features like function overloading, it can pose a problem in the context of WASM smart contracts.

When a smart contract is compiled to WASM and run on a blockchain's virtual machine, the host environment (which often includes the blockchain runtime and various off-chain tools) needs to be able to reliably call the functions defined in the contract. If function names are mangled, the host might not be able to correctly identify and invoke these functions because the original function names specified in the contract code would have been altered during compilation.

By using the #[no_mangle] attribute, developers ensure that the compiler does not alter the function names. This preserves the function names exactly as they are defined in the Rust source code, making it straightforward for the host environment to access and execute these functions correctly based on their known names.

uplink::wrap_call
The uplink::wrap_call is likely part of a library or framework used in the development of the smart contracts. This function or macro serves to wrap contract methods in a way that ensures they can be safely and effectively called by the host environment. Wrapping a function call generally involves several aspects:

Error Handling: Ensuring that any errors that occur during the execution of the function are caught and handled appropriately, preventing crashes and uncontrolled states within the VM.
Parameter Marshalling: Converting inputs and outputs between the formats expected by the smart contract and those used by the host environment. This can include data type conversions and memory management tasks.
Security Checks: Performing necessary security checks before and after the function execution to ensure that the interactions do not compromise the integrity or security of the host or the smart contract.



# Examples walkthrough


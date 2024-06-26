---
title: Semantics
---

When looking at the examples contracts, developers will notice some recurring elements. In this page, we provide an explication on why these elements are needed

## no_std
The absence of the standard library to due to the fact that won't be available on Piecrust runtime, and removing it allows to optimize resources For this reason you will see #![no_std] at the beginning of contracts.

## no_mangle

Name mangling is a technique used by compilers to encode additional information about a function (like its namespace and signature) into its name. While this is useful in many programming scenarios to avoid name conflicts and support features like function overloading, it can pose a problem in the context of compiling smart contracts to WASM.

When a smart contract is compiled to WASM and run on a Piecrust, the host environment needs to be able to reliably call the functions defined in the contract. If function names are mangled, the host might not be able to correctly identify and invoke these functions because the original function names specified in the contract code would have been altered during compilation.

By using the #[no_mangle] attribute, developers ensure that the compiler does not alter the function names. This preserves the function names exactly as they are defined in the Rust source code, making it straightforward for the host environment to access and execute these functions correctly based on their known names.

Therefore contract methods are exposed to the host environment using #[no_mangle] and ```uplink::wrap_call```, facilitating safe interaction with the host.


## uplink::wrap_call
The ```uplink::wrap_call```  macro serves to wrap contract methods in a way that ensures they can be safely and effectively called by the host environment. This ensures that any errors that occur during the execution of the function are caught and handled appropriately, avoiding uncontrolled errors that can affect the VM state. Wrapping the call also helps converting inputs and outputs between the formats expected by the smart contract and those used by the host environment (e.g. data type conversions), as well as performing security checks. For these reasons, ```piecrust_uplink``` is used for interacting with the host environment and other contracts.

## Sessions
Each test function uses a temporary VM instance (```VM::ephemeral()```) and creates sessions (```vm.session(SessionData::builder())?```).
---
title: Functions
---


# Host functions

# Functions Signature
Calling a contract function proceeds as follows:

Function to be called must have signature fn foo(u32) -> u32
Host writes data do argument buffer
Host calls foo(arg_len)
Contract deserializes what's in the argument buffer
Contract does its thing
Contract serializes result into the argument buffer
Contract returns how long what it wrote is
Host reads buffer

Any argument to be used by the contract is in the argument buffer, rather than the signature of the called function.
This implies that if a developer exports a function of the fn foo(u32) -> u64 shape, the contract is invalid 

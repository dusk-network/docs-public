---
title: Built-in Functions
---

Rusk provides built-in functions that can be called from within a smart contract which we call **Host functions** or **Host calls**.

## Host functions

Host functions are functions provided by rusk (the "host") and can be called from within a smart contract running on the Piecrust VM. Due to the sandboxed nature of VMs, smart contracts need to rely on host functions to access and manipulate lower-level operations that are managed by the Dusk nodes (e.g. time checks, cryptographic functions...).

Simply put, host functions are necessary because they allow smart contracts to interact with the system-level functions of the machine on which they run.

:::tip
Host functions are exempt from the normal costs associated (Gas costs) with computing VM instructions.
:::

## Available Host functions

> ToDo
>
> List of available host functions
>
> We can also point towards the rust docs module overview or cheat sheet here



## Functions Signature and Calling Sequence

The interaction between the smart contract and the host involves a series of steps designed to safely pass data back and forth while respecting the sandboxed environment in which the smart contract operates. 

Here's a breakdown of the process and why each step is crucial:

**1) Function Signature:** The function to be called from the host has a specific signature `(fn foo(u32) -> u32)`. This uniformity is necessary because it simplifies the interface through which the host VM interacts with the contract, ensuring that calls are predictable and structured.

**2) Writing to the Argument Buffer:** Instead of passing complex and potentially variable data types directly, the host writes his data into a designated argument buffer. This method standardizes how data is provided to the contract, regardless of the specific operation being performed.

**3) Calling the Function:** The smart contract’s function is invoked with an argument that typically represents the length or size of the data in the buffer. This helps the contract know how much data it needs to process.

**4) Deserialization of Data:** The contract reads and deserializes the data from the argument buffer. Deserialization is converting data from a byte array (buffer) into usable data types within the contract.

**5) Contract Processing:** The contract performs its intended operations using the deserialized data.

**6) Serializing Results into the Argument Buffer:** After processing, the contract serializes any results back into the argument buffer. Serialization is the process of converting the contract's internal data types back into a standardized byte format that can be read by the host.

**7) Return Data Length:** The contract returns the length of the serialized data, informing the host how much data to read from the buffer.

**8) Host Reads Buffer:** Finally, the host reads the output data from the buffer based on the provided length.

:::note
The use of an argument buffer and the serialization/deserialization prevents unsafe interactions between the host and the contract's internal state, ensuring that data passed between the host and the contract is done so in a controlled manner.
:::

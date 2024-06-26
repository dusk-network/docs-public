---
title: Rusk
---

<a href="https://github.com/dusk-network/rusk" target="_blank" >Rusk</a>  is the official Dusk protocol node client and smart contract platform. It plays a key role in Dusk by enabling the execution of smart contracts and handling the consensus. 

The ```rusk-abi``` crate encapsulates the following two features: 
- ```abi```: for smart contracts developers who are creating smart contracts that can interact seamlessly with Dusk by adhering to the ABI.
- ```host```: for developers who are building binaries to run ABI-compliant contracts. This involves the creation and management of host functions that execute smart contracts within the execution environment.

The ```abi``` and ```host``` features in the rusk-abi crate are mutually exclusive. This means that while they implement the same functions, they do so in fundamentally different ways tailored to their respective roles. While ```abi``` defines how contracts should interact within the network, ```host```ensures that contracts run as intended and manage resources effectively in the execution environment.
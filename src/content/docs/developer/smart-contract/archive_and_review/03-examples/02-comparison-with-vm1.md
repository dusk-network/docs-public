---
title: Piecrust vs Rusk VM 1.0
---

After a taste of how [a counter example smart contract looks in Piecrust](/getting-started/vm/guides/01-my-first-contract), it is worth to have a look at a functionally equivalent example written for Rusk-VM Version 1.0. An example looks as follows:

```rust
#![cfg_attr(target_arch = "wasm32", no_std)]
use canonical_derive::Canon;

pub const READ_VALUE: u8 = 0;
pub const INCREMENT: u8 = 0;

#[derive(Clone, Canon, Debug)]
pub struct Counter {
    value: i32,
}

impl Counter {
    pub fn new(value: i32) -> Self {
        Counter {
            value,
        }
    }
}

#[cfg(target_arch = "wasm32")]
mod hosted {
    use super::*;

    use canonical::{Canon, CanonError, Sink, Source};
    use dusk_abi::{ContractState, ReturnValue};

    const PAGE_SIZE: usize = 1024 * 4;

    impl Counter {
        pub fn read_value(&self) -> i32 {
            self.value
        }

        pub fn increment(&mut self) {
            self.value += 1;
        }
    }

    fn query(bytes: &mut [u8; PAGE_SIZE]) -> Result<(), CanonError> {
        let mut source = Source::new(&bytes[..]);

        let slf = Counter::decode(&mut source)?;

        let qid = u8::decode(&mut source)?;
        match qid {
            READ_VALUE => {
                let ret = slf.read_value();
                let mut sink = Sink::new(&mut bytes[..]);
                ReturnValue::from_canon(&ret).encode(&mut sink);
                Ok(())
            }
            _ => panic!(""),
        }
    }

    #[no_mangle]
    fn q(bytes: &mut [u8; PAGE_SIZE]) {
        let _ = query(bytes);
    }

    fn transaction(bytes: &mut [u8; PAGE_SIZE]) -> Result<(), CanonError> {
        let mut source = Source::new(bytes);

        let mut slf = Counter::decode(&mut source)?;
        let tid = u8::decode(&mut source)?;
        match tid {
            INCREMENT => {
                slf.increment();
                let mut sink = Sink::new(&mut bytes[..]);
                ContractState::from_canon(&slf).encode(&mut sink);
                ReturnValue::from_canon(&()).encode(&mut sink);
                Ok(())
            }
            _ => panic!(""),
        }
    }

    #[no_mangle]
    fn t(bytes: &mut [u8; PAGE_SIZE]) {
        transaction(bytes).unwrap()
    }
}
```
As you can see, the sample is much harder to follow and contains much more boilerplate code, including code for arguments passing, deserialization, serialization of return values, special derivations for data structures and more. You may wonder how was persistence implemented in Version 1.0, as there are no special calls related to persistence in this version either. In Version 1.0, contract state is passed in its entirety into each state changing method as an extra first parameter, in a similar manner to how object-oriented languages pass instance references to method calls. After state alteration, a state changing method returns the new state as a return value. State persistence is thus taken care of by the host. You can appreciate that that was a more heavy-weight and less performant solution.

## Eventing

In addition to querying and changing the contract state, Rusk VM smart contract can also send events. Events are (by intention light-weight) objects which hold a topic string as well as an attached piece of data. Events are stored by the host and can be queried by the caller of a method which generated events. If contract has a need to inform a user about some operations or facts encountered during execution, and this information may or may not be consumed by the user - events are an ideal tool for that. Events have the advantage that they are not passed as return values of contracts, and because of that many events can be sent during a single query or transaction execution. Let's have a look at a small contract which generates events:

```rust
#![no_std]

use piecrust_uplink as uplink;

pub struct Eventer;

static mut STATE: Eventer = Eventer;

impl Eventer {
    pub fn emit_num(&mut self, num: u32) {
        for i in 0..num {
            uplink::emit("number", i);
        }
    }
}

#[no_mangle]
unsafe fn emit_events(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |num| STATE.emit_num(num))
}
```
Method `emit_num` of the above contract generates a number of events, according to the value of its argument. Events do not need to be passed as return value, but rather are stored by the host and can optionally be queried later by the caller. This is a very convenient mechanism for passing lightweight and optional information to the user, and for triggering some actions on the user side.

## Feeder

Passing return value from a contract query method via its return value is fine for relatively small values or data structures, yet it is impractical for larger collections. The caller may want to process one collection element at a time, and for such scenario a feeder mechanism can be used and it is usually a better alternative. Feeder passes data via a dedicated data channel called `mpsc` from Rust's standard library (mpsc stands for multiple producer single consumer). As contract writer, you do not need to worry about setting up a mpsc channel, as you can use a provided host method instead. The following example shows a simple contract which utilizes a feeder:

```rust
#![no_std]

use piecrust_uplink as uplink;

pub struct Feeder;
static mut STATE: Feeder = Feeder;

impl Feeder {
    pub fn feed_num(&self, num: u32) {
        for i in 0..num {
            uplink::feed(i);
        }
    }
}

#[no_mangle]
unsafe fn feed_num(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |num| STATE.feed_num(num))
}
```

Method `feed_num` in the above example uses the host call named `feed` in order to pass subsequent values of a collection (in this case simple integers) to a `mpsc` communication channel. Caller of this method has a mechanism which allows it to pass an `mpsc` channel and can consume values as they arrive from the contract.

## Host Functions

Contracts are "almost" regular Rust programs convertible to Web Assembly, which means that they follow the usual non-VM requirements like not using the standard library and not using input/output functions. Contracts also run in a so called "hosted" environment, which means that they have some host services available to them. Among those services there is a set of host functions they are allowed to call. Host functions are always available to contracts. So far we have encountered a few of them, like the following:
- wrap_call()
- emit()
- feed()

There are more host functions available and some of them will be described in this section. For the beginning, we'd like to mention the following host functions:
- owner()
- self_id()
- host_query()

First two of those methods belong to a group of so-called "metadata" methods, named so because they provide some information about the contract itself. Method `owner()` provides contract id of the contract's owner, while method `self_id()` provides id of the contract itself. Sample contract utilizing these two host calls might look as follows:

```rust
#![no_std]

use piecrust_uplink as uplink;
use uplink::ContractId;

pub struct Metadata;
static mut STATE: Metadata = Metadata;

impl Metadata {
    pub fn read_owner(&self) -> [u8; 33] {
        uplink::owner()
    }
    pub fn read_id(&self) -> ContractId {
        uplink::self_id()
    }
}

#[no_mangle]
unsafe fn read_owner(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_owner())
}
#[no_mangle]
unsafe fn read_id(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_id())
}
```
As we can see, the host environment provides also some types, like in this example, `ContractId`. The last of the host methods we'd like to mention in this section is `host_query()`. Method `host_query()` is a universal function which allows contracts to call any function that was registered with the host before the contract was called. Let's say that we would like to perform hashing on the host side rather than by contract's code. We can write a hash function and register it with the host, so that subsequently we are able to call it from within a contract. Let's say our hashing function is as follows:

```rust
fn hash(buf: &mut [u8], len: u32) -> u32 {
    let a = unsafe { rkyv::archived_root::<Vec<u8>>(&buf[..len as usize]) };
    let v: Vec<u8> = a.deserialize(&mut rkyv::Infallible).unwrap();
    let hash = blake3::hash(&v);
    buf[..32].copy_from_slice(&hash.as_bytes()[..]);
    32
}
```

Our `hash` function deserializes an argument in a form of a vector of data, hashes it and places the hash in the same area where input parameter were passed. Return value is the length of a passed return data. Here we can see how much harder it is to write code when helpful host methods like `wrap_call` are not available.

Function to be registered as host function needs to be of type `HostQuery`, which is defined as follows:
```rust
pub trait HostQuery: Send + Sync + Fn(&mut [u8], u32) -> u32 {}
```

Registration of a host function looks as follows:
```rust
vm.register_host_query("hash", hash);
```

After our hash function is registered, we are able to call it from within a contract as follows:
```rust
#![no_std]

use alloc::vec::Vec;

use piecrust_uplink as uplink;

pub struct Hoster;
static mut STATE: Hoster = Hoster;

impl Hoster {
    pub fn host_hash(&self, bytes: Vec<u8>) -> [u8; 32] {
        uplink::host_query("hash", bytes)
    }
}

#[no_mangle]
unsafe fn host_hash(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |num| STATE.host_hash(num))
}
```

## ZK Proof Verification

One of the host functions available for contracts is a function to verify Zero Knowledge (ZK) proofs. A method within a contract performing a proof verification could look as follows:

```rust
    fn assert_proof(
        verifier_data: &[u8],
        proof: &[u8],
        public_inputs: &[PublicInput],
    ) -> Result<(), Error> {
        rusk_abi::verify_proof(verifier_data, proof, public_inputs)
            .then_some(())
            .ok_or(Error::ProofVerification)
    }
```

In this way, contract is able to verify ZK proof without having to perform the verification itself, but rather by delegating
the work to the host.

## Calling Other Contracts

Contracts are allowed to call other contracts, as in the following example:

```rust
#![no_std]

use piecrust_uplink as uplink;
use uplink::ContractId;

pub struct Callcenter;
static mut STATE: Callcenter = Callcenter;

impl Callcenter {
    pub fn increment_counter(&mut self, counter_id: ContractId) {
        uplink::call(counter_id, "increment", &()).unwrap()
    }
}

#[no_mangle]
unsafe fn increment_counter(arg_len: u32) -> u32 {
    wrap_call(arg_len, |counter_id| STATE.increment_counter(counter_id))
}
```
Host method `call` makes it possible for the contract to call a method of a given another contract (identified by its id). The function accepts contract id, name of the function to be called, and function argument, which in the above example is a unit type (argument is empty). There is also another variant of the host `call()` function named `call_with_limit()`, which in addition to contract id, method name and method argument, accepts a maximum value of gas to be spent by the given call.

## Inserting Debugging Statements

Contracts, being Web Assembly modules, running in a Virtual Machine sandbox, are not allowed to perform any input/output operations. Sometimes it is needed, especially for debugging purposes, for the contract to print a message on the console. For this purpose, a host macro named `debug!` has been provided. In the following example, contract's method issues a debugging statement:

```rust
pub fn debug(&self, string: alloc::string::String) {
    uplink::debug!("Message from a smart contract: {}", string);
}
```

## Panicking
Sometimes it is necessary for a contract to panic, especially if some critical check of arguments or state fails and there is no point for the contract to continue its execution and waste valuable resources. Host macro named `panic!` is provided for this very purpose. In the following example, contract's method panics:

```rust
pub fn check_funds(&self) {
    if self.funds <= 0 {
        uplink::panic!("Out of funds");
    }
}
```

## Constructor and Init

It is possible to export a special contract method named `init()` which can perform contact's initialization of any kind. Such method will be called automatically when the contract is deployed. The main intention behind method `init()` is to allow contracts to initialize their state at a time before the contract is operational and ready to receive calls. Method `init()` accepts a single argument of any serializable type. That argument will be passed to the init method by code which performs the deployment of the contract. In the following example, we can see a contract with an `init()` method:

```rust
#![no_std]
use piecrust_uplink as uplink;

pub struct State {
    value: u64,
}

impl State {
    pub fn init(&mut self, value: u64) {
        self.value = value;
    }
}

static mut STATE: State = State{ value: 0u64 };

impl State {
    pub fn read_value(&self) -> u64 {
        self.value
    }
}

#[no_mangle]
unsafe fn read_value(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_value())
}

#[no_mangle]
unsafe fn init(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |arg: u8| STATE.init(arg))
}
```

Method `init()` looks like any contract method, and it could do anything other methods can do, it is not limited to only initializing contract's state. What is special about this method is the fact that the host will detect if it is exported, and it will call it when when the contract is deployed. Let's have a look at how the deployment of the such contract could be implemented:

```rust
fn deploy_contract_with_constrtor() -> Result<(), Error> {
    let vm = VM::ephemeral()?;
    const OWNER: [u8; 32] = [7u8; 32];

    let mut session = vm.session(SessionData::builder())?;

    let id = session.deploy(
        contract_bytecode!("constructor_example_contract"),
        ContractData::builder(OWNER).constructor_arg(&0xcafeu64),
        LIMIT,
    )?;
}
```
As we can see, method `deploy()` accepts an argument of type `Into<ContractData>`, so any object convertible to ContractData will be accepted. ContractData, on the other hand, contains a field named `constuctor_arg`, which is optional, but when set, will be used as an argument to the `init()` method of our contract. In effect, we are able to pass data from deployment code, like a contract deployment tool or a wallet, to contract state. Note that in the above example obligatory argument `owner` also had to be provided.


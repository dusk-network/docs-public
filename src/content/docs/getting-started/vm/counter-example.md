---
title: Smart Contract Example
---


### Simple Counter Example
Let's create a simple contract example for a counter. The counter will keep a count, and allow for incrementing it by one, as well as for reading its current value. In other words, the counter contract will count the number of times its increment method has been called, and will make this count available via a read method. As our contract (as any Dusk VM contract) is "almost" a normal Rusk program, let's create a new Rust cargo project in order to be able to write it and compile it.

You can create new Rust library for our contract by issuing the following command:

`cargo new --lib hello-dusk-contract`

This command will create a small Rust library project in a folder named `hello-dusk-contract`. You can open files of this project using your favorite IDE or with a simple system editor. In folder `src` there is a file `lib.rs` with some sample test. Your can remove this generated content by clearing up the file and then you can start entering or pasting in the contract's code.

As our Rust contract will be translated into Web Assembly, we need to compile it without standard libraries, as they won't be available at our Dusk VM runtime. Hence, first line of our contract will be:

`#![no_std]`

Next, in order to hook up methods of our Dusk VM host, we need to import a special Dusk VM library into our module via the standard Rust `use` declaration: 

`use piecrust-uplink as uplink;`

We can now focus on our counter functionality. Let's define our counter state as a Rust structure as follows:

```rust
pub struct Counter {
    value: i64,
}
```

Value of our counter will be kept as a `value` field in `Counter` struct. As counter's value is our state, which needs to be preserved between contract methods' invocations, we need to instantiate our state as global static object:

```rust
static mut STATE: Counter = Counter { value: 0 };
```

Now we have our STATE of type Counter, but we also need methods to manipulate it. At this moment we are in the realm of 'normal' Rust, there is nothing Dusk VM or blockchain-specific in the following code:

```rust
impl Counter {
    pub fn increment(&mut self) {
        self.value += 1;
    }
}
```

We also need a method to read the counter value, so eventually our Counter methods implementation block will look as follows:

```rust
impl Counter {
    /// Read the value of the counter
    pub fn read_value(&self) -> i64 {
        self.value
    }

    /// Increment the value of the counter by 1
    pub fn increment(&mut self) {
        let value += 1;
        self.value = value;
    }
}
```

We created a Rust structure containing our state and two methods, one manipulating the state and the other querying the state's value. Now we need to expose our methods to the Dusk Virtual Machine so that it is able to "see" them and execute them after our contract is deployed. For this we need the following code:

```rust
#[no_mangle]
unsafe fn increment(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.increment())
}
```

Similarly, to expose the `read_value` method we need to following code:
```rust
#[no_mangle]
unsafe fn read_value(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_value())
}
```

Our contract is now ready. The `#[no_magle]` annotations are needed in order to turn off the default Rust linker name mangling - here we want our names to be as they are, since they will be called via mechanisms outside of control of the linker. `uplink::wrap_call` takes care of all the boilerplate code needed to serialize/deserialize and pass arguments to and from our methods. As a result, our entire counter contract looks as follows:

```rust
#![no_std]

use piecrust_uplink as uplink;

pub struct Counter {
    value: i64,
}

static mut STATE: Counter = Counter { value: 0xfc };

impl Counter {
    pub fn read_value(&self) -> i64 {
        self.value
    }

    pub fn increment(&mut self) {
        self.value += 1;
    }
}

#[no_mangle]
unsafe fn read_value(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_value())
}

#[no_mangle]
unsafe fn increment(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.increment())
}
```

You can now issue the following command and see if it compiles:

`cargo build --release --target wams32-unknown-unknown`

When you do it, you encounter an error stating that a `piecrust-uplink` dependency is missing. In order to alleviate this error, you need to enter the following line in the `[dependencies]` section of your Cargo.toml file:

```toml
[dependencies]
piecrust-uplink = { version = "0.8", features = ["abi", "dlmalloc"] }
```

Now you should be able to compile successfully and after issuing a command:

`find . -name *.wasm`

you should be able to see a file named: `hello_dusk_contact.wasm` That is the result of our compilation which can now be deployed to the Dusk Blockchain. 

## Contract State Persistence
After trying out the above example, you may wonder, how is it possible that counter state is being persisted, although we did not do anything special with the count value. Usually, smart contracts provide persistence in a form of special key-value maps, accessible via an api provided by the contract host. Here, we did not do anything to make the count persistent, yet it is being persistent and when we try out the contract by subsequently calling increment and read_value, we can see that the count value  is correct. The answer is that the entire memory of a contract gets persisted, along with contract data. Thus, we don't need to do anything special to make data persistent. As data is in memory, it will be persisted along with the entire memory. A consequence of this is the fact that you can use any data structure or data collection in you program, and it will be persisted. You don't need to limit yourself to a predefined set of types provided to you by the blockchain's VM runtime environment.


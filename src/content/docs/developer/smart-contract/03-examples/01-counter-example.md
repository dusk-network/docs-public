---
title: Smart Contract Example
---

## Simple Counter Example

Let's create a simple contract for <a href="https://github.com/dusk-network/piecrust" target="_blank">Piecrust</a>, the virtual machine used by the Dusk blockchain.

We will develop a counter that keeps track of its total count, providing functionality to increment this count by one and to read the current value. Specifically, the counter will record how many times its increment method has been called, and this information can be accessed through a read method.

Let's do it step by step.

### 1) Create a Rust project

As smart contracts on Dusk are "almost" normal Rust programs, let's create a new Rust cargo project in order to be able to write it and compile it.

You can create new Rust library for our contract by issuing the following command:

`cargo new --lib hello-dusk-contract`

This command will create a small Rust library project in the folder named `hello-dusk-contract`. You can open files of this project using your favorite IDE or with a simple system editor. 

In folder `src` there is a `lib.rs` file with some example tests. You can remove all the content from the `lib.rs` file.

We will add the required dependencies to the `Cargo.toml` file. You can then start entering or pasting in the contract's code.

### 2) Add dependencies

Add the following line in the `[dependencies]` section of your `Cargo.toml` file:

```toml
[dependencies]
piecrust-uplink = { version = "0.8", features = ["abi", "dlmalloc"] }
```

If we don't do it, when compiling the contract we will encounter an error stating that the `piecrust-uplink` dependency is missing. 

### 3) Prepare the contract

The Rust contract will be translated into WebAssembly, and the standard Rust libraries contain many elements that are unnecessary for our smart contracts. The reason is that those libraries won't be available in WASM due to its sandboxed environment (and therefore won't be available at Piecrust's runtime). Removing those libraries also helps us to minimize the size of the compiled code. 

Hence, first line of our contract will be:

`#![no_std]`

Next, in order to hook up methods of the Piecrust VM host, we need to import a specific library into our module via the standard Rust `use` declaration: 

`use piecrust_uplink as uplink;`

### 4) Add functionalities

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

Now we have our `STATE` of type `Counter`, but we also need methods to manipulate it. 

#### Modify the contract state
Let's add a method to increment the counter by adding the following code:

```rust
impl Counter {
    pub fn increment(&mut self) {
        self.value += 1;
    }
}
```

We are still in the realm of 'normal' Rust, as there is nothing related to Piecrust or blockchain in the code we just added.

#### Read from the contract state

We also need a method to read the counter value, so eventually our `Counter` methods implementation block will look as follows:

```rust
impl Counter {
    /// Read the value of the counter
    pub fn read_value(&self) -> i64 {
        self.value
    }

    /// Increment the value of the counter by 1
    pub fn increment(&mut self) {
        self.value += 1
    }
}
```

We have created a Rust structure containing our state and two methods: one manipulating the state and the other querying the state's value.

#### Interact with the Piecrust VM

Now we need to expose the methods in our contract to the VM. This allows the VM to "see" the methods and call them on our contract.

This is why we need to add the following code to expose the `increment` method:

```rust
#[no_mangle]
unsafe fn increment(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.increment())
}
```

Similarly, to expose the `read_value` method we add:
```rust
#[no_mangle]
unsafe fn read_value(arg_len: u32) -> u32 {
    uplink::wrap_call(arg_len, |_: ()| STATE.read_value())
}
```

**Notes**: 
- The `#[no_mangle]` annotations are needed in order to turn off the default Rust linker name mangling. We want our names to be as they are, since they will be called via mechanisms outside the control of the linker. 

- `uplink::wrap_call` takes care of all the boilerplate code needed to serialize/deserialize and pass arguments to and from our methods.

Our contract is now ready, and the entire counter contract looks as follows:

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

### 5) Compile the contract

Before compiling the contract, let's first add the following line in the `[lib]`section in the `Cargo.toml` file:

```toml
[lib]
crate-type = ["cdylib"] 
```
The `cdylib` type ensures that the necessary metadata and structure for a dynamic library are included in the output file. Without adding it, the Rust compiler would default to other types that are not suitable for dynamic loading (needed by WebAssembly hosts). This implies that the build process may still proceed without errors, but it will not produce a WebAssembly file that can be recognized by WebAssembly hosts. In other words, without adding the `cdylib` line you won't be able to see the `.wasm` file just created.

You can now issue the following command to compile the contract:

`cargo build --release --target wams32-unknown-unknown`

This command compiles the Rust project for the WebAssembly target in release mode, optimizing the output for performance.

Once the contract has been compiled successfully, you can launch:

`find . -name *.wasm`

By doing so, you should see the build file named: `hello_dusk_contact.wasm`.

Now that you have compiled the contract, you can deploy it to the Dusk blockchain.

## Contract State Persistence

After trying out the above example, you may wonder, how is it possible that the counter state is being persisted, although we did not do anything special with the count value. Usually, smart contracts provide persistence in a form of special key-value maps, accessible via an api provided by the contract host. Here, we did not do anything to make the count persistent, yet it is being persistent and when we try out the contract by subsequently calling `increment` and `read_value`, we can see that the count value is correct.. 

The answer is that the entire memory of a contract gets persisted, along with contract data. Thus, we don't need to do anything special to make data persistent. As data is in memory, it will persist along with the entire memory. A consequence of this is the fact that you can use any data structure or data collection in your program, and it will be persisted. You don't need to limit yourself to a predefined set of types provided to you by the blockchain's VM runtime environment.

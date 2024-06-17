---
title: Interacting with a contract
---

The correct way of interacting with a contract is exemplified in the test folder of wallet-core, where there is a useful test. In particular, using this code:
fn execute_works() {
    let seed = [0xfa; RNG_SEED];
    let rng_seed = [0xfb; 32];
    let values = [10, 250, 15, 7500];

    let mut wallet = Wallet::default();

    let types::PublicSpendKeysResponse { keys } = wallet
        .call(
            "public_spend_keys",
            json!({
                "seed": seed.to_vec(),
            }),
        )
        .take_contents();
    let psk = &keys[0];

    let mut contract: ContractId = ContractId::uninitialized();
    contract.as_bytes_mut().iter_mut().for_each(|b| *b = 0xfa);
    let contract = bs58::encode(contract.as_bytes()).into_string();

    let (inputs, openings) = node::notes_and_openings(&seed, values);
    let crossover = Crossover::default();
    let blinder = JubJubScalar::default();

    let crossover = WasmCrossover {
        blinder: rkyv::to_bytes::<JubJubScalar, MAX_LEN>(&blinder)
            .unwrap()
            .to_vec(),
        crossover: rkyv::to_bytes::<Crossover, MAX_LEN>(&crossover)
            .unwrap()
            .to_vec(),
        value: 0,
    };

    let args = json!({
        "call": {
            "contract": contract,
            "method": "commit",
            "payload": b"We lost because we told ourselves we lost.".to_vec(),
        },
        "crossover": crossover,
        "gas_limit": 100,
        "gas_price": 2,
        "inputs": inputs,
        "sender_index": 0,
        "openings": openings,
        "output": {
            "note_type": "Obfuscated",
            "receiver": &keys[1],
            "ref_id": 15,
            "value": 10,
        },
        "refund": psk,
        "rng_seed": rng_seed.to_vec(),
        "seed": seed.to_vec()
    });

    let types::ExecuteResponse { tx } =
        wallet.call("execute", args).take_contents();

    rkyv::from_bytes::<tx::UnprovenTransaction>(&tx).unwrap();
}


The ref_id in the output is optional and represents a nonce used for generating the notes. If provided it is used, if not a random one is generated.

Anyway, it is recommended to follow the tests in rusk, for example the staking one.

The code wallet-cli is using currently is same being used on the rusk test cases (e.g. there is a  get_stake call).

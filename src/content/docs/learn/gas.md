---
title: Gas 
description: Links to our research papers and technical blogs 
---

## What is 'Gas'?

In the context of the Dusk and its economic protocol, 'Gas' is a fundamental concept central to the execution and processing of transactions on the blockchain. Gas can be thought of as the fuel that powers blockchain operations, similar to how gasoline powers a vehicle.

### Gas as Resource Allocation meter
Gas is used as a unit of measure to allocate resources on the blockchain. Each operation, whether it's a simple transaction or a complex smart contract execution, requires a certain amount of computational power and storage. Gas quantifies this resource usage.

### Gas Price
Whenever you use a unit of gas, a corresponding price is incurred. The gas price is expressed in `LUX` (`LUX` being the minimum fraction of `DUSK`, equivalent to 1 billionth of `DUSK`).

### Transaction Fee?
When you initiate a transaction, you specify the fee you're willing to pay. The fee is calculated by indicating the maximum amount of gas you're willing to pay and the amount of `LUX` you'll pay for each gas unit.

For example, if you send a transaction with GasLimit=100,000 and GasPrice=2, it means you'll pay no more than 100,000 * 2 `LUX` = 0.000200 `DUSK` for that transaction. This only signifies your fee limit, as only the spent gas is charged after your transaction is processed and included in a block. This means that if the transaction consumes only 50,000 GasPoints, you'll be charged only 0.0001 `DUSK`.

If the provided GasLimit is not sufficient for processing, your transaction may encounter an OUT_OF_GAS error, leading to two scenarios:
1. **OUT_OF_GAS while spending**: Your transaction is simply discarded by the block producer.
2. **OUT_OF_GAS while calling a smart contract**: Your transaction is included in a block with a "FAIL" status. This means that any changes made during the execution of the smart contract up to the exhaustion of gas are reverted. Additionally, all fees are charged.

### Unsuccessful Transactions
In addition to encountering the OUT_OF_GAS error, a transaction can also FAIL for various reasons depending on the invoked smart contract. If the transaction fails, all changes are reverted, and the entire fees associated with the transaction are charged.

### Fee Redistribution
Every time a transaction fee is charged, the amount accrues in the block reward. The block reward comprises transaction fees and the coinbase value (according to the [Token Emission Schedule](../learn/tokenomics#token-emission-schedule), see link). The block reward is then allocated 90% to the block generator and 10% to the DUSK pool.

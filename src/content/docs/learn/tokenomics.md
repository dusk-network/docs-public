---
title: Tokenomics 
description: Tokenomics, allocation, vesting and emission of the Dusk token.
---

The Dusk protocol utilizes the DUSK token both as an incentive for consensus participation and as its primary native currency. DUSK is currently represented as an ERC-20 or BEP-20 token. Upon the mainnet launch, users will be able to migrate their tokens to native DUSK via a burner contract.

This page provides an in-depth overview of the DUSK token’s metrics, utility, allocation, emission schedule, rewards, as well as insights from the <a href="https://github.com/dusk-network/audits/blob/main/Dusk_Report%20(1).pdf">Economic Protocol Design</a> report.

## Token Metrics

- **Token Name**: Dusk
- **Token Symbol**: DUSK
- **Initial Supply**: 500,000,000 DUSK, comprising both ERC-20, BEP-20 and BEP2 versions. These will be migrated to native DUSK tokens after the mainnet launch using a burner contract.
- **Total Emitted Supply**: 500,000,000 DUSK will be emitted over 36 years to reward stakers on the mainnet, following the [Token Emission Schedule](#token-emission-schedule).
- **Maximum Supply**: 1,000,000,000 DUSK, combining the 500M initial supply and 500M emitted over time.
- **Circulating Supply**: Available on [this page](https://supply.dusk.network/). The circulating supply reflects the initial supply minus the DUSK held by the [Dusk deployer](https://etherscan.io/token/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551?a=0x618bb3b255928ae6b2046df5c828fa1dc7e3c5f0). Post-mainnet, this value will increase as additional tokens are emitted.
* **ICO**: Raised \$8 million in November 2018, with tokens priced at $0.0404. Private sale tokens account for 50% of the total supply, split between 10% DUSK BEP20 and 40% DUSK ERC20.

## Token Contract

The DUSK token is available as an ERC20 on Ethereum, a BEP20 on Binance Smart Chain and a BEP2 token on Binance Beacon Chain.

| Chain                | Standard | Contract Address                           |
|----------------------|----------|--------------------------------------------|
| Ethereum             | ERC20    | [0x940a2db1b7008b6c776d4faaca729d6d4a4aa551](https://etherscan.io/token/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551) |
| Binance Smart Chain  | BEP20    | [0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c](https://bscscan.com/token/0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c) |
| Binance Beacon Chain | BEP2     | [DUSK-45E](https://explorer.bnbchain.org/asset/DUSK-45E) |

## Token Markets & Exchanges

The DUSK token is widely accessible on top-tier CEXs and DEXs. For more information on the various locations DUSK is accessible, see the markets pages for Coinmarketcap and Coingecko:
- [DUSK markets Coinmarketcap](https://coinmarketcap.com/currencies/dusk/#Markets)
- [DUSK markets Coingecko](https://www.coingecko.com/en/coins/dusk)

## Token Utility

DUSK serves several key purposes within the ecosystem:
* Used for staking in consensus participation.
* Rewards to consensus participants.
* Payment of network fees ([gas](tx-fees)).
* Paying for the deployment of dApps on the network.
* Payment of services on the network.
* Target currency for dividend payouts in XSC or other dApps.
* Security deposit for issuance of regulated digital assets

### DUSK for Transaction Fees

DUSK represents the only medium responsible for transaction fee payments. Each transaction requires to have an attached fee. The transaction fees exist to subsidize consensus participants for the computation costs as well as to act as a deterrent against DDoS attacks. Specifically, Dusk utilizes an internal accounting system to express the cost of operations inside the virtual machine called `gas`. 


Users wishing to add their transaction to a block enter a *generalized first-price auction (GFP)* by setting a gas price (i.e. `gasprice`) they are willing to pay per unit of gas. The block has a gas limit, and transactions consume the available gas based on the auction results.
The `baseprice` is the minimum gas price that can be set for a transaction. The `gaslimit` is required as a workaround to the halting problem, ensuring that every transaction does halt at after a finite amount computation cycles, either due to the successful termination or due to the gas consumption reaching the allocated.

Dusk is also working on innovative gas payment mechanisms to further improve the tokenomics and user experience, while integrating seamlessly with business requirements. As such, Dusk improves over the usual gas management in blockchain by introducing possibilities that are unavailable in other networks. More information can be found on the [economic model page](/learn/deep-dive/economic-protocol).

## Token Allocation and Vesting Overview

The vesting period ran from May 2019 to April 2022.

| Allocation Category | Percentage | DUSK Tokens   | Vested        |
|---------------------|------------|---------------|---------------|
| Token Sale          | 50%        | 250,000,000   | 250,000,000   |
| Team                | 6.4%       | 32,000,000    | 32,000,000    |
| Advisors            | 6.4%       | 32,000,000    | 32,000,000    |
| Development         | 18.1%      | 90,500,000    | 90,500,000    |
| Exchange            | 11.8%      | 59,000,000    | 59,000,000    |
| Marketing           | 7.3%       | 36,500,000    | 36,500,000    |
| **Total**           | **100%**   | **500,000,000** | **500,000,000** |

## Staking Details

Staking is a crucial aspect of the Dusk protocol, allowing token holders to contribute to network security. For more details on the emission schedule, see the **[Token Emission Schedule](#token-emission-schedule)** below. Here are the primary details for staking DUSK tokens:

* **Minimum Staking Amount**: 1000 DUSK.
* **Maximum Staking Amount**: No upper bound.
* **Stake Maturity Period**: 2 Epochs - 4320 blocks.
* **Unstaking**: No penalties or waiting period.

## Token Emission Schedule


The DUSK token emission schedule plays a vital role in incentivizing network participants, particularly in the early stages of the blockchain network, where transaction fees alone may not be sufficient to reward node operators and validators. By systematically emitting tokens over time, the Dusk network ensures that participants are adequately compensated for securing and maintaining the network, fostering its growth and decentralization.

The token emission has been designed to align with the long-term vision of building a robust and enduring ecosystem, while controlling inflation and limiting potential attack vectors. The emission schedule follows a carefully structured geometric decay model, wherein the number of emitted tokens reduces systematically every 4 years. This approach balances the need for continuous token issuance with inflation control, ensuring long-term sustainability and stability for the DUSK token economy.

Key aspects of the DUSK token emission schedule include:

- **36-Year Emission Duration**: The token emission is distributed across 36 years, divided into 9 periods of 4 years each.
- **Emission Reduction Every 4 Years**: Token emission decreases every 4 years by a fixed reduction rate, ensuring gradual reduction in token issuance, similar to Bitcoin’s halving model.

## Token Emission Strategies

To ensure flexibility and sustainability, three different emission strategies have been proposed, each varying in the initial emission rate and the reduction rate per period.

The following tables present the token emission schedule under three proposed strategies. Each strategy adjusts the initial emission rate and reduction rate to balance early incentives with long-term sustainability. Each table outlines the total number of tokens emitted per 4-year period, the cumulative supply over time, the emission rate per block, and the reduction rate applied in each period.

### Scenario 1: High Initial Emission (r = 0.6)


In the scenario with a high initial emission, the emission rate starts with a reduction rate `r = 0.5`, meaning the token emission halves every 4 years. This strategy is designed to rapidly build network participation by providing strong early incentives.

| Period (Years)     | Period Duration (Blocks) | Total Emission (DUSK) | Total Supply (Cumulative) | Emission Per Block | Reduction Rate (r) |
|--------------------|--------------------------|-----------------------|---------------------------|--------------------|--------------------|
| 1 (0-4)            | 12,614,400               | 250.48M               | 250.48M                   | 19.8574 DUSK/block | N/A                |
| 2 (4-8)            | 12,614,400               | 125.24M               | 375.72M                   | 9.9287 DUSK/block  | 0.5                |
| 3 (8-12)           | 12,614,400               | 62.62M                | 438.34M                   | 4.9644 DUSK/block  | 0.5                |
| 4 (12-16)          | 12,614,400               | 31.31M                | 469.65M                   | 2.4822 DUSK/block  | 0.5                |
| 5 (16-20)          | 12,614,400               | 15.65M                | 485.30M                   | 1.2411 DUSK/block  | 0.5                |
| 6 (20-24)          | 12,614,400               | 7.83M                 | 493.13M                   | 0.6206 DUSK/block  | 0.5                |
| 7 (24-28)          | 12,614,400               | 3.91M                 | 497.04M                   | 0.3103 DUSK/block  | 0.5                |
| 8 (28-32)          | 12,614,400               | 1.95M                 | 498.99M                   | 0.1551 DUSK/block  | 0.5                |
| 9 (32-36)          | 12,614,400               | 0.98M                 | 499.97M                   | 0.0776 DUSK/block  | 0.5                |


### Scenario 2: Moderate Initial Emission (r = 0.6)

This scenarios balances high early incentives with longer-term sustainability by reducing the token emission by 40% every 4 years. The reduction rate `r = 0.6` ensures a moderate decrease in emissions, fostering sustained network engagement.

| Period (Years)     | Period Duration (Blocks) | Total Emission (DUSK) | Total Supply (Cumulative) | Emission Per Block | Reduction Rate (r) |
|--------------------|--------------------------|-----------------------|---------------------------|--------------------|--------------------|
| 1 (0-4)            | 12,614,400               | 201.22M               | 201.22M                   | 15.943 DUSK/block  | N/A                |
| 2 (4-8)            | 12,614,400               | 120.73M               | 321.95M                   | 9.568 DUSK/block   | 0.6                |
| 3 (8-12)           | 12,614,400               | 72.44M                | 394.39M                   | 5.743 DUSK/block   | 0.6                |
| 4 (12-16)          | 12,614,400               | 43.46M                | 437.85M                   | 3.445 DUSK/block   | 0.6                |
| 5 (16-20)          | 12,614,400               | 26.08M                | 463.93M                   | 2.067 DUSK/block   | 0.6                |
| 6 (20-24)          | 12,614,400               | 15.65M                | 479.58M                   | 1.240 DUSK/block   | 0.6                |
| 7 (24-28)          | 12,614,400               | 9.39M                 | 488.97M                   | 0.744 DUSK/block   | 0.6                |
| 8 (28-32)          | 12,614,400               | 5.63M                 | 494.60M                   | 0.446 DUSK/block   | 0.6                |
| 9 (32-36)          | 12,614,400               | 3.38M                 | 497.98M                   | 0.268 DUSK/block   | 0.6                |

### Scenario 3: Low Initial Emission (r = 0.7)

Designed for gradual and sustained growth, this sceraio has the lowest initial emission and a 30% reduction every 4 years. The reduction rate `r = 0.7` ensures a slower decline in token issuance, making it ideal for maintaining long-term participation and network stability.

| Period (Years)     | Period Duration (Blocks) | Total Emission (DUSK) | Total Supply (Cumulative) | Emission Per Block | Reduction Rate (r) |
|--------------------|--------------------------|-----------------------|---------------------------|--------------------|--------------------|
| 1 (0-4)            | 12,614,400               | 154.36M               | 154.36M                   | 12.235 DUSK/block  | N/A                |
| 2 (4-8)            | 12,614,400               | 108.05M               | 262.41M                   | 8.566 DUSK/block   | 0.7                |
| 3 (8-12)           | 12,614,400               | 75.63M                | 338.04M                   | 5.993 DUSK/block   | 0.7                |
| 4 (12-16)          | 12,614,400               | 52.94M                | 390.98M                   | 4.195 DUSK/block   | 0.7                |
| 5 (16-20)          | 12,614,400               | 37.06M                | 428.04M                   | 2.938 DUSK/block   | 0.7                |
| 6 (20-24)          | 12,614,400               | 25.94M                | 453.98M                   | 2.056 DUSK/block   | 0.7                |
| 7 (24-28)          | 12,614,400               | 18.16M                | 472.14M                   | 1.439 DUSK/block   | 0.7                |
| 8 (28-32)          | 12,614,400               | 12.71M                | 484.85M                   | 1.007 DUSK/block   | 0.7                |
| 9 (32-36)          | 12,614,400               | 8.90M                 | 493.75M                   | 0.706 DUSK/block   | 0.7                |



## Incentive Structure

To ensure network security, economic sustainability, and consensus efficiency, the following reward distribution structure is applied:

- **70%** to the Block Generator (proposal step) and an extra **10%** depending on the
credits included in the certificate. Any undistributed rewards from this 10% are burned as part of the gas-burning mechanism.
- **10%** to the Dusk Development Fund
- **5%** to the Validation Committee (validation step)
- **5%** to the Ratification Committee (ratification step)

This structure incentivizes all steps of the [SA Consensus](/learn/deep-dive/succinct-attestation), with a focus on the Block Generator, which plays the most critical role.

The Block Generator is encouraged to include as many voters in the certificate as possible, as the percentage of the total reward it receive also depends on the number of votes obtained in the Validation and Ratification steps.
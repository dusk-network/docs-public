---
title: Tokenomics 
description: Tokenomics, allocation, vesting and emission of the Dusk token 
---

The Dusk protocol utilizes the DUSK token both as an incentive for consensus participation and as its primary native currency. DUSK is currently an ERC-20 token deployed on Ethereum. With the launch of mainnet, the DUSK token will be bridged to its native network. Below are the key tokenomic points:

## Token Metrics

* **Token Name**: Dusk
* **Token Symbol**: DUSK
* **Total Supply**: 500,000,000 DUSK
* **Circulating Supply**: See [this](https://supply.dusk.network/) page. The value shown here is the total supply minus the DUSK held by the team controlled [Dusk deployer](https://etherscan.io/token/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551?a=0x618bb3b255928ae6b2046df5c828fa1dc7e3c5f0).
* **Maximum Supply**: 1,000,000,000 DUSK. 500M pre-mainnet, 500M emitted over an 18-36 year period to stakers on mainnet.
* **ICO**: Raised \$8 million in November 2018. The tokens were priced at $0.0404 during the ICO period. Private sale tokens comprise 50% of total supply, 10% DUSK BEP20 and 40% DUSK ERC20.
* **Token Type**: ERC20 & BEP20. In the future, bridged to the Dusk protocol as the DUSK native currency.

> **⚠️ IMPORTANT**
> We are aware of the [plans to sunset the Binance Beacon Chain](https://www.binance.com/en/support/announcement/binance-will-support-the-bnb-beacon-chain-bep2-network-sunset-plan-9effc62ec5f74839a19f8554b5dbb349). The team is working on creating the necessary binding between BEP2 DUSK and BEP20 DUSK and will make an official announcement as soon as we've done so, with a comprehensive guide covering the necessary steps to perform the migration.

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

The token can be used for the activities:
* Used for staking in consensus participation.
* Rewards to consensus participants.
* Payment of network fees ([gas](../learn/gas)).
* Paying for the deployment of dApps on the network.
* Payment of services on the network.
* Target currency for dividend payouts in XSC or other dApps.
* Security deposit for issuance of regulated digital assets

### DUSK for Transaction Fees

DUSK represents the only medium responsible for transaction fee payments. Each transaction requires to have an attached fee. The transaction fees exist to subsidize consensus participants for the computation costs as well as to act as a deterrent against DDoS attacks. Specifically, Dusk utilizes an internal accounting system to express the cost of operations inside the virtual machine called `gas`. 

Users wishing to add their transaction to a block enter a *generalized first-price auction (GFP)* by defining a price (i.e. `gasprice`) that they are willing to purchase a unit of gas for, in which the block is limited to a total of gas and the transactions of the auction participants consume a total of gas. We define as `baseprice` the minimum gas price that a transaction can set. The `gaslimit` is required as a workaround to the halting problem, ensuring that every transaction does halt at after a finite amount computation cycles, either due to the successful termination or due to the gas consumption reaching the allocated.

Gas payments are an area of innovation for Dusk research, as we continuously strive to improve the utility of Dusk token as well as making the network infrastructure and the tokenomics seamless and well-integrated with classic business requirements of profitability and good UX. As such, Dusk improves over the usual gas management in blockchain by introducing possibilities that are unavailable in other networks. More information can be found on the page [dedicated to the economic model](/org/roadmap/economic-model) (you need special permission to access the page).

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

Token emissions play a pivotal role in the early stages of a blockchain network, particularly when transaction fees alone might not be sufficient to incentivize node operators or validators. By emitting tokens over time, we can ensure that these participants are adequately rewarded for their efforts in securing and maintaining the network. This, in turn, encourages more participants to join, enhancing the network's decentralization and security.

The following table lays out the specific emission strategy for the DUSK token:

| Block Interval     | Emission Per Block | Total Emitted Amount | Total Supply        | Cumulative Duration (Best-Worst Case)* |
|--------------------|--------------------|----------------------|---------------------|--------------------------------------|
| 1-12,500,000       | 16 DUSK            | 200,000,000 DUSK     | 700,000,000 DUSK    | 4-8 years                            |
| 12,500,001-18,750,000 | 12.8 DUSK       | 80,000,000 DUSK      | 780,000,000 DUSK    | 6-12 years                           |
| 18,750,001-25,000,000 | 9.6 DUSK        | 60,000,000 DUSK      | 840,000,000 DUSK    | 8-16 years                           |
| 25,000,001-31,250,000 | 8 DUSK          | 50,000,000 DUSK      | 890,000,000 DUSK    | 10-20 years                          |
| 31,250,001-37,500,000 | 6.4 DUSK        | 40,000,000 DUSK      | 930,000,000 DUSK    | 12-24 years                          |
| 37,500,001-43,750,000 | 4.8 DUSK        | 30,000,000 DUSK      | 960,000,000 DUSK    | 14-28 years                          |
| 43,750,001-50,000,000 | 3.2 DUSK        | 20,000,000 DUSK      | 980,000,000 DUSK    | 16-32 years                          |
| 50,000,001-62,500,000 | 1.6 DUSK        | 20,000,000 DUSK      | 1,000,000,000 DUSK  | 18-36 years                          |

> 💡 The "Cumulative Duration (Best-Worst Case)" column in the **Token Emission Schedule** table represents the range of time intervals for token emissions based on the projected block times. The ideal case assumes optimal network conditions, maximum participation, and efficient block production. In contrast, the worst-case scenario accounts for possible network lags, decreased participation, or other unforeseen challenges that might lead to extended block production times.
{.is-info}

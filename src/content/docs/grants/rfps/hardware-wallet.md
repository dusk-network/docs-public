---
title: RFP-02
description: Learn about the RFP to integrate hardware wallet support on Dusk.
---


# Hardware Wallet Integration

**Status:** Open

**Category:** Integration

**Date Created:** 03/06/2024

## Project Overview

To enhance user security, Dusk aims to integrate support for at least one hardware wallet. This integration will allow users to use a physical device to securely store private keys and sign transactions, significantly increasing the security of their interactions with the Dusk network.

The integration should include all the necessary updates to the relevant hardware wallet user interfaces. Additionally, comprehensive documentation should be provided.


## Scope of Work

The scope of this RFP includes integrating an established hardware wallet (e.g., Ledger) with the Dusk network. Specifically, the work covers:

- **Seed Storage**: To enable the hardware wallet to securely store a seed.
- **Key Derivation**: To derive both BLS and JubJub-Schnorr keys from the stored seed.
- **Secure Transaction Signing**: To securely sign transactions using the hardware wallet's capabilities. This should allow users to sign transactions using either their BLS keys or JubJub-Schnorr keys.
- **Installation Flow**: To provide a smooth installation process of the software.
- **Reliability and Compatibility**: to ensure that the integration works reliably across different hardware wallet models and firmware versions.
- **Hardware Wallet UI Integration**: If applicable, this covers updating the necessary UI components to facilitate interaction with the hardware wallet.

## Envisioned Timelines

8 weeks

## Resources

Relevant repositories can be found here:
- https://github.com/dusk-network/bls12_381-sign
- https://github.com/dusk-network/jubjub-schnorr


## Proposal Submission

Please submit applications through the Thesan grants application form.

## Additional Information
##### Vendor Qualifications

Dusk seeks applicants with the necessary experience and expertise to ensure the successful implementation of the proposed solutions.

Applicants are preferred to have proven experience with the SDK for the proposed hardware wallet integration.

##### Evaluation Criteria

We evaluate all applications in a fair and unbiased manner. All proposals will be considered in the light of standard factors including, but not limited to:
- Technical expertise of the individual/team
- Project approach
- Cost
- Timeline
- Reputation of the individual/team


##### Confidentiality

All proposals will be treated as confidential.

##### Open Source
Code should be provided with the necessary licenses for open-source use (e.g. Apache 2.0, MPL, MIT).




## How to apply
Fill out the [Thesan application form](https://qfisyyuui1g.typeform.com/to/uAucnWFJ) by taking your your time to answer all the relevant questions in detail. Please make sure to follow the general and <a href="http://docs.dusk.network/grants/#selection-process" target="_blank"> requirements and guidelines </a>.
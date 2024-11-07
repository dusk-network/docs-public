---
title: Moonlight
description: An account-based transaction model on Dusk.
---

Moonlight is an account-based transaction model designed to offer full transparency within Dusk. It utilizes a BTreeMap for user accounts, which contains user addresses/BLS keys mapped to balances. An example implementation that can be considered the Moonlight token standard can be found <a href="https://github.com/dusk-network/transparent-token" target="_blank">here</a>.

Moonlight is fully transparent, leveraging an account-based model where user addresses and balances are publicly listed.
It is fully compatible with Phoenix, meaning that users can seamlessly convert between Phoenix notes and Moonlight balances.

Gas can be paid in both Phoenix notes and through Moonlight balances. In the Transfer Contract, Phoenix and Moonnlight are both equivalent in terms of being a payment rail. fees are directly deducted from account balances if a Moonlight transaction is executed.

## Interaction with Phoenix

When a user converts Phoenix notes to their Moonlight balance, the Transfer Contract processes the note(s) and increases the balance of the specified account by the equivalent value.

Similarly, when funds are converted from Moonlight to Phoenix, the balance of the account is decreased by the specified value and the Transfer Contract then creates a note with the specified value for the given stealth address.

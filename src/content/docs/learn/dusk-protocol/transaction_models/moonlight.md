---
title: Moonlight
---

Moonlight is an account-based transaction model designed to offer full transparency within Dusk. It utilizes a list for user accounts, which contains user addresses and BLS keys. 

Moonlight is fully transparent, leveraging an account-based model where user addresses and BLS keys are publicly listed.
It is fully compatible with Phoenix, meaning that users can seamlessly deposit Phoenix notes into Moonlight and withdraw funds back to Phoenix.

Even if gas fees always need to be paid in Phoenix notes, Moonlight abstracts them from users, as fees are being deducted directly accounts' balances.


## Interaction with Phoenix
When a user deposit Phoenix notes into its Moonlight balance, the Transfer Contract processes the deposit of the notes and increases the balance of the specified account by their value.

Similarly, when withdrawing funds from Moonlight to Phoenix, the balance of the account is decreased by the specified value and the Transfer Contract is then called to withdraw the specified value to the given stealth address.
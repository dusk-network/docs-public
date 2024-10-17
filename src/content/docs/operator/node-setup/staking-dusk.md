---
title: Staking DUSK
description: Learn how to stake DUSK and actively participate in the consensus.
---

Staking allows Provisioners to earn rewards by contributing to the security of the network. To run a Dusk Provisioner, at least **1000 DUSK** must be staked.

You can stake by running:
```sh
rusk-wallet stake --amt 1000 # Or however much you want to stake
```

Once the transaction has gone through, you can view your staking information by running:
```sh
rusk-wallet stake-info
```

To see if your node is participating in consensus and creating blocks, occasionally check:
```sh
grep "execute_state_transition" /var/log/rusk.log | tail -n 5
```

Note that this can take a while, given that your stake needs at least 2 epochs, or 4320 blocks, to mature. Your stake, relative to the total stake, also plays a factor.

Once your node starts accepting and creating blocks, the set up of your Provisioner has been successful.
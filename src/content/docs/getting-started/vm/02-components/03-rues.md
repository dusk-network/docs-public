---
title: RUES
---
# Rusk Universal Events System (RUES)

RUES are very pervasive in our architecture. Contracts can emit arbitrary events following a state-change, so arguably they depend on transaction execution. However, any component can emit events independently on that. For example, the consensus could emit events associated with failed iterations (which in fact are triggered when transactions are not executed). Same with the mempool (events could be emitted after transaction expiration, or upon reaching some memory/space threshold). In case of bridging, exogenous events from an interoperating chain could trigger endogenous ones that in turn elicits a transaction creation from a client or a set of validators. Etc etc
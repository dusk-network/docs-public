---
title: Transactions on Dusk
---



## Notes and UTXOs

Because of the way that Dusk works, transactions don't have the equivalent to msg.sender. Therefore developers need to figure out how to represent users. The issue is that even if in theory users can be seen as a collection of unspent notes associated with a key, notes are on purpose not linkable to each other. If someone find a way to do it, this should be reported and treated by as a vulnerability. 

 msg.sender is not "abstracted" away on dusk. So you could at the moment mimic that behavior explicitly in every function by taking the address as function argument too + for example a signature that signed all other function arguments (including your address). Then verifying this this in the function.

---
title: Succinct Attestation Consensus
---

The Dusk consensus protocol, called **succinct attestation** (**SA**), is a permission-less, committee-based proof-of-stake consensus protocol.

The protocol is run by all stakers, known as ***provisioners***, which are responsible for generating, validating, and ratifying new blocks. Participation goes in turns, with provisioners being pseudo-randomly selected for each phase of the consensus. The selection is done through the [*deterministic sortition*](#deterministic-sortition) algorithm, which extracts provisioners in a non-interactive way based on their stakes: the higher the stake, the more the provisioner gets extracted.


## Consensus Algorithm

The SA protocol is run in ***rounds***, with each round adding a new block to the blockchain. In turn, each round proceeds per ***iterations***, with each iteration aiming at generating a new *candidate* block and reaching agreement on the validity and the acceptance of such a block.

An iteration is composed of three ***steps***:
  1. [***Proposal***](#proposal), where an extracted provisioner is appointed to generate a new block and broadcast it to the network;  
  2. [***Validation***](#validation), where a committee of extracted provisioners verifies the new block and vote on the result;
  3. [***Ratification***](#ratification), where another committee of provisioners try to agree on the result of the Validation step.

If a candidate is produce in the Proposal step, and a supermajority of votes is reached in favor of the block, the candidate is added to the blockchain. The result of the iteration is certified with an ***attestation*** containing all the (digitally-signed) votes of the committee members that reached agreement on the block.

If the iteration fails, a new one is executed with a new candidate and a different set of provisioners running the protocol. A maximum of 255 iterations is run in a single round, with the last one producing an empty *emergency block*, which ensures no round ends without a block.


## Deterministic Sortition
The *deterministic sortition* algorithm allows to extract a certain number of provisioners from a list. It is used to select the *block generator* of the Proposal step and the member of the *voting committees* of the validation and ratification steps.

The algorithm takes a list of provisioners and a number of *voting credits* to assign to the extracted provisioners. The extraction is done in a pseudo-random way, based on the round, iteration, and step. To prevent pre-calculating extractions for future rounds, a block-unique *seed* value is used, which is computed by the block generator by signing the seed of the previous block. 

The extraction process is based on a pseudo-random *score* value generated by hashing the above parameters (round, iteration, step, and seed) along with index of the provisioner to extract. This ensures a unique value is used for each extraction.

Each provisioner can be assigned one or more credits, depending on its *stake*. Specifically, the extraction algorithm follows a weighted distribution that favors provisioners with higher stakes: the higher the stake, the higher the probability of being assigned a credit.

To balance out this probability each provisioner weight is initially set to the value of its stake, and then reduced by 1 Dusk each time the provisioner is assigned a credit. This way, the probability for a provisioner to be extracted diminishes with every assigned credit.

As such, on average, eligible provisioners will participate in committees with a frequency and power proportional to their stakes.


## Proposal
*Proposal* is the first step in an SA iteration. In this step, a randomly-extracted provisioner is appointed to generate a new *candidate* block to add to the ledger. In the same step, other provisioners wait for the candidate block produced by the generator.

In the proposal step, each provisioner node first executes the [*deterministic sortition*](#deterministic-sortition) algorithm to extract the *block generator*. If the node is selected, it creates a new *candidate block*, it signs it and broadcasts it using a $\mathsf{Candidate}$ message.

In this step, all other nodes wait to receive the candidate block until a timeout expires. If it was generated or received from the network, the step outputs the candidate block; otherwise, it outputs a void value. The step output will then serve as the input for the [*validation*](#validation) step, where a committee of provisioners will verify its validity and vote accordingly.

## Validation
*Validation* is the second step in an SA iteration. In this step, the *candidate* block, produced or received in the [proposal](#proposal) step, is validated by a committee of randomly chosen provisioners. Members of the extracted committee verify the candidate's validity and then cast their vote accordingly. At the same time, all provisioners, including committee members, collect votes from the network until a target quorum is reached, or the step timeout expires.
The main purpose of the validation step is to agree on whether a candidate block has bee produced and if it is a valid new tip of the blockchain.

In the validation step, each provisioner first executes the [*deterministic sortition*](#deterministic-sortition) algorithm to extract the committee for the step. The validation committee is generated by assigning 64 credits among all provisioners, except the block generator (which can thus not vote for its own block).

If the provisioner is part of the committee, it validates the output from the [proposal](#proposal) step. If the output is void, it votes $NoCandidate$. Otherwise, it verifies the candidate block's validity against its previous block: if the candidate is valid, the node votes $Valid$, otherwise, it votes $Invalid$.
Non-valid votes are used to prove an iteration failed (i.e., it can't reach a quorum of $Valid$ votes), which is functional to [block finality](#finality). The vote is signed and broadcast using a $\mathsf{Validation}$ message.

Then, all provisioners, including the committee members, collect votes from the network until a *supermajority* ($\frac{2}{3}$ of the committee credits) of $Valid$ votes is reached, a *majority* ($\frac{1}{2}{+}1$) of $\text{non-}Valid$ votes is reached, or the step timeout expires.
Specifically, if a supermajority of $Valid$ votes is received, the step outputs $Valid$; if a majority of $Invalid$ or $NoCandidate$ votes is received, the step outputs $Invalid$ or $NoCandidate$, respectively.

If the step timeout expires, the step outputs $NoQuorum$, which represents an unknown result: it is possible that casted votes reached a quorum but the provisioner did not see it.

In all cases, except $NoQuorum$, the step output includes the aggregated votes that determined the result. The step output will be used as the input for the [ratification](#ratification) step.


## Ratification
*Ratification* is the third step in an SA iteration. In this step, the result of the [validation](#validation) step is agreed upon by another committee of randomly chosen provisioners. 
Members of the extracted committee cast a vote with the output of the validation step. At the same time, all provisioners, including committee members, collect Ratification votes from the network until a target quorum is reached or the step timeout expires.

If a quorum is reached for any result, a $\mathsf{Quorum}$ message is generated with the aggregated signatures of both validation and ratification steps.
Since the certificate proves a candidate reached a quorum, receiving this message is sufficient to accept the candidate into the local chain.

The main purpose of the Ratification step is to ensure provisioners are "aligned" with respect to the validation result: if validation result was $Valid$, it ensures a supermajority of provisioners accept the block. Similarly, in case of non-Valid result, it ensures a majority of provisioners will attest this iteration as failed, which, in turn, is used in determining the block [*finality*](#finality).

In the ratification step, each provisioner first executes the [*deterministic sortition*](#deterministic-sortition) algorithm to extract the committee for the step. The ratification committee is also generated by assigning 64 credits among provisioners.
If the provisioner is part of the committee, it casts a vote with the winning validation vote ($Valid$, $Invalid$, $NoCandidate$, $NoQuorum$). 
The vote is signed and broadcast using a $\mathsf{Ratification}$ message, which also include the validation votes that determined the result.

Then, all nodes, including the committee members, collect votes from the network until a *supermajority*  ($\frac{2}{3}$ of the committee credits) of $Valid$ votes is reached, a *majority* ($\frac{1}{2}{+}1$) of $\text{non-}Valid$ votes is reached, or the step timeout expires. 

If any quorum is reached, the step outputs the winning vote ($Valid$, $Invalid$, $NoCandidate$). Otherwise, if the step timeout expires, the step outputs $NoQuorum$.
In all cases, except $NoQuorum$, the output of the step includes the aggregated votes that determined the result.

The output, together with the validation output, will be used to determine the outcome of the iteration.


## Finality
Due to the asynchronous nature of the network, more than one block can reach consensus in the same round (but in different iterations), creating a chain *fork* (i.e., two parallel branches stemming from a common ancestor). This is typically due to consensus messages being delayed or lost due to network congestion.

When a fork occurs, network nodes can initially accept either of the two blocks at the same height, depending on which one they see first. 
However, when multiple same-height blocks are received, nodes always choose the lowest-iteration one. This mechanism allows to automatically resolve forks as soon as all conflicting blocks are received by all nodes.

As a consequence of the above, blocks from iterations greater than 0 could potentially be replaced if a lower-iteration block also reached consensus. Instead, blocks reaching consensus at iteration 0 can't be replaced by lower-iteration ones with the same parent. However, they can be replaced if an ancestor block is reverted.

To handle forks, we use the concept of consensus state, which defines whether a block can or cannot be replaced by another one from the network.
In particular, blocks in the local chain can be in three states:

  - *Accepted*: the block has a $Valid$ quorum but there might be a lower-iteration block with the same parent that also reached a $Valid$ quorum; an Accepted block can then be replaced by a lower-iteration one; *Accepted* blocks are blocks that reached consensus at Iteration higher than 0 and for which not all previous iterations have a Failed Attestation. 

  - *Attested*: the block has a Valid quorum and all previous iterations have a Failed Attestation; this block cannot be replaced by a lower-iteration block with the same parent but one of its predecessors is Accepted and could be replaced; blocks reaching quorum at iteration 0 are Attested by definition (because no previous iteration exists).
  
  - *Final*: the block is attested and all its predecessors are final; this block is definitive and cannot be replaced in any case.


## Global Parameters
| Name                      | Value            |
|:-------------------------:|:----------------:|
| Minimum Stake             | 1000 Dusk        |
| Epoch Duration            | 2160 Blocks      |
| Committee Credits         | 64               |
| Maximum Iterations        | 255              |
| Rolling Finality Blocks   | 5                |
| Maximum Step Timeout      | 60               |

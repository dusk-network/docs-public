---
title: IOP and PCS
---

to build a modern SNARK, we need to combine a cryptographic object with an information-theoretic one. By combining cryptography with interactive proofs, we obtain a succinct non-interactive arguments of knowledge (SNARK).

To be more precise, the cryptographic object we need is a Polynomial Commitment Scheme, and the information-theoretic object we need is an Interactive Oracle Proof.

Therefore, the current paradigm on how to build an efficient snark for general circuits is to have:

A functional Polynomial Commitment Scheme (PCS). The PCS is a cryptographic object, and its security depends on its cryptographic assumptions.
An Interactive Oracle Proof (IOP), compatible with the PCS. Because the IOP is an information-theoretic object, we can prove its security without underlying assumptions.
The reason why we call these “modern” SNARKS, is that we figured out how to separate the IOP construction from the PCS construction. This flexibility gave us room for important innovations.




Polynomial Commitment Schemes (PCS)
Before understanding what a PCS is, let’s first recap what a commitment scheme is.

A commitment scheme is a protocol that needs to satisfy the following propriety(ies):

Binding propriety: it cannot produce two opening values for the commitment string. In other words, one commitment can only be “tied” to just one message.
Hiding propriety (in the case of ZK proofs). The committed string cannot reveal anything about the committed data.
To have a commitment scheme, we need a commitment algorithm and a verifier algorithm.

Commit algorithm. It allows you to commit a message to a random value. The output commitment string is very short (e.g. 32bytes), and its inputs are the message and the random value.
Verifier algorithm. It runs by having as input the message, the commitment string, and the random number.
Until now we have been talking about committing to some data. But what if we wanted to commit to a polynomial instead?

As most commitment schemes use hash functions, the trivial commitment scheme would be to use a hash function and commit to the coefficients of the polynomial.

Anyways, this would mean that the prover would need to send a proof that includes all the coefficients of the polynomial. As the polynomial can be extremely big though, our proof would not be succinct though. To construct a SNARK, we need succintness. That’s why we need to use a Polynomial Commitment Scheme (PCS).

A Polynomial Commitment Scheme (PCS) is a cryptographic protocol that allows us to transform a polynomial IOP into a succinct argument of knowledge. The PCS allows the Prover to simulate the polynomial IOP without explicitly sending a description of a large polynomial to the Verifier.

This is possible because with the PCS we send to the verifier just a commitment to the polynomial (e.g. a hash value of an element of a cryptographic group). The PCS supports the functionality that allows the verifier to choose a random point and demand that the Prover evaluates the polynomial at that point (e.g. doing the hash of M, like SHA256(M) ). Because the Verifier can choose random points to let the Prover evaluate the polynomial on, the Verifier is convinced after enough evaluation proofs.

By using a PCS, we are not requiring the Verifier to use a complete description of the polynomial, but instead the Verifier:

Receives a single hash value (or cryptographic group element) that commits to the polynomial.
Receives the requested evaluation of the polynomial and a proof that the requested evaluation of the polynomial is correct.
The PCS allows us to run a polynomial IOP succinctly: the Prover doesn’t need to send the whole polynomial to the Verifier, just a commitment to it!

The PCS reduces the claim over the correctness of the circuit to the evaluation of polynomials (which can be error-correcting schemes, hash-based schemes, additive groups schemes..).

The reason why it is enough to send a commitment to the polynomial to the Verifier (instead of the whole description of the polynomial), is that the Verifier doesn’t care specifically about the polynomial. The Verifier only cares about doing evaluations on the polynomial.

For this reason, the Verifier only needs evaluation points and queries their evaluations. When it queries the evaluations, the Verifier treats the polynomial commitment as if it was an “oracle”. The Verifier needs the concept of an “oracle” so that he can query the evaluations from it. The way we are going to provide an oracle to the Verifier is by instantiating the Oracle into a Polynomial Commitment Scheme. The reason why we talk about “instantiating” oracles, is because an oracle is just an information-theoretic concept: it doesn’t actually exist. The oracle is a model that can respond to the Verifer with the evaluations of the polynomial. To be able to use it, we need to encode the polynomial into an oracle.



Interactive Oracle Proof (IOP)
An Interactive Oracle Proof is a theoretical object that provides interactive proofs. Interactive proofs are the result of having both interactions and randomness. These IOPs are considered to be “oracles”, in the sense that they are expected to give the correct value when they are queried. In this theoretical framework, the Verifier’s parameters consist of oracles that can be queried. As they are theoretic objects, they don’t actually exist until they are instantiated (for example through a PCS). In practice, these oracles are replaced by PCS, allowing the verifier to evaluate them at any chosen point with the assistance of the Prover. Anyways, their information-theoretic nature allows us not to add any assumptions on their underlying security.

The IOP provides us with the interaction between the Prover and Verifier, as the Prover sends Oracles to the Verifier, and the Verifier can query those oracles and send challenges in the form of random field elements to the Prover.

When we are constructing the SNARK, the oracles are transformed into commitments to the functions using the PCS. An oracle cannot be used without being instantiated, and that’s why we need to instantiate it by using the PCS. So, even if in theory the verifier parameters are a bunch of oracles that the Verifier can query, in practice these oracles are replaced by commitments that the verifier can evaluate at any point of his choice using the Prover’s help.

We need the IOP because the proving process requires interactions between the Prover and Verifier. The Prover sends oracles to the Verifier, and the Verifier responds with random bits. This allows the Verifier to evaluate the oracles of his choice. This exchange continues for several rounds until the prover sends the last oracle.



An IOP is a proof system designed to demonstrate that a given circuit C equals to zero for a given public statement x and private witness w. In other words, the IOP is a proof system that proves C(x,w)= 0.

An IOP allows us to have an interactive protocol that works the following way:

The Verifier sends random bits to the Prover
Prover Sends the oracle to a function
The Verifier sends other randomness to the Prover
Prover sends an oracle to another function to the Verifier
The above steps happen for several rounds until the Prover sends the last oracle for the last function.
The Verifier uses the verification procedure to either accept or reject the proof. The Verifier uses the verification procedure provided by the IOP by verifying the statement x that needs to be proven, the randomness given by the Verifier from all rounds and the received oracles from the Prover. The Verifier evaluates any of these functions at any point of his choice in order to know if accepting or rejecting the proof.
The IOP guarantees that the final proof is sound. This means that a malicious prover cannot fool the Verifier.



Constructing a SNARK
Combining the IOP with the PCS allows us to obtain a SNARK for general circuits. As we said, the reason why we need both PCS and IOP is because we need to send oracles in the form of polynomial commitments.

When it comes to parameters, the Prover takes as inputs the Prover parameters, the statement, and the witness. Instead, the Verifier takes as inputs the Verifier parameter and the statement.

But how can we get the public parameters for both the Prover and the Verifier?

We’ll need to talk a bit about the pre-processing.

Pre-processing (setup)
By using a setup procedure, we obtain the public parameters for both Prover and Verifier.

We have said that if a circuit has a number of gates d, the polynomial would have at most a degree d. An imporant thing to note is that the Verifier will need to have enough time to read the circuit if he wants to be able to verify the proofs. Allowing the Verifier to read the circuit would mean that the Verifier algorithm would need to run in linear time to the size of the circuit. This is a problem though. Because the polynomial we are dealing with can be huge(e.g. a degree of 1 billion) if we had the Verfier running in linear time to the size of the circuit, we won’t have a succint proof (meaning that we won’t have a SNARK!).

To have a SNARK, we need to have the Verifier algorithm to operate in a logarithmic time in the size of the circuit C. This way, we would have enough succinctness. But Operating in logarithmic time implies that the verifier doesn’t even know exactly what the circuit looks like! How is this possible?

Because the polynomial can have a degree that corresponds to the size of the circuit (number of gates), we cannot have the Verifier just read the coefficients of the polynomial to understand it. We need to give him a summary of it, by allowing the Verifier to evaluate the polynomial only at one single point. The point is randomly chosen by the Verifier himself.

This is necessary, because if we want to have a succinct proof, the evaluation proof size and verifier time need to be logarithmic in the degree of the polynomial. More specifically, we would need to have some parameters that can function as a summary of the circuit. To do this, we would need to use the PCS to have the Prover commit to the polynomial by using a very short string.

The pre-processing step is important, because it’s the algorithm that generates parameters for both the Prover and the Verifier, and allows the verifier to operate in a logarithmic time in the size of the circuit C. Thanks to the pre-processing, we don’t need to deal with monstrous polynomials!

More precisely, with the pre-processing step, the Verifier can work on a summary of the circuit and verify evaluations at arbitrary points without needing to know the full description of the circuit. The pre-processing steps involve an algorithm that takes as an input the circuit C and some randomness (random bits) . With this initial setup, we can create a very short summary of the circuit (a string!), and let the Verifier be able to know a summary of the circuit through that string. This way, the pre-processing allows the Verifier to read the circuit in a logarithmic time to the size of the circuit.

The pre-processing argument system takes in 3 algorithms: the setup, the verifier, and the prover algorithms. When it comes to inputs, the Prover takes the Prover’s public parameters, the witness, and the statement. The Verifier takes the Verifier’s public parameters, the proof, and the statement.



Constructing a SNARK
So, how the hell can we build a SNARK? Let’s go step by step:

First, we choose a finite field for some prime number. Basically, we are fixing a set of functions.
Then we write an arithmetic circuit (using the choosen finite field). We can use a Domain Specific Language (DSL) such as Circom, Leo, Cairo, Noir..). Our circuit would take as inouts a public statement and a private witness. The circuit would output some elements in the finite field. The arithmetic circuit has additions and multiplications gates (mod p), and the Circuit takes as inputs a statement x and a witness w. This way, we can compile our code into a SNARK-friendly format (R1CS, Plonk, AIR..). We now have an argument system.
We need to pre-process the circuit with a setup algorithm. The setup algorithm takes a description of the circuit as input and outputs the public parameters for the Prover and Verifier. This allows us to pre-process the circuit. To be specific, the parameter for the verifier is a commitment to a bunch of polynomials. This is where the Fiat-Shamir transformation comes into play: it is the step that allows us to deal with non-interactive proof systems instead of interactive ones. The setup algorithm outputs some global parameters that are used by the Verifier and Prover. For non-interactive systems the pre-processing step is necessary, as this allows the Prover to just send the proof without any additional interactions.
Once we choose the Prover and Verifier algorithms, we feed the public parameters into the snark backend prover system (e.g. a prover would be running something like Groth16, Plonk, Bulletproofs..).
The Prover wants to prove that he can calculate f(x) = y. The Prover also wants to prove that the function f is included in the specific domain (the set of functions we chose before). In other words, the Prover wants to prove that for a circuit C and a statement s, he knows a witness w such as that the circuit is equal to 0, which in short means C(s,w) = 0. The witness in this case is the description of the function f along with the randomness r. Hopefully, the proof is short enough (e.g. few KBs). The first message in the protocol is the commitment to a polynomial sent from the Prover to the Verifier. To send the first message, the Prover chooses a function in the set and commits to it by running the commit algorithm. The commit algorithm outputs a commitment string, which is then used as a commitment to the global parameters, the selected function, and the randomness. This first message is important because it specifies the polynomial that the Prover committed to. After this first message, the interactive procedure starts. The interactive procedure corresponds to the evaluation protocol, which allows interactions between the Prover and the Verifier. In this interactive procedure, the messages from the Prover are short and read by the Verifier in full. This procedure involves a series of rounds where:
​ ​ ​​​ ​ ​​​ ​ ​​​ 6.1)The Verifier chooses a random point in the finite field and asks the Prover to evaluate the polynomial on that random point. In other words, the Verifier asks the Prover to “open” the selected polynomial at a specific point.

​ ​ ​​​ ​ ​​​ ​ ​​​6.2) The Prover needs to evaluate the polynomial on the point chosen by the Verifier so that he can prove that he knows how to evaluate the function he committed to. The Prover sends back the evaluation, along with the proof that the evaluation is correct.

​ ​ ​​​ ​ ​​​ ​ ​​​6.3) Prover commits to another polynomial and sends the commitment to the Verifier.

​ ​ ​​​ ​ ​​​ ​ ​​​6.4) The Verifier chooses another random value and sends it to the prover.

​ ​ ​​​ ​ ​​​ ​ ​​​6.5) The Prover evaluates the polynomial at the new point and provides the Verifier with both the new evaluations and the new proof that the evaluation is correct.

7) The steps of point 6 are repeated for several rounds. This is a continuous interaction between the Prover and Verifier. Anyways, because we used the Fiat-Shamir transformation by doing a pre-processing, we can simulate this interaction. The verifier can ask the prover to open any of these polynomials at any point of the Verifier’s choice.

8) The Prover commits to the last polynomial and sends the commit. This means that the Prover commits to a function so that later on he can produce a succinct proof that the committed function satisfies f(x)=y. The Prover is proving that knows a witness (meaning a function description and a randomness)such that f(x)=y.

9) After a certain number of interactions, the Verifier then chooses whether to accept or reject the proof. The Verifier does this verification by taking as inputs the statement, the random values, and the evaluations of the polynomials at all the points that he chooses.

Final Snark
In summary, to build a SNARK, we parametrize the polynomial IOP by two parameters:

The number of polynomial commitments.
The number of evaluation queries from the verify algorithm. This is the number of points at which the prover needs to open the evaluated polynomial).
The final SNARK consists in:

Prover sending the polynomial commitments to the Verifier.
The verifier running the evaluation queries several times.
The final SNARK ends up being several polynomial commitments + several evaluation proofs.
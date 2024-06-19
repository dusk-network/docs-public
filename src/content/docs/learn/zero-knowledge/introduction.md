---
title: Introduction
---


Zero Knowledge Proofs (ZKPs) are cryptographic techniques that allow a prover to convince a verifier that a given statement is true without revealing any additional information.

ZKP represent a significant advancement in the field of cryptography and privacy-preserving computation, and some folks compare ZKPs to the creation of a new form of computing in the sense that they introduce novel ways of representing, manipulating, and reasoning about information. ZKPs expand the range of problems that can be solved and the methods by which they can be approached, introducing new mathematical abstractions and tools to reason about information and its manipulation.

Zero Knowledge Proofs allow for more expressive and powerful privacy-preserving protocols, as the primary focus is on the relationships and transformations between different pieces of information, rather than the specific values themselves. This means that ZKPs offer a unique computing paradigm that focuses on privacy-preserving computation. This allows for the verification of computations without revealing the underlying data or the specifics of the computation itself.

Zero-knowledge proofs can also be viewed as a form of knowledge-compression technology, as they allow the prover to convince the verifier of a statement’s truth without transmitting the entire witness. This results in a smaller proof size and reduced communication overhead, making zero-knowledge proofs suitable for applications with bandwidth limitations or where privacy is paramount.

Additionally, ZKPs can be used as a means of verifiable computation, as they enable the prover to prove the correctness of the computation without revealing any information about the computation’s input, output, or internal detail.

Zero-knowledge proofs achieve verifiable computation through the following process:

A prover wants to convince a verifier that they have correctly performed a computation on secret input data.
The prover creates a zero-knowledge proof demonstrating the correctness of the computation while keeping the input data secret.
The verifier checks the proof to confirm the correctness of the computation without learning any information about the input data.


To understand the ZKP process, it is important to know its essential components:

Statement: A claim or assertion that the prover wants to convince the verifier is true.
Witness: A piece of information that proves the statement is true.
Prover: The party trying to prove the statement is true, without revealing the witness.
Verifier: The party verifying the statement’s truth without learning the witness.

Fundamental concepts
Let’s recap some concepts, as we will need them later on.

Statement
A statement is a claim that the Prover wants to prove to the Verifier. A statement is publicly known information, that the prover wants to prove.

In our SHA256 example, the statement would be SHA256(M) = 0

Witness
A witness is a secret that the Prover possesses that is used to prove the statement. The witness is the necessary element for the Prover to generate a valid proof. In a ZK setup, the Prover wants to prove to the Verifier that he knows the witness, without showing it. In our example, the witness would be the message M.

Arithmetic Circuit
Once we have the code of the computation we want to prove, we can use an arithmetic circuit to represent that computation through algebraic relations.

An arithmetic circuit is a mathematical model that allows us to represent our program as relations between polynomials. Using this math, we can leverage the propriety of polynomials to prove statements and do cool stuff. The arithmetic circuit itself tells you how to evaluate the polynomials so that you can use polynomials instead of computing in the “classical” way.

So, if we want to construct a SNARK, we need to make sure that whatever code we have is translated into an arithmetic circuit. This allows us to perform arithmetic operations like additions and multiplications over the finite field. A finite field is a set of numbers from 0 to a very large prime number, on which we can perform a special type of additions and multiplications (modulo p). Therefore, to define an arithmetic circuit, we need first to choose a finite field for some prime number.

You can also think of an arithmetic circuit to be a Directed Acyclic Graph (DAG), where Internal nodes are gates that represent an arithmetic operation (x,+,-,:), and inputs are the variables.

There are 2 types of arithmetic circuits:

Structured: the circuit is built in layers where you have one fixed arithmetic circuit that is repeated over and over again. You can think of it as a step of a microprocessor operation.
Unstructured: a circuit with arbitrary wires
Some SNARKS use structured circuits, and others use unstructured ones.

In other words, an arithmetic circuit is a function that takes as inputs some elements in the finite field and produces an element of the field as output. The bigger the computation you want to prove, the bigger the number of gates you need to have in your circuit. The circuit is constrained to have a maximum number of gates equal to the degree of the polynomial.

To get a sense, If we wanted to transform the SHA256 algorithm into an arithmetic circuit, we would have around 20 thousand gates! This would be considered to be a “small” circuit.

A bigger arithmetic circuit could be one that verifies digital signatures. For example, it could take as inputs a public key, a message, and a signature, and it would output “0” if the signature is valid with respect to the public key.

Flow of a Zero Knowledge Proof
Here’s an example of how a ZKP works:

The prover wants to convince the verifier that a statement is true without revealing the witness.
The prover independently encodes the witness into a polynomial commitment, which is a cryptographic tool that allows the prover to commit to a polynomial.
The prover and verifier engage in an Interactive Oracle Proof (IOP), a proof system where they interact through oracle queries. During this interactive stage, the verifier queries the oracle at specific points to check the consistency of the witness with the statement.
The prover generates a proof using a zk-SNARK construction like PLONK, which combines polynomial commitments and IOPs to create a non-interactive proof system. This proof generation is done independently by the prover, without the verifier’s involvement.
The Fiat-Shamir heuristic is applied to transform the interactive proof into a non-interactive proof. This is achieved by replacing the verifier’s random challenges with a deterministic hash function.
The prover sends the non-interactive proof to the verifier, who can now efficiently verify the proof without any further interaction with the prover.
The verifier checks the proof and, if it’s valid, becomes convinced that the statement is true without learning any additional information about the witness.

What is a SNARK?
A SNARK is a succinct proof that a certain statement is true. The proof should be short and fast to verify. To better understand what this means, let’s see an example.

Let’s assume we want to prove that we know a message M such that the SHA256(M) is equal to 0.

We could prove the above statement by sending the message M directly. It would work, but there would be some issues:

What if the message M is a lot of data to send? We want to have a shorter proof, and make sure it’s fast to verify. The proof should be smaller than the message itself.
We don’t want the Verifer to run the function that the Prover wants to prove. In this case, we don’t want to have the Verifer running the hash function.
We want to prove that SHA256(M) = 0 without revealing the message M.
If we just sent the message M to the verifier, the proof won’t be neither short or fast to verify (meaning that it won’t be succinct). We want to have a SNARK instead.

Also, if we sent the full message M, the Verifier would know the content of it. We want to prevent the Verifier from learning anything about M, by using Zero Knowledge proprieties.

The proprieties of a SNARK are:

Completeness: An honest Prover always will convince the Verifier.
Soundness: if the Prover lies, the Verifier will reject the answer with a high probability.
Succinctness: proof is short, and verifying time is fast.
In a ZK-SNARK, the Verifier does not learn anything about the message itself.

If we want to construct a SNARK we need to:

Choose an Interactive Oracle Proof (IOP) that expects a certain type of Polynomial Commitment Scheme.
Construct the Polynomial Commitment Scheme (PCS).
Pair the IOP and PCS together
Transform the interactive SNARK into a non-interactive one via the Fiat-Shamir transformation


How to build a SNARK?
To build a modern SNARK we need to:

Represent the program as an arithmetic circuit, by describing our progra via a circuit with addition and multiplication gates. The reason we need to transform our program into algebraic relations, is that when working with elliptic curves (or other cryptographic primitives) we cannot efficiently verify the operations of the bytecode of a computer program, while we can very efficiently evaluate complex algebraic expressions.
Convert the circuit description we obtained from the arithmetization step into a polynomial identity. This means using the arithmetization to obtain a bunch of equations proving properties of polynomials. This allows us to succinctly represent multiple instances of the arithmetic gates by representing them via polynomials, allowing us to succinctly commit to them. Keep in mind that the more complex the program, the higher is the degree of the polynomials we’re dealing with. By using polynomial relationships, we can compress the circuit information into representations of the polynomial that have a constant size no matter the degree. For example, we can embed a vector with millions of variables into a polynomial, and then perform arithmetics on that polynomial as if it were a normal vector. And this is cool.
Commit to this representation using a Polynomial Commitment Scheme. We can choose between different commitment schemes, each of those with different tradeoffs, properties and cryptographic assumptions. We generally prefer commitment schemes that gives us a constant proof size, so that the proof size doesn’t depend on the size of the circuit (aka the degree of the polynomials).
Evaluate the polynomial identity by evaluating polynomials at a random point. We can do this because if a polynomial identity holds at a random point, it is almost guaranteed to hold at every other point (Schwartz–Zippel lemma). Being able to verify these polynomial relationships by only looking at a single point of evaluation is the reason why we can do it so efficiently.

---
title: Introduction
---


Zero Knowledge Proofs (ZKPs) are cryptographic techniques that allow a prover to convince a verifier that a given statement is true without revealing any additional information.

ZKPs represent a significant advancement in the field of cryptography and privacy-preserving computation, as they expand the range of problems that can be solved and the methods by which they can be approached. ZKPs introduce new mathematical abstractions and tools to reason about information and its manipulation.

Zero Knowledge Proofs allow for more expressive and powerful privacy-preserving protocols, as the primary focus is on the relationships and transformations between different pieces of information, rather than the specific values themselves.

ZKPs offer a unique computing paradigm that focuses on privacy-preserving computation, allowing for the verification of computations without revealing the underlying data or the specifics of the computation itself.

ZKPs can also be viewed as a form of knowledge-compression technology, as by leveraging SNARKs they allow for a succinct proof size and reduced communication overhead.

ZKPs can be also used as a means of verifiable computation, as they enable the prover to prove the correctness of the computation without revealing any information about the computation’s input, output, or internal detail.

## Components

To understand the ZKP process, it is important to know its essential concepts:
- Statement: A claim or assertion that the prover wants to prove to a verifier. A statement is publicly known information.
- Witness: a secret that the prover possesses that is used to prove the statement. The witness is the necessary element for the Prover to generate a valid proof. In a ZK setup, the Prover wants to prove to the - Verifier that he knows the witness, without showing it.
- Prover: The party trying to prove the statement is true, without revealing the witness.
- Verifier: The party verifying the statement’s truth without learning the witness.

## Arithmetic Circuit

Once we have the code representing the computation trace of the statement we want to prove, we can use an arithmetic circuit to translate that computation into algebraic equations.

An arithmetic circuit is a mathematical model that allows us to represent our program as relations between polynomials. Using math, we can leverage the propriety of polynomials to prove statements.

In order to construct a SNARK, the computation to be proven needs to be translated into an arithmetic circuit. By doing so, it is possible to perform very specific arithmetic operations (such as additions and multiplications over the finite field for a prime number). 

An arithmetic circuit can resemble a Directed Acyclic Graph (DAG), where Internal nodes are gates that represent an arithmetic operation (x,+,-,:), and inputs are the variables.

An arithmetic circuit takes as inputs some elements in the finite field and produces an element of the field as output. It is important to notice that the bigger is the computation that needs to be proven, the bigger the number of gates that are needed in the circuit. More specifically, the circuit is constrained to have a maximum number of gates equal to the degree of the polynomial.

## ZKP creation and verification flow

Zero-knowledge proofs achieve verifiable computation through the following process:

- A prover wants to convince a verifier that they have correctly performed a computation on secret input data.
- The prover creates a zero-knowledge proof demonstrating the correctness of the computation while keeping the input data secret.
- The verifier checks the proof to confirm the correctness of the computation without learning any information about the input data.


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

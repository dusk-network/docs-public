---
title: PLONK
---


The PLONK Interactive Oracle Proof
PLONK is a polynomial IOP where a Prover can convince a Verifier that for a public circuit C and statement x, he has a witness w such that C(x,w) = 0.

This means that the PLONK IOP can be used together with a PCS to construct a universal SNARK for general circuits.

The PLONK pre-processing does not require a trusted setup, which means that:

if we match the PLONK IOP with a PCS that does not require a trusted setup, then the final SNARK doesn’t have a trusted setup.
If we combine PLONK with a PCS that does require a trusted setup, then the final SNARK will need a trusted setup.
Depending on the PCS we combine PLONK with, we will end up with different tradeoffs, depending on the properties and cryptographic assumption of the selected PCS.


Arithmetization
As we previously mentioned, we need to perform an arithmetization to efficiently construct proofs. To do this, we encode the entire execution trace of the circuit into a table that lists the inputs and output of every gate.

Because we want to commit to polynomials, we want to interpolate a polynomial that encodes the entire execution trace. This means that we need to encode all the inputs and all the wires into some polynomials. The Prover uses FFTs to compute the coefficients of the polynomial, and the degree of the polynomial is proportional to the number of gates. For example, if the encoding gives us 12 constraints, the correspondent polynomial has a degree at most 11. The fact that the degrees of the polynomials are equal to the number of the elements of the vector minus one is what makes PLONK so efficient.

Lagrange Polynomials and interpolations
There are two different ways of representing a polynomial:

Coefficient representation (the polynomial is defined by providing its coefficients).
Point-value representation (the polynomial is defined by providing the evaluation of the polynomials at some points).
FFTs and NTTs allow switching between these two different representations, and we can go back and forth between these representations via a linear transformation.

As any arithmetic circuit described via vectors can be transformed into a Lagrange-base representation, we prefer representing the vectors as a linear sum of Lagrange polynomials.

The reason is that when using Lagrange interpolation, our global parameters are the Lagrange coefficients of the polynomial and this gives us an efficient point-value representation for the polynomial.

Lagrange polynomials allow us to represent vectors via polynomials while making sure that any relation that applies to the vectors also holds true on the polynomials. This implies that once we have a way to evaluate gates using vectors, we can use Lagrange polynomials to represent those vectors as polynomials.

As we already know that the value of Lagrange polynomials is going to be either 1 or 0 on a specific set of points, we also know that once we multiply a vector for these specific polynomials we obtain a polynomial that when evaluated at each of those specific points will be equal to an element of our vector.

This means that the vector arithmetic can be mapped directly into the equivalent polynomial evaluation, allowing us to evaluate a large number of arithmetic gates at once. And this is great to obtain efficiency and succintness.

Multiplicative Subgroups, Roots of Unity and Vanishing Polynomial
The roots of unity in the realm that in the real numbers are 1 and -1, because 1²=1 and -1²=1.

Anyways, when constructing SNARKs we need to work on prime fields, and therefore we need to use modular arithmetic.

To be more specific, the special points in which the Lagrange polynomials evaluate to either 1 or 0 are determined by defining a multiplicative subgroup that acts as the root of unity. In order to construct a proof of knowledge we need to have a very large amount of roots of unity , and our evaluations are verified if they are equal to 0 modulo the vanishing polynomial.

If the arithmetic expression that we want to check on the vectors holds true, the polynomials we are evaluating are perfectly divisible for the vanishing polynomial. This implies that if the vectors on which we want to check the relations have millions of elements in them, we can evaluate millions of mini-equations with one single equation. We can do this by checking if the polynomials are 0 modulo the vanishing polynomial of the root of unity. This is pretty cool.

Proof Verification
Once the Prover encodes the computation trace into polynomials, the Verifier needs to verify that the polynomial is a commitment to a valid computation trace by verifying the inputs, gates, copy constraints and outputs.

1. Verify the inputs
The Verifier needs to check if the polynomial that the Prover committed to correctly encodes the inputs of the circuit. To check that the polynomial encodes the correct inputs, the Prover performs a zero test on the vanishing polynomial.

2. Verify the gates evaluations
The Verifier needs to check that each gate operation is evaluated correctly, which implies making sure that addition gates are processed as additions and multiplication gates are processed as multiplications. For example, if a gate represents a sum, the Verifier needs to check that the sum has been correctly performed.

The Verifier can do this by using a Selector polynomial which has been computed at the pre-processing phase and only depends on the gates of the circuit (and not on the inputs). The Selector polynomial evaluates to either 0 or 1 depending on if the gate is an addition gate or multiplication gate. By using the Selector polynomial, we can combine the addition and multiplication equations into one single equation where the Selector can activate or deactivate the multiplication or addition gates (depending on if its value is 0 or 1). The Selector polynomial improves the efficiency of our SNARK, and we can perform the verification with another zero test.

3. Verify the copy constraints
Once we have verified that the single gates operations have been performed correctly, we need to verify that the relationships between these gates are correct. In the previous step we have just verified a bunch of isolated gates: we still did not describe any meaningful circuit, as we didn’t connect any wire. To obtain a SNARK we need to wire the gates and make sure that the output of a gate is the input of another, and verify all these equalities. In other words, for every gate we need to make sure that its output value is “copied” into the input of the correspondent gate. Checking the relationships between all the gates is a tricky part for the construction of a universal SNARK.

Enforcing these Copy Constraints is a complex operation, and the solution that PLONK provides is the reason why it became a such a successful universal SNARK construction.

To check the copy constraints, PLONK applies a permutation on the indices of the gates and encodes the permutation vector into a polynomial. This Wiring polynomial performs a rotation to all the constraints ,and allows the Verifier to verify that the wiring is implemented correctly. This works, because when defining a polynomial that implements a rotation of all these equalities the invariance under rotation makes all these equalities satisfied. The wiring polynomial only depends on the circuit (and not on the inputs), and by having mapped the inputs and outputs via a permutation function, we can enforce a permutation check. This is a smart way to encode the wiring constraints in the circuit.

4. Verify the output
The Verifier needs to verify that the output of the last gate is 0, as this implies that the execution trace is valid.

Note: The reason why PLONK’s pre-processing does not require a trusted setup is because anyone can compute transparently the Selector and the Wiring polynomials, as there are no secrets involved in these commitments.


Wrapping it up
Let’s quickly recap what are the required steps when using PLONK to construct a SNARK:

Setup procedure. The Prover runs the setup procedure to pre-process the circuit by committing to the Selector and Wiring polynomials. Anyone can check that these polynomials were computed correctly, as the setup procedure is transparent.
The Prover encodes the computation trace of the circuit into a polynomial and commits to it.
The Prover sends the commitments to the Verifier
The Verifier evaluates the proof by checking that:
Inputs are correct. He does this by proving that a specific polynomial is identical to 0 on the set of inputs.
Gates are correct. He does this by proving that a specific polynomial is identical to 0 on the set of gates.
Wires are correct. He does this by proving that a specific polynomial is equal to 0 for a permutation-check.
The output of the circuit is equal to the output of the last gate, which is equal to 0.
The verifications of this last step correspond to three “0 tests” and one evaluation test. If successful, these checks convince the Verifier that the polynomial commitment provided by the Prover is the commitment to a valid computation trace. This implies that the prover has a valid witness such as that C(x,w) = 0.


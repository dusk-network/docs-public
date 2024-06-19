---
title: KZG
---

Using KZG as Polynomial Commitment Scheme
One of the Polynomial Commitment Scheme that is usually combined with the PLONK IOP is the KZG / Kate one. This PCS is quite fast and has interesting properties, but requires a trusted setup and pairings.

When running the setup procedure to obtain the global parameters we need to trust who ran the setup procedure to delete the toxic waste. KZG relies on a trusted setup, and Multi-Party Computation is often used in trusted setups so that the need for trust is minimized.

The Prover uses the global parameters to commit to the polynomial by using its coefficient form. The commitment is binding commitment but not hiding (as we have revealed some information about the polynomial).

Because the proof is the commitment to the quotient polynomial, the Prover needs to compute the quotient polynomial and commit to it. He commits to it by committing to a single group element, and this makes proof to have a constant size and not dependent on the degree of the polynomial. The fact that the proof size is constant (and does not depend on the circuit size), is the main reason why the KZG scheme is so popular.

The KZG scheme has also interesting proprieties:

We can generalize KZG to commit also to multivariate polynomials (polynomials with multiple variables), and not only univariate ones.
KZG supports batch proofs. If the Prover needs to commit to several polynomials, he can batch those proofs into a single group element (by opening multiple polynomials at multiple points).
KZG supports linear-time commitments. This means that the time for the Prover to commit to the polynomial is linear in the degree of the polynomials.

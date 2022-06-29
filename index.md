---
layout: index
math: 2
---

# About me

After studying mathematics and physics, I worked more specifically 
on the relationships between statistical physics, information theory 
and artificial intelligence. Now working on applying self-supervised learning 
to datasets of intracranial flux and pressure time series for the [revert] project, 
I am planning to spend more time developing a fast python library 
for simulating probabilistic graphical models, bayesian networks and hypergraph neural networks, it is available on github as [topos]. 


# Research interests

My PhD thesis
[Message Passing Algorithms and Homology][phd] is 
available here and on the [arXiv][arxiv-phd]. 
In this manuscript I show that probabilistic graphical 
models (also known as Markov random fields or energy based models) 
are endowed with a natural topological structure, inherited from the 
simplicial nerve of a covering 
$ \{ \mathrm{a, b} \dots \} \subseteq {\cal P}(\Omega)$ describing interacting or simultaneously observable variables. 

On the complex of local measures, a differential
operator 
$ d : C_{0}^* \to C_1^* \to \dots $ 
captures the marginal consistency of 
local beliefs $p \in C^*_{0}$ by the cocycle equation $dp = 0$. 

On the dual complex of local 
observables, the adjoint codifferential 
$\delta = d^*$ maps heat fluxes $\phi \in C_1$ onto interaction potentials $v = \delta \phi \in C_0$ whose global sum vanishes. 

The generalised belief propagation (GBP) algorithm of Yedidia _et al._, along with new message-passing schemes, 
are recovered by diffusion equations of the form 
$\frac {dh} {dt} = \delta \Phi(h)$ on interaction potentials 
$h \in C_0$ which hence preserve the global energy function (or opposite log-likelihood) $\tilde H = \sum_{\rm a} h_{\rm a}$. 

Stationary states of GBP and its regularisations are reached when the potential $h$ defines consistent beliefs
$p = \rho(H) = \rho(\zeta h)$ where the Gibbs state map (softmin) 
$\rho : C_0 \to C_0^*$ and the Dirichlet zeta transform 
$\zeta : C_0 \to C_0$ are given by: 

$$ \rho(H)_{\rm a} = 
\frac {\mathrm{e}^{-H_{\rm a}}} {\sum {\rm e}^{-H_{\rm a}}} 
\quad{\rm and}\quad 
\zeta(h)_{\rm a} = \sum_{\rm b \subseteq a} h_{\rm b}$$ 

GBP hence solves a difficult constraint satisfaction problem which consists of finding potentials at the intersection of an affine subspace $[h] = h + \delta C_1$ and the non-linear manifold ${\rm Fix} = (\rho \zeta)^{-1}({\rm Ker\:} d)$,
enforcing energy conservation and marginal consistency constraints respectively. 

<img src="bp/assets/pli.jpg"
    width="500px"
    alt="pli et cusp"> 

## References

- Yedidia, Freeman, Weiss (2001): _Bethe free energy, Kikuchi approximations, and belief propagation algorithms_, Technical report TR2001-16 Mitsubishi Electric Research Laboratories
- Yedidia, Freeman, Weiss, _Constructing Free Energy Approximations and Generalized Belief Propagation Algorithms_, 2005, IEEE Transactions of Information Theory (51)
- Kikuchi (1951)
- Morita (1957)
- Gallagher (1963)
- Pearl (1982)
- Knoll, Pernkopf 
- Mooij 
- Mézard, Montanari
- Sun

# Programming

I was a contributor of [geomstats], 
an open-source python library for Riemannian geometry in machine learning
built by a fantastic team of international collaborators. 

# Publications

- [Local Max-Entropy and Free Energy Principles solved by Belief Propagation][maxent], 2022 (preprint)
- [Belief Propagation as Diffusion][gsi21], 2021, Geometric Science of Information, Frederic Barbaresco and Frank Nielsen editors, Springer (proceedings of GSI 21).
- [Message-Passing Algorithms and Homology: from thermodynamics to statistical learning][arxiv-phd], 2020, Thèses, Université Paris Cité.
- [A Homological approach to Belief Propagation and Bethe Approximations][gsi19], 2019, Geometric Science of Information, Frederic Barbaresco and Frank Nielsen editors, Springer (proceedings of GSI 19).


[maxent]:https://404
[gsi21]:https://arxiv.org/abs/2107.12230
[gsi19]:https://arxiv.org/abs/1903.06088
[phd]:assets/bib/Peltre-Message_Passing_Algorithms_and_Homology.pdf

[arxiv-phd]:https://arxiv.org/abs/2009.11631

[geomstats]:https://github.com/geomstats/geomstats

[revert]:https://revert-project.org
[topos]:https://github.com/opeltre/topos

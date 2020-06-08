---
layout: page
math:   2
---

[bp]: /bp

## Background 

My scientific interests lie at the interface between 
mathematics, physics and computer science. 

Startled by the conceptual novelty of quantum physics and general relativity, 
I studied differential geometry, gauge theory and operator algebra, 
and through the beautiful work of authors like &Eacute;lie Cartan and J.M. Souriau, 
I came to love an uncelebrated field of science whose handful advocates 
call mathematical physics.
The broad curiosity of my PhD advisor however took me to still different places.

## Message-Passing Algorithms 

Providing with an asynchronous and parallelised computing 
scheme to perform statistical inference, 
message-passing algorithms have a wide variety of applications, 
from telecoms to statistical physics, neuroscience and artificial intelligence. 
The local structure of these algorithms, 
which closely reflects cellular interactions, lead us to a natural homology theory
where algebraic topology is applied to statistics.

The geometry of their equilibria, together with the optimisation problems they solve, 
become very reminiscent of harmonic analysis, 
were it not for a twist of combinatorics that brings in 
singularities, bifurcations and unstable equilibria. 

## Publications 

- __PhD thesis__: [Message Passing Algorithms and Homology][phd], 
    see [here][bp] for numerical experiments. 
    
    Message-passing algorithms are shown equivalent to transport equations 
    of the form $$ \dot u = \delta \Phi(u) $$,
    where $u$ is a collection of local interaction potentials, 
    $\Phi(u)$ represents a heat flux from one region to the other,
    and the boundary opeator $\delta$ is the discrete analog of a divergence. 

    These structures naturally occur in the context of classical and quantum 
    statistical physics, probabilistic graphical models and Boltzmann machines. 

- __SYCO'20__: [Homological Algebra for Message Passing Algorithms][syco]

    This is a short, 5 page-long resume I wrote for the SYCO conference, 
    which should have taken place at the end of march.
    Although dense, it may give a quick overview of 
    most of the results contained in the thesis. 
    It was intended for an audience familiar with homological algebra and 
    category theory.

- __GSI'19__:
[A Homological Approach to Belief Propagation and Belief Propagation][gsi]
    
    This is a first proof of the equivalence between critical points 
    of Bethe free energies and stationary states of message passing algorithms, 
    which I presented at the _Geometric Science of Information_ colloquium, 
    held in Toulouse last summer. (Published in the __GSI 19__ proceedings.)


[phd]:/assets/bib/Peltre-Message_Passing_Algorithms_and_Homology.pdf 
[syco]:/assets/bib/Peltre-Homological_Algebra_for_Message_Passing_Algorithms.pdf
[gsi]:https://arxiv.org/abs/1903.06088.pdf

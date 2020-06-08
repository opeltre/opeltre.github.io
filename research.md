---
layout: page
math:   2
---

## Numerical Simulations 

See [here][bp] for numerical experiments. 

[bp]: /bp

## Publications 

- __PhD thesis__: [Message Passing Algorithms and Homology][phd]
    
    Message-passing algorithms have a wide variety of applications, 
    from telecoms to thermodynamics and artificial intelligence. 
    Providing with an asynchronous and parallelised computing 
    scheme to perform statistical inference, their local structure
    closely reflects neuronal interactions. 

    This work unveils the algebraic topology underlying
    message-passing algorithms. 
    They are shown equivalent to transport equations of the form 
    $$ \dot u = \delta \Phi(u) $$,
    where $u$ is a collection of local interaction potentials, 
    and $\Phi(u)$ represents a heat flux from one region to the other. 
    The boundary operator $\delta$, discrete analog of a divergence, 
    is the degree one boundary of a natural homology theory 
    of interest for any localised approach to high dimensional statistics. 
    These structures hence naturally occur in the context of classical and quantum 
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

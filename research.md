---
layout: page
math:   2
---

[bp]: /bp

## Background 

My scientific interests lie at the interface between 
mathematics, physics and computer science. 

After undergraduate double-curriculum in mathematics and physics, 
I thoroughly studied differential geometry, gauge theory and operator algebra, 
mostly motivated by the conceptual novelty of quantum physics and general relativity. 

My doctoral research then focused on the relationships between 
algebraic topology and message-passing algorithms, allowing me 
to propose a clear picture of their geometric structure, 
various regularisations of their dynamic and a better understanding 
of their equilibria and singularities. 


## Message-Passing Algorithms 


## Publications 

- __PhD thesis__: [Message Passing Algorithms and Homology][phd], 
    see [here][bp] for numerical experiments. 
    
    Message-passing algorithms have a wide variety of applications, 
    from telecoms to statistical physics, neuroscience and artificial intelligence. 
    They consist of an asynchronous and parallelised computing 
    scheme where a collection of local units communicate until they eventually reach a consensual state, 
    and estimate the marginals of a probabilistic graphical model. 
    They for instance provide an alternative to *contrastive divergence* algorithms 
    in training Boltzmann machines. 

    Message-passing algorithms are shown equivalent to transport equations 
    of the form $$ \dot u = \delta \Phi(u) $$,
    where $u$ is a collection of local interaction potentials, 
    $\Phi(u)$ represents a heat flux from one region to the other,
    and the boundary opeator $\delta$ is the discrete analog of a divergence. 

- __Geomstats__ : 
[A Python Package for Riemannian Geometry in Machine Learning][geomstats]

    This paper presents a great library for differential geometry and statistics 
    I had the chance to work on with a fantastic team of 12 international contributors. 
    The github repo for geomstats is available [here][gs]. 
    
    (Submitted to the _Journal of Machine Learning Research_ 
    and presented at the _Scipy 2020_ conference) 

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
    held in Toulouse last summer. 
    
    (Published in the _GSI 19_ proceedings.)

[geomstats]:https://arxiv.org/abs/1805.08308
[gs]:http://github.com/geomstats/geomstats
[phd]:/assets/bib/Peltre-Message_Passing_Algorithms_and_Homology.pdf 
[syco]:/assets/bib/Peltre-Homological_Algebra_for_Message_Passing_Algorithms.pdf
[gsi]:https://arxiv.org/abs/1903.06088.pdf

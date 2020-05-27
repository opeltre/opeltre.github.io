---
name:   Singularities with Two Loops
order:  3
---

<!-- dom --> 
<script src="source/dom.js"></script> 
<script src="source/plot/view.js"></script>
<script src="source/plot/plot.js"></script> 

<!-- bp --> 
<script src="source/ising.js"></script> 
<script src="source/eight/eight.js"></script> 

# Equilibrium with Two Loops

Consider the system
$\Omega = \\{ i_+, j_+, k, i_-, j_- \\}$
of five binary variables,
interacting along  
two triangular loops $i_+ j_+ k$ 
and $i_-j_-k$ meeting in $k$. 

<div class="flex-h">
    <div id="figure"></div> 
    <img src="assets/surface.jpg"
        alt="stationary surface"
        width="300px">
</div>

The submanifold ${\cal Z} \subseteq A_0$ 
of consistent potentials, fixed by diffusion,
is not everywhere transverse to the image $\delta A_1 \subseteq A_0$ of heat fluxes. 
It may therefore happen that the homology class 
$[u] = u + \delta A_1$ of a potential $u \in A_0$ intersects the equilibrium
surface $\mathcal Z$ more than once.

## Singularities 

The singular subspace ${\cal S_1} \subseteq {\cal Z}$, 
along which $T {\cal Z} \cap \delta A_1$ is of dimension $1$,
is here a codimension $1$ analytic submanifold of ${\cal Z}$.

<div id="plot-Du"></div> 
<!--
<script src="source/eight/plot-DU.js"></script> 
-->
<script>
ajax().get('assets/plot-DU.json')
    .then(JSON.parse)
    .then(dom.plot);
</script> 

For every $u \in {\cal S_1}$, 
a unit flux term $\delta \varphi \in \delta A_1$ spans the intersection 
$T_u {\cal Z} \cap \delta A_1$ 
if it satisfies:

$$ \varphi_{jk \to k} = {\mathbb E_{jk}} \Big[
    \sum_{i \neq k} \varphi_{ij \to j} 
    \:\Big|\: k \Big] 
$$

We show that ${\cal S_1}$ is defined
by an eigenvalue equation of the form: 

$$
\Big( \Lambda^+ + \frac 1 3 \Big)\Big( \Lambda^- + \frac 1 3 \Big) = \frac 4 9 
$$



<div class="flex-h space center">
    <div id="field" class="grow"></div> 
    <div id="loops" class="grow"></div> 
    <div class="flex-v grow-2"> 
        <div class="flex-h space"> 
            <div id="weights-0"></div> 
            <div id="offsets-0"></div>
        </div> 
        <div class="flex-h space"> 
            <div id="weights-1"></div> 
            <div id="offsets-1"></div>
        </div> 
    </div> 
</div>

<div id='plot'></div> 


<!-- ====== js ====== -->

<!-- figure --> 
<script src="source/eight/figure.js"></script> 

<!-- controls --> 
<script src="source/controls/simplex.js"></script> 
<script src="source/controls/hexagon.js"></script> 
<script src="source/controls/hyperbola.js"></script>
<script src="source/controls/range.js"></script> 

<!-- app --> 
<script src="source/eight/main.js"></script> 


<!-- ====== style ====== --> 

<style> 
svg.simplex, svg.hexagon {
    width:  100px;
    height: 100px;
}
svg.hyperbola {
    width:  200px;
    height: 200px;
}
svg.range {
    width: 40px;
    height: 220px;
}

svg#eight {
    width:  500px;
    height: 500px;
}
</style> 

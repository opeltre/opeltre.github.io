---
layout: page
math: 2
---

# An Introduction to Functional Programming 

A category $\bf C$ is a collection $A, B, ...$
of objects together with a set of arrows: 

$$ {\mathbf C} (A, B) = {\mathrm {Hom}} (A, B) $$ 

for every objects $A$ and $B$. 

Functional programming is concerned with a category _types_ $\bf T$. 

Each object ${\tt a}$ of $\bf T$ represents a type of variables, 
and each arrow  ${\tt f : a \rightarrow b}$ in ${\rm Hom}({\tt a, b})$ 
is a program with input of type ${\tt a}$ and output of type ${\tt b}$. 

It happends that the set of programs ${\bf T}(\tt{a, b})$ from $\tt a$ 
to $\tt b$ is itself a type, denoted by ${\tt a \rightarrow b}$. 
This special property of ${\bf T}$ is characteristic of 
_cartesian_ categories.

Commutative diagrams!!

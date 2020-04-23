---
layout: default
math:   true
---

# Using Mathjax
along markdown parsers is a real pain... Let's try first:   

$$ a + b = c $$

which doesn't show, though: 

<div> 
$$ x + y + c $$
</div>

does yet:
- jekyll pretends to use kramdown by default
- kramdown pretends to understand and protect math blocks by default.  

:O

Final attempt: 
\$\$ f + g = h \$\$

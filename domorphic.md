---
layout: dompage
js:     true
title:  domorphic examples
lmargin: true
---

# The DOM naturally

Domorphic is a plain javascript program 
to shape the DOM in a functional, reactive 
and keep-it-simple philosophy. 

```js
let circle = dom('circle')
    .attr('transform', m => `translate(${m.x}, ${m.y})`)
    .pull(m => ({ 
        x: 20 * Math.cos(m.t) + 40, 
        y: 20 * Math.sin(m.t) + 40
    }))

let sample = n => [...Array(n)]
    .map(k => 2 * k * Math.PI / n); 

let svg = dom('svg')
    .branch(circle.map(m => m.ts))
    .pull(sample);

document.appendChild(svg(12));
```

Inspired by the power of [d3](http://github.com/d3)
and the beauty of [elm](http://elm-lang.org),
this library attempts to breed their many respective qualities,
so that shaping DOM interfaces within js 
may become smooth and enjoyable again. 


### domorphic by example 

{% for example in site.examples %}
- [{{example.name}}]({{example.url}}) 
{% endfor %}

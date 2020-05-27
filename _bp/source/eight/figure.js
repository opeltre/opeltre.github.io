(function () {

let nodes = {
    'i_+': {x: 66,  y: 50,   dx: -25,   dy: -10},
    'j_+': {x: 66,  y: 150,  dx: -25,   dy: -10},
    'k':   {x: 150, y: 100,  dy: -25},
    'i_-': {x: 234, y: 50,   dx: +10,   dy: -10},
    'j_-': {x: 234, y: 150,  dx: +10,   dy: -10}
},
    edges = ['i_+.j_+', 'i_+.k', 'j_+.k',
             'i_-.j_-', 'i_-.k', 'j_-.k'];

//--- View --- 

let vertex = dom('g')
    .attr('transform', m => `translate(${m.x} ${m.y})`)
    .branch([
        dom('circle', {r: 3}),
        dom.math
    ]);

let line = dom('polyline', {
    points: m => m.points, 
    stroke: "#000",
    'stroke-width': 1,
    svg: true
})
    .pull(ij => ({
        points: ij.split('.')
            .map(i => [nodes[i].x, nodes[i].y].join(' '))
            .join(', ')
    }));

//--- Append ---

let svg = dom('svg', {width: '300', height: '200'})();

_r.forEach((mi, i) => 
    svg.appendChild(
        vertex({...mi, html: `$${i}$`})
    )
)(nodes);

edges.forEach(ij => 
    svg.appendChild(line(ij))
);

document.querySelector('#figure')
    .appendChild(svg);

})(); 

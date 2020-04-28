// Pythagorean Tree

//--- Model ---

//  M : m 
let M = {
    depth : 9,
    step : 0,
    sign : 0,
};

//  grow : (+|-) -> m -> m 
let grow = sign => M => ({
    sign, 
    depth: M.depth,
    step: M.step + 1
});

//--- View ---

//  rect : m -> Node
let rect = dom('rect')
    .attr({x:-.5, y:-1.5, width: 1, height: 1})
    .style('fill', color);

//  tree : m -> Node
let tree = dom('g')
    .attr('transform', transform)
    .branch(M => M.step <= M.depth
        ? [
            dom.pull(grow(-1))(tree),
            dom.pull(grow(+1))(tree),
            rect
        ]
        : []
    );

//  svg : m -> Node
let svg = dom('svg')
    .append(tree)
    .attr('viewBox', '-3 -4.5 6 4')
    .attr('width', "350px")

//--- Output to the DOM ---

document.getElementById('app')
    .appendChild(svg(M));


//      *   *   *

//--- transform: m -> string ---

function transform (M) {
    return M.sign === 0 
        ? ""
        : [ 
            'translate(0 -1.5)',
            `matrix(.5 ${M.sign*.5} ${-M.sign*.5} .5 0 0)`,
        ].join(' ');
}

//--- color: m -> string ---

function color (M) {
    let start = [242, 236, 140],
        stop = [62, 170, 100],
        color = t => start.map(
            (_, i) => (1 - t) * start[i] + t * stop[i]
        );
    return `rgb(${color(M.step / M.depth)})`;
}

// Pythagorean Tree

let rect = dom('rect')
    .attr({x:-.5, y:-1.5, width: 1, height: 1});

let grow = sign => M => ({
    depth: M.depth - 1,
    sign
});

let tree = dom('g')
    .attr('transform', transform)
    .branch(M => M.depth >= 0 
        ? [
            dom.pull(grow(-1))(tree),
            dom.pull(grow(+1))(tree),
            rect
        ]
        : []
    );

let svg = dom('svg')
    .append(tree)

svg.attr('viewBox', '-3 -4.5 6 4')
    .attr('width', "350px")

document.addEventListener(
    'DOMContentLoaded', 
    () => svg.IO('put', '#app')({sign: 0, depth: 9})
);

function transform (M) {
    return M.sign === 0 
        ? ""
        : [ "translate(0 -1.5)",
            `matrix(.5 ${M.sign*.5} ${-M.sign*.5} .5 0 0)`,
        ].join(' ');
}


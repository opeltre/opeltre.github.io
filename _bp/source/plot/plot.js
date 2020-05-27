let colors = [
    '#d64', '#64d', '#4d6',
    '#d5e', '#5ed', '#ed5',
],
    color = i => colors[i % colors.length];

let plot = {}; 

//------ App ------ 

plot.app = dom.app()
    .on('start', st => st
        .reads(IO.put(plot.svg))
    )
    .on('refresh', (st, dm) => st
        .update(dm)
        .reads(m => __.logs('y range')(m.y))
        .reads(IO.replace(plot.svg, 'plot'))
    )
    .hook('json', (st, callback) => st
        .reads(JSON.stringify)
        .push(json => () => callback(json))
    );

//------ Model ------

let traces = 
    M => M.traces
        .map(view(M).linedata)
        .map((data, i) => ({
            data, 
            color: M.traces[i].color || color(i)
        }));
        
plot.model = {
    id:     'plot',
    size:   [600, 400],
    margin: [60, 60],
    fit:    false,
    x:      [0, 1],
    y:      [0, 4],
    log:    '',
    traces: [
        {y: __.linspace(0, 2).map(Math.exp)},
        {y: __.linspace(0, 2).map(t => 1 + t)}
    ],
    axis: {
        x: {label: 'x'},
        y: {label: 'y'}
    }
};

//------ Svg ------

//  .svg : Model -> Node 
plot.svg = dom('svg:plot')
    .attr('width', M => M.size[0] + 2 * M.margin[0])
    .attr('height', M => M.size[1] + 2 * M.margin[1])
    .put(m => m.id)
    .pull(m => m.fit ? view.fit(m.traces)(m) : m) 

//------ Traces ------ 

plot.graph = dom('g')
    .attr('transform', M => `translate(${M.margin[0]}, ${M.margin[1]})`)
   
plot.svg.append(
    plot.graph
)

//  .trace : TraceData -> Node
plot.trace = dom('polyline', {
    points: t => t.data,
    fill: 'none',
    stroke: t => t.color
});

//  .traces : Model -> Node
plot.traces = dom('g:traces')
    .pull(traces)
    .branch(dom.map(plot.trace));

plot.graph.append(
    plot.traces
);

//------ Layout ------

//  .frame : Model -> Node
plot.frame = dom('rect', {
    width: M => M.size[0],
    height: M => M.size[1],
    stroke: '#ccc',
    fill: 'none'
});

plot.graph.append(
    plot.frame
);

//====== Legends ====== 

plot.legends = dom('g')
    .style('font-family', 'mono')
    .style('font-size', '12px');

plot.xlegend = dom(`g.x-axis`)
    .attr('transform', M => `translate(${M.margin[0]}, ${M.margin[1] + M.size[1]})`);

plot.ylegend = dom(`g.y-axis`)
    .attr('transform', M => `translate(0, ${M.margin[1]})`);

plot.svg
    .append(plot.legends);

plot.legends
    .append(plot.xlegend, plot.ylegend);

//------ x ------

plot.xaxis = dom('line')
    .attr('stroke', '#000')
    .attr('x2', M => M.size[0])
    .attr('y2', 0);

plot.x0 = dom('text')
    .attr('dominant-baseline', 'hanging')
    .attr('y', 3)
    .html(M => M.x[0].toExponential(1))

plot.x1 = dom('text')
    .attr('dominant-baseline', 'hanging')
    .attr('text-anchor', 'end')
    .attr('x', M => M.size[0])
    .attr('y', 3)
    .html(M => M.x[1].toExponential(1));

plot.xlabel = dom('g', {
    transform: M => `translate(${M.size[0]/2} 10)`
        + `scale(1.2 1.2)` 
}, [
    dom.pull(M => ({
        html: M.axis.x.label 
    }))
    (dom.math)
]);

plot.xlegend
    .append(plot.xaxis, plot.x0, plot.x1, plot.xlabel)


//------ y ------

plot.yaxis = dom('line')
    .attr('stroke', '#000')
    .attr('x1', M => M.margin[0])
    .attr('x2', M => M.margin[0])
    .attr('y2', M => M.size[1]);

plot.y0 = dom('text')
    .attr('text-anchor', 'end')
    .attr('x', M => M.margin[0] - 3)
    .attr('y', M => M.size[1])
    .html(M => M.y[0].toExponential(1));

plot.y1 = dom('text')
    .attr('dominant-baseline', 'hanging')
    .attr('text-anchor', 'end')
    .attr('x', M => M.margin[0] - 3)
    .html(M => M.y[1].toExponential(1));

plot.ylabel = dom('g', {
    transform: M => `translate(${M.margin[0]/2} ${M.margin[1]/3})`
}, [
    dom.pull(M => ({
        html: M.axis.y.label,
        width: 200
    }))
    (dom.math)
]);
plot.ylegend
    .append(plot.yaxis, plot.y0, plot.y1);


//====== Head ====== 

plot.head = dom('g.plot-head');

plot.head
    .append(plot.ylabel); 

plot.svg.append(plot.head);

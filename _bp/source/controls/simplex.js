let simplex = (function () {

let unit = {}; 

//  .model : Model
unit.model = {
    weights:[1/3, 1/3, 1/3],
    epsilon:    0.01,
    scale:  1,
    points: [[-1, 0], [1, 0], [0, 2 * Math.sin(Math.PI / 3)]]
        .map(_R.scale(5))
};

//  .emit : Model -> Submodel 
unit.emit = m => m.weights;

//  .drag : (Num, Num) -> Model -> St(Model, IO(e))
unit.drag = (x, y) => m => {
    let ws = weights([x, y], m); 
    return ws.filter(w => w < m.epsilon).length
        ? State().return(IO())
        : State()
            .streamline({x, y})
            .streamline({weights: m => weights([x, y], m)})
            .reads(IO.set(unit.dot))
}; 

//  .svg : Model -> Node
unit.svg = dom('svg.simplex')
    .attr('viewBox', "-6 -2 12 12")
    .attr('transform', m => `scale (${m.scale} ${m.scale})`)

unit.dot = dom('circle:dot', {
    cx: m => m.pos[0],
    cy: m => m.pos[1],
    fill: '#199',
    r:  m => 0.3 / m.scale
})
    .pull(_r.streamline({
        pos: m => _R.span(m.weights, m.points)
    }))


//------ View ------ 

let triangle = dom('path', {
    d: M => 'M ' + M.points.map(P => P.join(' ')).join(' L ') + ' Z',
    stroke: 'none',
    fill: '#199',
    'fill-opacity': 0.3,
    stroke: '#199',
    'stroke-width': m => 0.1 / m.scale
}) 

unit.svg.append(triangle, unit.dot)

return unit; 

function weights ([x, y], M) {
    let P = M.points,
        [X, Y] = _R.subt([x, y], P[0]),
        B = P.slice(1).map(Pi => _R.subt(Pi, P[0])),
        det = B[0][0] * B[1][1] - B[0][1] * B[1][0];
    let w1 = (B[1][1] * X - B[1][0] * Y) / det,
        w2 = (- B[0][1] * X + B[0][0] * Y) / det,
        w0 = 1 - w1 - w2;
    return [w0, w1, w2];
}
        
})(); 

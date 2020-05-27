let hexagon = (function () {

//------ Unit ------
    
let unit = {}; 

unit.model = {
    weights:    [1/3, 1/3, 1/3],
    fields:     [0, 0], 
    epsilon:    0.01
} 

unit.emit = m => m.fields;

let constraints = (fields, weights) => 
    Math.abs(fields[1] - fields[0]) < weights[2]
    && Math.abs(fields[0]) < weights[0]
    && Math.abs(fields[1]) < weights[1];

unit.drag = (x, y) => m => 
    constraints([x, y], m.weights)
        ? State()
            .streamline({fields: [x, y]})
            .reads(IO.set(unit.dot))
        : State().return(IO())

unit.svg = dom('svg.hexagon', {
    viewBox: "-1 -1 2 2",
    transform:  "matrix(1 0 0 -1 0 0)"
})

unit.dot = dom('circle:dot', {
    cx: m => m.fields[0],
    cy: m => m.fields[1],
    fill: '#c26',
    r:  0.045
})

//------ View ------ 

let polygon = dom('path', {
    d: m => 'M ' + path(m.weights).map(P => P.join(' ')).join(' L ') + ' Z',
    stroke: 'none',
    fill: '#c26',
    'fill-opacity': 0.3,
    stroke: '#c26',
    'stroke-width': 0.02
}) 

unit.svg.append(polygon, unit.dot)

return unit; 

//------ Region ------ 

function path ([w0, w1, w2]) {
    if (w0 < 1/2 && w1 < 1/2 && w2 < 1/2) 
        return [[-w0, -w1], [-w1 + w2, -w1], [w0, w0 - w2], 
                [w0, w1], [w1 - w2, w1], [-w0, -w0 + w2]];
    if (w2 >= 1/2) 
        return [[-w0, -w1], [-w0, w1],
                [w0, w1], [w0, -w1]];
    if (w0 >= 1/2) 
        return [[-w1 - w2, -w1], [-w1 + w2, -w1],
                [w1 + w2, w1], [w1 - w2, w1]];
    if (w1 >= 1/2) 
        return [[-w0, -w0 -w2], [w0, w0 - w2],
                [w0, w0 + w2], [-w0, -w0 + w2]];
}

})(); 

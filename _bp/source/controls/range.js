let range = (function () {

let Y = 10 - 1e-8, 
    alpha = 10;

//------ Unit ------

let unit = {}; 

unit.model = {
    value:  0,
    pos:    0
};

unit.emit = m => m.value;

unit.drag = (x, y) => m => 
    Math.abs(y) < Y
        ? State()
            .streamline({
                pos:    y,
                value:  - alpha * Math.atanh(y/Y)
            })
            .reads(IO.set(unit.dot))
        : State().return(IO());

unit.svg = dom('svg.range', {viewBox: "-2 -11 4 22"})

unit.dot = dom('circle:point', {
    cx: 0,
    cy: m => m.pos,
    fill: '#c26',
    r:  0.3
})

//------ View ------ 

let range = dom('polyline', {
    points: '0 -10, 0 10',
    stroke: '#c26',
    fill:   'none',
    'stroke-width': 0.1
}) 

unit.svg.append(range, unit.dot)

return unit;

})(); 

let hyperbola = (function () {

let Y = 1/2,
    sq2 = Math.sqrt(2),
    R = 2/3,
    x = y => R * Math.cosh(Math.asinh(y / R)) - R / 2;

let values = ([x, y]) => [(x + y), (x - y)]

//------ Unit ------

let unit = {}; 

unit.model = {
    values: [1/3, 1/3],
    path: __.linspace(-Y, Y, 30)
        .map(y => [x(y), y]),
    pos:    [1/3, 0]
};

unit.emit = m => m.values;

unit.drag = (_, y) => m => 
    Math.abs(y) < Y
        ? State()
            .streamline({
                pos: [x(y), y], 
                values: () => values([x(y), y])
            })
            .reads(IO.set(unit.dot))
        : State().return(IO())

unit.svg = dom('svg.hyperbola', {
    viewBox: "-1 -1 2 2",
    transform:  "matrix(1 0 0 -1 0 0)"
})

unit.dot = dom('circle:dot', {
    cx: m => m.pos[0],
    cy: m => m.pos[1],
    fill: '#348',
    r:  0.03
})

//------ View ------ 

let path = dom('path', {
    d: m => 'M ' + m.path.map(P => P.join(' ')).join(' L '),
    fill: 'none',
    stroke: '#348',
    'stroke-width': 0.01
}) 

let square = dom('path', {
    d: 'M -1 0 L 0 -1 L 1 0 L 0 1 Z',
    fill: '#fc5', 
    'fill-opacity': 0.2,
    stroke: '#fc5',
    'stroke-width': 0.01
});

unit.svg.append(square, path, unit.dot)

return unit;

})(); 

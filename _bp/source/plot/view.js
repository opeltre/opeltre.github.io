/*------ View ------
 
    Transform 2D coordinates to viewport, 
    with linear or log scales. 
    
    Model = {
        x:      (Num, Num),
        y:      (Num, Num),
        scale:  Maybe (Num, Num),
        size:   (Num, Num)
        log:    String
    }

    Trace = {x: [Num], y: [Num]}
*/ 

function view (M) {

    let my = {};

    let [x0, x1] = M.x,
        [y0, y1] = M.y,
        [sx, sy] = M.scale || scale(M.x, M.y, M.size),
        [w, h] = M.size || [400, 400],
        log_axes = M.log || '';
    
    //.X : Num -> Num
    my.X = /x/.test(log_axes) 
        ? x => sx * (Math.log(x) - Math.log(x0))
        : x => sx * (x - x0);

    //.Y : Num -> Num
    my.Y = /y/.test(log_axes)
        ? y => sy * (Math.log(y1) - Math.log(y))
        : y => sy * (y1 - y);

    //.point : [Num, Num] -> [Num, Num]
    my.point = 
        ([x, y]) => [my.X(x), my.Y(y)];

    //.trace : Trace -> Trace 
    my.trace = 
        ({x, y}) => ({
            x: __.map(my.X)(x ? x : __.linspace(x0, x1, y.length)),
            y: __.map(my.Y)(y)
        });
    
    //.linedata : Trace -> String
    my.linedata = __.pipe(
        my.trace,
        ({x, y}) => __.map2((xi, yi) => `${xi} ${yi}`)(x, y).join(', ')
    );

    function scale ([x0, x1], [y0, y1], [w, h]) {
        return [ 
            w / (M.x.log ? (Math.log(x1) - Math.log(x0)) : (x1 - x0)),
            h / (M.y.log ? (Math.log(y1) - Math.log(y0)) : (y1 - y0))
        ];
    }

    return my;
}

//  .fit : [Trace] -> Model -> Model
view.fit = traces => {
    let minmax = axis => traces => 
        [Math.min, Math.max].map(m => m(
            ...traces
                .map(__.r.get(axis))
                .map(__.xargs(m))
        ));
    let margin = r => ([x0, x1]) => 
        [x0 - r * (x1 - x0), x1 + r * (x1 - x0)];
    let fit = axis => __(minmax(axis), margin(0.01));
    return __.r.update(
        !traces.filter(t => !t.x).length
            ? ({x: fit('x')(traces), y: fit('y')(traces)})
            : ({y: fit('y')(traces)})
    )
}

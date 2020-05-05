let n = 10,
    dt = 0.05,
    ds = 0.05,
    f = Math.sqrt(3) * Math.PI,
    IO = dom.IO;

//  samples : Int -> [Num]
let samples = k => [...Array(n)]
    .map((_, i) => 2 * i * Math.PI / n)
    .map(t => t + k * dt);

//--- View ---

//  circle : Num -> Node
let circle = dom('circle').place('circle')
    .attr('r', 4)
    .attr('transform', m => `translate(${m.x}, ${m.y})`)
    .style('transition', `transform ${ds}s`)
    .pull(t => ({ 
        x: (30 + 12 * Math.cos(f * t)) * Math.cos(t), 
        y: (30 + 12 * Math.cos(f * t))* Math.sin(t) 
    }));

//  circles : [Num] -> [Node]
let circles = dom.map(circle);

//  svg : Int -> Node
let svg = dom('svg').put('#app')
    .attr('width', 150)
    .attr('height', 150)
    .attr('viewBox', "-50 -50 100 100")
    .branch(circles)
    .pull(samples);

//--- Update ---

//  tick : Int -> IO(Int)
let tick = k => {
    return IO()
        .return(k)
        .push(samples)
        .bind(IO.map.set(circles))
        .return(k + 1);
}

//  loop : Int -> IO(Num) 
let loop = k => tick(k).sleep(ds).bind(loop);

//--- Main ---

//  io : IO(Int) 
let io = IO.put(svg)(0).bind(loop);

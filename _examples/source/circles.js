let n = 16,
    dt = 0.01,
    ds = 0.02,
    f = Math.sqrt(3) * Math.PI ;

let IO = dom.IO;

let circle = dom('circle').place('circle')
    .attr('r', 5)
    .attr('fill', '#418')
    .attr('transform', m => `translate(${m.x}, ${m.y})`)
    .style('transition', `transform ${ds}s`)
    .pull(t => ({ 
        x: (30 + 12 * Math.cos(f * t)) * Math.cos(t), 
        y: (30 + 12 * Math.cos(f * t))* Math.sin(t) 
    }))

let circles = circle.map(); 

let sample = n => [...Array(n)]
    .map((_, i) => 2 * i * Math.PI / n); 

let svg = dom('svg').put('#app')
    .attr('width', 100)
    .attr('height', 100)
    .attr('viewBox', "-50 -50 100 100")
    .branch(circles)
    .pull(sample);


let tick = k => {
    let ts = sample(n).map(t => t + k * dt),
        io = circles.IO('set')(ts);
    return io.return(k + 1);
}

let loop = k => tick(k).sleep(ds).bind(loop);
    
let io = svg.IO('put')(n).bind(loop);


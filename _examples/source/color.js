//--- Hexadecimal Color Picker ---

let IO = dom.IO,
    state = dom.state;

//--- Initial Model ---

let M = {
    color:  '#a25',
    regex:  /^([0-9|[a-f]){3}$/,
    size:   ['150px', '150px'],
    put:    '#app'
};

//--- View ---

//  app : m -> Node
let app = dom('div')
    .put(m => m.put);

//  view : m -> Node
let view = dom('div')
    .place('view')
    .style('background-color', m => m.color)
    .style('width', m => m.size[0])
    .style('height', m => m.size[1]);

//  input : m -> Node(e)
let input = dom('input')
    .style('width', m => m.size[1])
    .attr('placeholder', m => m.color.slice(1))
    .on('keyup', (e, io, m) => {
        let color = e.target.value;
        if (m.regex.test(color)) 
            io.send('#' + color);
    });

app.append(view, input);

//--- Update ---

//  update : e -> IO(e)
let update = e => e === 'start'
    ? state()
        .reads(IO.put(app))
    : state()
        .set('color', e)
        .reads(IO.replace(view))

//--- Main ---

//  main : (e, m) -> IO(e)
let main = (e0, m0) => {
    let [io, m1] = update(e0).run(m0);
    return io.await()
        .bind(e1 => main(e1, m1));
};

//  io : IO(e)
let io = main('start', M);

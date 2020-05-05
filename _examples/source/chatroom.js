let _r = __.record(),
    IO = dom.IO;

//    : Model 
let M = {
    user:   'alice',
    msgs:   [],
    input:  ''
}

//  read : Model -> [Msg] 
let read = M => M.msgs
    .map(_r.set('user', M.user));

//  send : Model -> Msg
let send = M => ({
    sender: M.user,
    date:   Date.now(),
    body:   M.input
});


//------ Server ------ 

let server = {};

//    .msgs : [Msg] 
server.msgs = [{
    sender: 'alice',
    date:   0,
    body: 'I love you Bob'
}];

//    .clients : [IO(e)] 
server.clients = [];

//    .post : Msg -> ServerEffect
server.post = msg => {
    server.msgs.push(msg);
    server.clients.forEach(
        io => io.channel('msg', msg)
    );
}

//    .join : User -> ServerEffect
server.join = user => server.clients.push(
    client(user, server)
);


//------ Client ------

//  client : (User, Server) -> IO(e) 
let client = (user, server) => 
    client.app.start({
        user,
        msgs:   server.msgs,
        input:  ''
    });

//    .app : e -> State(Model, IO(e))
client.app = dom.app()
    .on('start', st => st
        .reads(IO.put(view.main))
    )
    .on('input', (st, text) => st
        .set('input', text)
        .return(IO())
    )
    .on('msg', (st, msg) => st
        .streamline({msgs: M => [...M.msgs, msg]})
        .reads(read) 
        .push(IO.map(view.msg).put([-1]))
    )
    .on('send', st => st
        .set('input', '')
        .reads(IO.replace(view.input))
    )
    .hook('send', st => st
        .reads(send)
        .push(msg => () => server.post(msg))
    );


//------ View ------ 

let view = {};

//  .msg : Msg -> Node
view.msg = dom(':msg > msgs', [
    ['.msg-head', [
        ['.sender', {
            html: m => m.sender === m.user ? 'you say:' : m.sender + ' says:'
        }],
        ['.date', {html: m => `on 1 Jan. 1970 and ${m.date} ms`}]
    ]],
    ['.msg-body', {
        html: m => m.body,
        class: m => m.sender === m.user ? 'sent' : 'received'
    }]
]);

//  .msgs : Model -> [Node]
view.msgs = dom(':msgs')
    .pull(read)
    .branch(dom.map(view.msg))

//  .input : Model -> Node
view.input = dom(':input', [
    ['textarea', {
        onkeyup: (e, io) => io.channel('input', e.target.value)
    }],
    ['button', {
        html: 'Send',
        onclick: (e, io) => io.channel('send')
    }]
]);

//  .main : Model -> Node 
view.main = dom('.chat')
    .append(view.msgs, view.input)
    .put(M => '#' + M.user);


//------ Start a romance ------

['alice', 'bob'].forEach(server.join); 

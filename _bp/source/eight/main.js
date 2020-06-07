let main = {};

main.model = {
    'field':        0,
    'loops':        [1/3, 1/3],
    'weights-0':    [1/3, 1/3, 1/3],
    'weights-1':    [1/3, 1/3, 1/3],
    'offsets-0':    [0, 0],
    'offsets-1':    [0, 0]
};

main.params = m => {
    let Bk = m['field'],
        [Ci, Cj] = m['offsets-0'].map(C => C + Bk),
        [ci, cj] = m['offsets-1'].map(c => c + Bk),
        [L, l] = m['loops'],
        [Cik, Cjk, Cij] = m['weights-0'].map(C => - C * Math.log(L)),
        [cik, cjk, cij] = m['weights-1'].map(c => - c * Math.log(l));
    return {
        'k': Bk,
        'i+': Ci,       'j+': Cj, 
        'i-': ci,       'j-': cj,
        'i+.k': Cik,    'j+.k': Cjk,    'i+.j+': Cij,
        'i-.k': cik,    'j-.k': cjk,    'i-.j-': cij
    };
}

//------ Main App ------ 

main.app = dom.app();  

_r.forEach((_, name) => main.app
    .on(name, (st, value) => st
        .set(name, value)
        .return(IO())
    )
)(main.model);

['0', '1'].forEach(i => main.app
    .hook(`weights-${i}`, st => st
        .get(`weights-${i}`)
        .push(ws => () => units[`offsets-${i}`]
            .channel('refresh', {weights: ws, fields: [0, 0]})
        )
    )
);

main.app
    .hook('loops', (st, Ls) => {
        let scale = L => (L + 1)/2
            //Math.min(1, Math.max(3 * L, 0.4));
        return st.return(() => 
            Ls.forEach((Li, i) => units[`weights-${i}`]
                .channel('refresh', {scale: scale(Li)})
            )
        );
    });

main.app
    .hook('dragend', st => st
        .reads(main.params)
        .push(Eight.p)
        .push(main.show)
        .push(h => () => console.log(h))
    )

document.addEventListener('DOMContentLoaded', 
    () => main.io.channel('dragend')
);

main.show = p => {
    let phi = Eight.eigflux(p),
        U = Eight._log(p),
        V = __(Eight.codiff(1), Eight.zeta(0))(phi);
    let ts = [-2, 2],
        Us = ts.map(t => Eight.span([1, t], [U, V]));
    let Uts = __.map(
        Eight.integrate(Eight.tau_zeta, 0.5, 25),
    )(Us);
    let ys = __.map(
        __.map(Eight.Deff, Eight.norm)
    )(Uts);
    let traces = ys.map(y => ({y}));
    main.plot.channel('refresh', {traces});
};
            
main.io = main.app.start(main.model);

main.plot = plot.app.start(
    _r.assign({
        id: '#plot', 
        fit: true,
        axis: {
            x: {label: "$t$"},
            y: {label: "$||\\mathcal{D}(U_t) ||$"}
        }
    })(plot.model)
);

//------ Units ------ 

main.unit = (unit, id) => {

    unit.svg
        .push(IO.drag);

    unit.dot
        .on('drag', (e, io, m) => 
            io.channel('drag', [e.detail.x, e.detail.y])
        )
        .on('dragend', (e, io, m) => 
            io.channel('dragend')
        );

    return dom.app()
        .on('start', st => st
            .reads(IO.put(unit.svg, `#${id}`))
        )
        .on('refresh', (st, m) => st
            .streamline(m)
            .reads(IO.replace(unit.svg, `#${id} svg`))
        )
        .on('drag', (st, [x, y]) => st
            .reads()
            .bind(unit.drag(x, y)) 
        )
        .hook('drag', st => st
            .reads(unit.emit)
            .push(dm => () => main.io.channel(id, dm))
        )
        .hook('dragend', st => st
            .return(() => main.io.channel('dragend'))
        )
        .start(unit.model);
};

let units = _r.map(main.unit)({
    'field':        range,
    'loops':        hyperbola,
    'weights-0':    simplex, 
    'offsets-0':    hexagon,
    'weights-1':    simplex,
    'offsets-1':    hexagon
});

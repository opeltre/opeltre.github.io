dom.plot({
    id: '#plot-Du',
    fit: true,
    axis: {
        x:  {label: "$t$"},
        y:  {label: "$|\\mathcal{D}(U_t)|$"}
    },
    traces: (() => {
        let ps = __.linspace(-2, 0, 10) 
            .map(t => Eight.compute(0)(
                a => [1, t, Math.log(3)/3][a[0].length]
            ))
            .map(Eight.p);
        let phis = ps
            .map(Eight.eigflux);
        let Us = ps 
            .map(Eight._log);
        let Vs = __.map2(
            (U, phi) => Eight.add(U, Eight.zeta(0)(Eight.codiff(1)(phi)))
        )(Us, phis); 
        let paths = Vs
            .map(Eight.integrate(Eight.tau_zeta, 0.5, 35));
        let ys = paths.map(
            __.map(__(Eight.Deff, Eight.norm))
        );
        return [
            ...ys.map(y => ({y, color: '#43a'}))
        ];
    })()
}).channel('json', console.log);

dom.plot({
    id: '#plot-Ut-U',
    fit: true,
    size: [600, 300],
    axis: {
        x:  {label: "$t$"},
        y:  {label: "$||U_t - U||$"}
    },
    traces: (() => {
        let ps = __.linspace(-2, 0, 10) 
            .map(t => Eight.compute(0)(
                a => [1, t, Math.log(3)/3][a[0].length]
            ))
            .map(Eight.p);
        let phis = ps
            .map(Eight.eigflux)
            .map(Eight.scale(0.1));
        let Us = ps 
            .map(Eight._log);
        let us = Us.map(Eight.mu(0))
        let Vs = __.map2(
            (U, phi) => Eight.add(U, Eight.zeta(0)(Eight.codiff(1)(phi)))
        )(Us, phis); 
        let paths = Vs
            .map(Eight.integrate(Eight.tau_zeta, 0.2, 35));
        let ys = paths.map(
            (Ui, i) => __.map(
                Eight.mu(0),
                ut => Eight.subt(ut, us[i]),
                Eight.norm
            )(Ui)
            // __.map(__(Eight.Deff, Eight.norm))
        );
        return [
            ...ys.map(y => ({y, color: '#a34'}))
        ];
    })()
}).channel('json', console.log);

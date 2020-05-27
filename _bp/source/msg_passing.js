let _alg = __.alg,
    _top = __.top,
    _R = _alg.R,
    _r = __.record();

let {cell, chain} = _top.id;

let capClosure = 
    Y => _top.set.capClosure(Y.map(cell));

function complex (X) {

    let N = _top.nerve(X);

    let E = i => [-1, 1];
        A = _alg.tensor.functor(E),
        _R = _R;

    let K = _top.complex(A, X);

    K._log = K.map(_R._log);

    K.freeEnergy = H => K.int(K.compute(0)(
            a => N.c(chain.id(a)) * _R.freeE(K.get(H, a))
    ))

    K.Deff = 
        U => K.compute(1)(
            ([a, b]) => A.subt(
                U[chain.id([b])], 
                _R.effE(a, b)(U[chain.id([a])])
            )
        );

    K._Deff = 
        __.pipe(K.Deff, K.scale(-1));

    K.nabla = 
        p => U => K.compute(1)(
            ([a, b]) => A.subt(
                K.get(U, [b]),
                K.expect(p)(a, b)(K.get(U, [a]))
            )
        );

    K.expect = 
        p => (is, js) => u_is => A.div(
            A.func(is, js)(A.mult(K.get(p, [is]), u_is)),
            A.func(is, js)(K.get(p, [is]))
        );

    K.normalise = 
        K.map(Ha => {
            let Fa = _R.freeE(Ha);
            return _R.map(y => y - Fa)(Ha);
        });

    
    K.integrate = 
        (dx, dt, t) => x0 => {
            let xs = [...Array(Math.floor(t/dt))];
            xs[0] = x0;
            __.range(Math.floor(t/dt) - 1)
                .forEach(
                    i => xs[i+1] = K.add(xs[i], K.scale(dt)(dx(xs[i])))
                );
            return xs;
        };

    K.Phi = __.pipe(K.zeta(0), K._Deff);
    K.Tau = __.pipe(K.Phi, K.codiff(1));
    K.TauN = __.pipe(K.zeta(0), K.normalise, K._Deff, K.codiff(1));

    K.phi = __.pipe(K.Phi, K.mu(1));
    K.tau = __.pipe(K.phi, K.codiff(1));

    K.tau_zeta = __.pipe(K._Deff, K.mu(1), K.codiff(1), K.zeta(0));

    K.isingPotentials = 
        (B, J) => {
            let hs = [ 
                0,
                A.compute('i')(xi => B * xi),
                A.compute('i.j')((xi, xj) => J * xi * xj)
            ];

            return K.compute(0)(__.pipe(
                a => chain.cell(a).length,
                n => hs[n]
            ));
        };
        

    K.gaussian = 
        (k, sigma=1) => K.scale(sigma)(
            K.compute(k)(
                a => A.compute(chain.cell(a))(gaussian)
            )
        );

    K.gaussianPotentials = 
        sigma => K.gaussian(0, sigma);

    K.gaussianMessages = 
        sigma => K.gaussian(1, sigma);

    //------ interaction decomposition for binary graphs ------

    K.Z = 
        u => K.compute(0)(
            ([b]) => [[b, b], ...N.cofaces(0)([b])]
                .map(([a, b]) => K.Z.proj(a, b)(K.get(u, [a])))
                .reduce(A.add2)
        );

    K.Z.basis = 
        a => [
            1,
            [1, -1], 
            [[1, -1], [-1, 1]]
        ][a.length];

    K.Z.scalar = 
        (a, b) => ua => (1 / (2 ** a.length)) * 
            A.inner(ua, A.cofunc(a, b)(K.Z.basis(b)));

    K.Z.proj = 
        (a, b) => ua => A.scale(K.Z.scalar(a, b)(ua))(K.Z.basis(b));


    let convolve = 
        psi => u => K.compute(0)(
            ([a]) => [[a, a], ...N.cofaces(1)([a])]
                .map(
                    ([a, b]) => A
                        .scale(psi(a, b) * 2 ** (b.length - a.length))(
                            A.cofunc(a, b)(K.get(u, [b]))
                        )
                )
                .reduce(A.add2)
        );

    K.Z.zeta = convolve((a, b) => 1);
    
    K.Z.mu = convolve((a, b) => N.mu(a, b));

    K.Z.toCoeffs = __.pipe(
        K.Z, 
        K.map((ua, a) => K.Z.scalar(cell(a), cell(a))(ua))
    );

    K.Z.fromCoeffs = c => K.compute(0)(
        ([a]) => A.scale(K.get(c, [a]) || 0)(K.Z.basis(a))
    );
    
    
    return K;
}

let gaussian = 
    (sigma=1) => {
        let u = Math.random(),
            v = Math.random();

        return sigma 
            * Math.sqrt(-2 * Math.log(u)) 
            * Math.cos(2 * Math.PI * v);
    };

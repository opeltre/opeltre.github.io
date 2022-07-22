let vertices = ['i+', 'j+', 'k', 'i-', 'j-'],
    outerVertices = ['i+', 'j+', 'i-', 'j-'],
    innerEdges = ['i+', 'j+', 'i-', 'j-'].map(s => s + '.k'),
    outerEdges = ['i+.j+', 'i-.j-'],
    edges = [...innerEdges, ...outerEdges];

let X = ['', ...vertices, ...edges].map(cell),
    N = _top.nerve(X);

let Eight = complex(X);

//   .p_sym : Num -> P_0(X)
Eight.p_sym = (L1=1/3) => {
    let L2 = (4/9) / (L1 + 1/3) - 1/3,
        [lambda1, lambda2] = [L1, L2].map(L => L ** (1 / 3)),
        p_i = [1/2, 1/2];
    let p_ij = ([i, j]) => Ising.p_ij(
        p_i, p_i, i[1] === '+' ? lambda1 : lambda2
    );
    return Eight.compute(0)(
        ([a]) => [() => 1, () => p_i, p_ij][a.length](a)
    );
}

//   .loopvals : P_0(X) -> (Num, Num) 
Eight.loopvals = p => 
    [['i+.j+', 'j+.k', 'i+.k'], ['i-.j-', 'j-.k', 'i-.k']]
        .map(as => as
            .map(a => Eight.get(p, a))
            .map(Ising.eigval)
            .reduce((x, y) => x * y)
        );

//   .isSingular : P_0(X) -> Bool 
Eight.isSingular = (p, tol=1e-15) => {
    let [L1, L2] = Eight.loopvals(p);
    return Math.abs((L1 + 1/3) * (L2 + 1/3) - 4/9) < tol;
}

/*------ Consistent Probabilities ------ 
    
    Parametrise the space of consistent statistical fields
    by local magnetic fields and couplings

    Parameters: s : {Num}
    ----------
        s_i : Num 
            Magnetic field: p_i = [exp(-s_i)]
        s_ij : Num
            Coupling: exp(-s_ij) is the eigenvalue 
            of the conditional expectation operator 
            p_ij : A_i -> A_j

    Returns: p : P_0(X)   
    -------
*///---

//   .p : R_0(X) -> P_0(X)
Eight.p = r => {
    let p = Eight.zero(0); 
    Eight.set(p, '', 1);
    vertices.forEach(i => {
        Eight.set(p, i, _R.gibbs([r[i], -r[i]]));
    });
    edges.forEach(ij => {
        let [i, j] = ij.split('.');
        Eight.set(p, ij, Ising.p_ij(p[i], p[j], Math.exp(-r[ij])));
    });
    return p;
}

/*------ Singular Flux ------
    
    Returns the eigenflux associated to the largest
    eigenvalue of the << Kirchhoff >>-operator: 
        
        M(phi) = Lambda * phi 

    where M(phi) = phi defines a singular flux. 

*///------ 

//   .eigflux : P_0(X) -> A_1(X)  
Eight.eigflux = p => {

        let phi = Eight.zero(1), 
            [L1, L2] = Eight.loopvals(p),
            Delta = (L2 - L1)**2 + 16 * L2 * L1,
            a2 = (L2 - L1 + Math.sqrt(Delta)) / (4 * L1);

        phi = Eight.zero(1);

        let is = ['i+', 'i-', 'j+', 'j-'],
            vecs = _r.compute(i => Ising.eigvec(p[i]))(vertices),
            vals = _r.compute(e => Ising.eigval(p[e]))(edges);
        
        is.forEach(i => {
            let a = i[1] === '+' ? 1 : a2, 
                psi_ik = Ising.scale(a)(vecs['k']);
            Eight.set(phi, `${i}.k > k`, psi_ik);
        });

        is.forEach(i => {
            let b = i[1] === '+' ? 1 + 2 * a2 : 2 + a2,
                phi_ik = Ising.scale(b * vals[`${i}.k`])(vecs[i]);
            Eight.set(phi, `${i}.k > ${i}`, phi_ik);
        });

        ['+', '-'].forEach(s => {
            let b = s === '+' ? 1 + 2 * a2 : 2 + a2,
                c_ij = b * vals[`i${s}.k`] * vals[`i${s}.j${s}`],
                c_ji = b * vals[`j${s}.k`] * vals[`i${s}.j${s}`];
            let phi_ij = Ising.scale(c_ij)(vecs[`j${s}`]),
                phi_ji = Ising.scale(c_ji)(vecs[`i${s}`]);
            Eight.set(phi, `i${s}.j${s} > j${s}`, phi_ij);
            Eight.set(phi, `i${s}.j${s} > i${s}`, phi_ji);
        });

        return Eight.scale(1 / Eight.norm(phi))(phi);
};

Eight.param = model => {

    let m0 = {
        'field':        0,
        'loops':        [1/3, 1/3],
        'weights-0':    [1/3, 1/3, 1/3],
        'weights-1':    [1/3, 1/3, 1/3],
        'offsets-0':    [0, 0],
        'offsets-1':    [0, 0]
    }
    
    let m = _r.update(model)(m0);

    let Bk = m['field'],
    [Ci, Cj] = m['offsets-0'].map(C => C + Bk),
    [ci, cj] = m['offsets-1'].map(c => c + Bk),
    [L, l] = m['loops'],
    [Cik, Cjk, Cij] = m['weights-0'].map(C => - C * Math.log(L)),
    [cik, cjk, cij] = m['weights-1'].map(c => - c * Math.log(l));

    return Eight.p({
        'k': Bk,
        'i+': Ci,       'j+': Cj, 
        'i-': ci,       'j-': cj,
        'i+.k': Cik,    'j+.k': Cjk,    'i+.j+': Cij,
        'i-.k': cik,    'j-.k': cjk,    'i-.j-': cij
    });
};
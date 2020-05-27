//  Ising : Func(I, Vect) 
let Ising = __.alg.tensor.functor(i => [-1, 1]); 

//   .n_i : Pi -> Num
Ising.n_i = p_i => Math.sqrt(p_i[0] * p_i[1]); 

//   .eigvec : Pi -> Vi 
Ising.eigvec = p_i => 
    Ising.scale(1 / Ising.n_i(p_i))(
        [p_i[1], - p_i[0]]
    );

//   .eigval : Pij -> Num 
Ising.eigval = p_ij => {
    let num = (p_ij[0][0] * p_ij[1][1]) - (p_ij[1][0] * p_ij[0][1]),
        p_i = Ising.func('i.j', 'i')(p_ij),
        p_j = Ising.func('i.j', 'j')(p_ij);
    return num / (Ising.n_i(p_i) * Ising.n_i(p_j));
}

//   .p_ij : Pi -> Pj -> Num -> Pij 
Ising.p_ij = (p_i, p_j, eigval) => {
    let sigma = eigval * Ising.n_i(p_i) * Ising.n_i(p_j);
    return __.alg.R.compute([[0, 1], [0, 1]])(
        (x, y) => p_i[x] * p_j[y] + (x === y ? 1 : -1) * sigma
    );
}

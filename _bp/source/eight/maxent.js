let K = Eight,
    flow = (t, H) => K.integrate(K.tau_zeta, 0.2, t)(H);

//--- singular belief outside the cusp and tangent direction
let p = K.param({field: 0}),
    H = K._log(p),
    phi = K.eigflux(p),
    dphi = K.codiff(1)(phi);

console.log(K.inner(K.gibbs(K.zero), dphi))

//--- segments from 0 to H0 +- tangent displacement
function initial_conditions (H, n, delta=1) {
    let t = __.linspace(-2, 2, n),
        dH = K.scale(delta)(dphi),
        Hs = __.map(ti => K.scale(ti)(H))(t),
        H0 = __.map(Hi => K.add(Hi, dH))(Hs),
        H1 = __.map(Hi => K.subt(Hi, dH))(Hs);
        out = [];
    t.forEach((ti, i) => out[i] = [H0[i], H1[i], Hs[i]]);
    return out;
}
    
let Hs = initial_conditions(H, 43, 1);
   
let curves = __.map(__.map(H => flow(30, H)))(Hs);

const map3 = f => __.map(__.map(__.map(f)));

const D = map3(__.pipe(K.Deff, K.norm))(curves),
      U = map3(V => K.inner(K.gibbs(V), K.mu(0)(H)))(curves);

data = JSON.stringify({D, U}, null, 2);
console.log(data);

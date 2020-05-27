let State = dom.state,
    IO = dom.IO;

//--- Latex node in SVG ---
dom.math = dom('foreignObject', {
    x: m => (m.dx || 0), 
    y: m => (m.dy || 0),
    width:  m => m.width || "50",
    height: m => m.height || "50",
    svg: true
},[
    dom('div', {
        xmlns:  "xhtml",
        html:   m => m.html || ""
    })
    .push(n => {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, n]);
        return n;
    })
]);

//--- Plot ---
dom.plot = m => plot.app.start(
    _r.assign(m)(plot.model)
);

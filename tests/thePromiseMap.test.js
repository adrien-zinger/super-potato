import "../src/thePromiseMap/index.js"

function testEvtLoopWith(prList, out) {
  return Promise.map(prList, (pr, done) => {
    Promise.resolve(pr).then((val) => {
      out.push("then: " + val)
      setTimeout(() => {
        out.push("done: " + val)
        done(val * 2)
      }, 1000 - val * 500)
    }, done)
  })
}

test("Testing the event loop for the Promise.map", () => {
  let pr1 = new Promise((r) => setTimeout(r(1), 500))
  let pr2 = new Promise((r) => setTimeout(r(2), 100))
  let out = []
  return testEvtLoopWith([pr1, pr2], out).then((vals) => {
    console.log(out, vals)
    expect([
      "then: 1",
      "then: 2", // keep the correct map order
      "done: 2", // resolve 2 before 1, proof of async map
      "done: 1",
    ]).toEqual(out)
    expect([2, 4]).toEqual(vals)
  })
})

test("Testing with values", () => {
  let out = []
  return testEvtLoopWith([1, 2], out).then((vals) => {
    console.log(out, vals)
    expect([
      "then: 1",
      "then: 2", // keep the correct map order
      "done: 2", // resolve 2 before 1, proof of async map
      "done: 1",
    ]).toEqual(out)
    expect([2, 4]).toEqual(vals)
  })
})

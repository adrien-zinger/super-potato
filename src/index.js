// Current sandbox

import {run} from './promiseAndGenerator/run.js'

async function wait(x) {
    console.log(x)
    return new Promise(r => setTimeout(r(x), 200))
}
function *prGenerator() {
    let a = yield wait('a')
    let b = yield wait('b')
    let c = yield wait('c')
    return a + b + c
}

run(prGenerator).then(v => console.log(v))
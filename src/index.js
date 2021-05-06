// Current sandbox

import {run} from './promiseAndGenerator/run.js'

function *prGenerator() {
    let a = yield new Promise(r => setTimeout(r('a'), 200))
    let b = yield new Promise(r => setTimeout(r('b'), 200))
    let c = yield new Promise(r => setTimeout(r('c'), 200))
    return a + b + c
}

run(prGenerator).then(v => console.log(v))
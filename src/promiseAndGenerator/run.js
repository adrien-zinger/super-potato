async function run(gen) {
    let args = [].slice.call(arguments, 1), it
    it = gen.apply(this, args)
    return Promise.resolve().then(function handleNext(value) { // handle next
        let next = it.next(value)
        return function handleResult(next) {
            if (next.done)
                return next.value
            return Promise.resolve(next.value).then(handleNext, (err) =>
                Promise.resolve(it.throw(err)).then(handleResult))
        }(next)
    })
}

export {run};
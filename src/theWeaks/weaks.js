"use strict"

/**
 * /!\ Weakmap is only usefull for caching additionals datas and you should
 *     nether keep a reference of the data in a global scope.
 * 
 * Little hack to get an example of unefficient usecase:
 */

let a_wm = new WeakMap()
let b_wm = new WeakMap()
let obj_with_weak = {
    init() {
        a_wm.set(obj_with_weak, "hello")
        b_wm.set(obj_with_weak, "world")
    },
    get hello() {
        return () => a_wm.get(obj_with_weak);
    },
    get world() {
        return () => b_wm.get(obj_with_weak);
    }
}

obj_with_weak.init()
console.log(obj_with_weak.hello(), obj_with_weak.world()) // "hello world"
let [hello, world] = [obj_with_weak.hello, obj_with_weak.world]
console.log(hello(), world()) // "hello world"
obj_with_weak = null
console.log(hello(), world()) // undefined undefined

let obj_without_weak = {
    init() {
        obj_without_weak.a = "hello"
        obj_without_weak.b = "world"
    },
    get hello() {
        return () => obj_without_weak?.a;
    },
    get world() {
        return () => obj_without_weak?.a;
    }
}

obj_without_weak.init()
console.log(obj_without_weak.hello(), obj_without_weak.world()) // "hello world"
hello = obj_without_weak.hello
world = obj_without_weak.world
console.log(hello(), world()) // "hello world"
obj_without_weak = null
console.log(hello(), world()) // Reveal that this use case isn't for the weak map

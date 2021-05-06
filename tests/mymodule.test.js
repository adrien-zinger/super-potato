import o from '../src/mymodule.js'

test('TEST my module', () => {
    expect(o.x + o.y).toBe(3);
});
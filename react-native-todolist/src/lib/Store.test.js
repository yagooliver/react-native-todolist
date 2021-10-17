const rewire = require("rewire")
const Store = rewire("./Store")
const configStore = Store.__get__("configStore")
// @ponicode
describe("configStore", () => {
    test("0", () => {
        let callFunction = () => {
            configStore()
        }
    
        expect(callFunction).not.toThrow()
    })
})

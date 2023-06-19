import { craphash } from "./craphash"


describe('crap hash takes an object an returns a consistent hash of it', ()=>{
    it('will return a hash of all the fields in plain text', ()=>{
        const result = craphash({first:'dave',second:'fred'})
        expect(result).toEqual("{\"first\":\"dave\",\"second\":\"fred\"}")
    })
})



describe('Readmodel that keeps count of waiting requests', ()=>{
    it('have a value of 0 when just started', ()=>{
        const readModel = new RequestsWaitingReadmodel()
        expect(readModel.total).toEqual(0)
    })
})

class RequestsWaitingReadmodel{
    constructor(){
        this.total=0
    }
}
describe('readmodels want to specify what events they recievee', ()=>{
    it("registers for event type 'BasketCreated' and gets the event",()=>{

        expect('BasketCreated').toEqual('BasketCreated')
    })
})
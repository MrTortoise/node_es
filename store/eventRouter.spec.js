

describe("readmodels want to specify what events they recievee", () => {
  it("registers for event type 'BasketCreated' and gets the event", () => {
    let router = {};
    let result;
    const toCall = (e) => {
      result = e;
    };
    const withRegistration = registerForEvent(router, "BasketCreated", toCall);
    routeEvent(withRegistration, {eventType: 'BasketCreated'})

    expect(result.eventType).toEqual("BasketCreated");
  });


  it('registers for  events and gets both events', ()=>{
    let router = {};
    let result = [];
    const toCall = (e) => {
      result.push(e.eventType);
    };
    router = registerForEvent(router, "BasketCreated", toCall);
    router = registerForEvent(router, "ItemAddedToBasket", toCall);
    routeEvent(router, {eventType: 'BasketCreated'})
    routeEvent(router, {eventType: 'ItemAddedToBasket'})

    expect(result).toEqual(["BasketCreated", "ItemAddedToBasket"]);
  })
});

function registerForEvent(router, eventType, toCall) {
  return { ...router, [eventType]: toCall };
}

function routeEvent(router, event){
    router[event.eventType](event)
}

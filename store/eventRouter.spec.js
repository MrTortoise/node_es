

describe("readmodels want to specify what events they recievee", () => {
  it("registers for event type 'BasketCreated' and gets the event", () => {
    let router = {};
    let result;
    const toCall = (e) => {
      result = e;
    };
    const withRegistration = registerForEvent(router, "BasketCreated", toCall);
    handleEvent(withRegistration, {eventType: 'BasketCreated'})

    expect("BasketCreated").toEqual("BasketCreated");
  });
});

function registerForEvent(router, eventType, toCall) {
  return { ...router, [eventType]: toCall };
}

function handleEvent(router, event){
    router[event.eventType](event)
}

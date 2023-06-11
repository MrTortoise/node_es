describe("readmodels want to specify what events they recievee", () => {
  it("registers for event type 'BasketCreated' and gets the event", () => {
    let router = {};
    let result;
    const toCall = (e) => {
      result = e;
    };
    const withRegistration = registerForEvent(
      router,
      "TotalBasketReadmodel",
      { eventType: "BasketCreated" },
      toCall
    );
    routeEvent(withRegistration, { eventType: "BasketCreated" });

    expect(result.eventType).toEqual("BasketCreated");
  });

  it("registers for  events and gets both events", () => {
    let router = {};
    let result = [];
    const toCall = (e) => {
      result.push(e.eventType);
    };
    router = registerForEvent(
      router,
      "TotalBasketReadmodel",
      { eventType: ["BasketCreated", "ItemAddedToBasket"] },
      toCall
    );

    routeEvent(router, { eventType: "BasketCreated" });
    routeEvent(router, { eventType: "ItemAddedToBasket" });

    expect(result).toEqual(["BasketCreated", "ItemAddedToBasket"]);
  });

  it("registers for  events and gets both events and not others", () => {
    let router = {};
    let result = [];
    const toCall = (e) => {
      result.push(e.eventType);
    };
    router = registerForEvent(
      router,
      "TotalBasketReadmodel",
      { eventType: ["BasketCreated", "ItemAddedToBasket"] },
      toCall
    );

    routeEvent(router, { eventType: "BasketCreated" });
    routeEvent(router, { eventType: "ItemAddedToBasket" });
    routeEvent(router, { eventType: "Dave" });

    expect(result).toEqual(["BasketCreated", "ItemAddedToBasket"]);
  });

  it("2 registrations, one sends event one way and the other another", () => {
    let router = {};
    let result1, result2;

    const toCall = (e) => {
      result1 = e;
    };

    const toCall2 = (e) => {
      result2 = e;
    };

    router = registerForEvent(
      router,
      "TotalBasketReadmodel",
      { eventType: "BasketCreated" },
      toCall
    );
    router = registerForEvent(
      router,
      "TotalBasketReadmodel2",
      { eventType: "BasketCreated" },
      toCall2
    );
    const e = { eventType: "BasketCreated" };
    routeEvent(router, e);
    expect(result1).toEqual(result2);
    expect(result1).toEqual(e);
  });

  it("1 registrationfor 1 event, send 2 events ensure only 1 recieved", () => {
    let router = {};
    let result = [];
    const toCall = (e) => {
      result.push(e);
    };
    const withRegistration = registerForEvent(
      router,
      "TotalBasketReadmodel",
      { eventType: "BasketCreated" },
      toCall
    );
    routeEvent(withRegistration, { eventType: "BasketCreated" });
    routeEvent(withRegistration, { eventType: "Dave" });

    expect(result).toEqual([{ eventType: "BasketCreated" }]);
  });
});

function registerForEvent(router, name, matcher, toCall) {
  return { ...router, [name]: { matcher, toCall } };
}

function isMatch(registration, event) {
  const matcher = registration.matcher;
  for (var prop in matcher) {
    const value = matcher[prop];
    if (typeof value == "string" || value instanceof String) {
      if (event[prop] !== value) return false;
    }

    if (Array.isArray(value)) {
      return value.some((v) => {
        if (typeof v == "string" || v instanceof String) {
          return event[prop] === v;
        }
      });
    }
  }
  return true;
}

function routeEvent(router, event) {
  const names = Object.keys(router);
  const matchedNames = names.filter((n) => isMatch(router[n], event));
  matchedNames.forEach((n) => router[n].toCall(event));
}

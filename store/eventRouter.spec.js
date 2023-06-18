import { routeEvent, registerForEvent, EventRouter } from "./eventRouter";

describe("readmodels want to specify what events they recievee", () => {
  it("registers for event type 'BasketCreated' and gets the event", () => {
    const router = new EventRouter();
    let result;
    const toCall = (e) => {
      result = e;
    };

    router.registerForEvent(
      "TotalBasketReadmodel",
      { eventType: "BasketCreated" },
      toCall
    );
    router.routeEvent({ eventType: "BasketCreated" });

    expect(result.eventType).toEqual("BasketCreated");
  });

  it("registers for  events and gets both events", () => {
    let router = new EventRouter();
    let result = [];
    const toCall = (e) => {
      result.push(e.eventType);
    };

    router.registerForEvent(
      "TotalBasketReadmodel",
      { eventType: ["BasketCreated", "ItemAddedToBasket"] },
      toCall
    );

    router.routeEvent({ eventType: "BasketCreated" });
    router.routeEvent({ eventType: "ItemAddedToBasket" });

    expect(result).toEqual(["BasketCreated", "ItemAddedToBasket"]);
  });

  it("registers for  events and gets both events and not others", () => {
    let router = new EventRouter();
    let result = [];
    const toCall = (e) => {
      result.push(e.eventType);
    };
    router.registerForEvent(
      "TotalBasketReadmodel",
      { eventType: ["BasketCreated", "ItemAddedToBasket"] },
      toCall
    );

    router.routeEvent({ eventType: "BasketCreated" });
    router.routeEvent({ eventType: "ItemAddedToBasket" });
    router.routeEvent({ eventType: "Dave" });

    expect(result).toEqual(["BasketCreated", "ItemAddedToBasket"]);
  });

  it("2 registrations, one sends event one way and the other another", () => {
    let router = new EventRouter();
    let result1, result2;

    const toCall = (e) => {
      result1 = e;
    };

    const toCall2 = (e) => {
      result2 = e;
    };

    router.registerForEvent(
      "TotalBasketReadmodel",
      { eventType: "BasketCreated" },
      toCall
    );
    router.registerForEvent(
      "TotalBasketReadmodel2",
      { eventType: "BasketCreated" },
      toCall2
    );
    const inputEvent = { eventType: "BasketCreated" };
    router.routeEvent(inputEvent);
    expect(result1).toEqual(result2);
    expect(result1).toEqual(inputEvent);
  });

  it("1 registrationfor 1 event, send 2 events ensure only 1 recieved", () => {
    let router = new EventRouter();
    let result = [];
    const toCall = (e) => {
      result.push(e);
    };
    router.registerForEvent(
      "TotalBasketReadmodel",
      { eventType: "BasketCreated" },
      toCall
    );
    router.routeEvent({ eventType: "BasketCreated" });
    router.routeEvent({ eventType: "Dave" });

    expect(result).toEqual([{ eventType: "BasketCreated" }]);
  });
});

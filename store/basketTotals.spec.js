import { handleEvent } from "./basketTotals";

describe("basket totals tells people how much is in users baskets", () => {
  it("have a value of 0 for a newly created basket", () => {
    const e = { eventType: "basketCreated", data: { userid: "dave" } };
    const basket = handleEvent({}, e);
    expect(basket["dave"].total).toBe(0);
  });

  it("has values of 0 for 2 newly created baskets", () => {
    const e = { eventType: "basketCreated", data: { userid: "dave" } };
    const e2 = { eventType: "basketCreated", data: { userid: "steve" } };
    let basket = handleEvent({}, e);
    basket = handleEvent(basket, e2);
    expect(basket["dave"].total).toBe(0);
    expect(basket["steve"].total).toBe(0);
  });
});

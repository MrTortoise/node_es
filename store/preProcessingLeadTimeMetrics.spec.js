import { handleEvent } from "./preProcessingLeadTimeMetrics";

describe("calculates the lead time of preprocessing ", () => {
  it("when there is a preProcessingStated event thenan entry", () => {
    const createdOn = new Date(2023,6,11)
    const e = {streamName: 'investigation-1', createdOn , eventType: "PreprocessingStarted", data:{investigationId: "1"} };
    const model = handleEvent({}, e);
    expect(model["1"].completed).toBe(false);
  });

  it("has values of 0 for 2 newly created baskets", () => {
    const createdOn = new Date(2023,6,11)
    const e = {streamName: 'investigation-1', createdOn , eventType: "PreprocessingStarted", data:{investigationId: "1"} };
    const e2 = {streamName: 'investigation-2', createdOn , eventType: "PreprocessingStarted", data:{investigationId: "2"} };
    let model = handleEvent({}, e);
    model = handleEvent(model, e2);
    expect(model["1"].completed).toBeFalsy();
    expect(model["2"].completed).toBeFalsy();
  });

//   it.only('has value of added items as total', ()=>{
//     const e = { eventType: "basketCreated", data: { userid: "dave" } };
//     let basket = handleEvent({}, e);
//     expect(basket["dave"].total).toBe(0);
// console.log({basket})
//     basket = handleEvent(basket, {eventType: "ItemAddedToBasket", data: {total: 13}})
//     expect(basket["dave"].total).toBe(13)

//   })
});

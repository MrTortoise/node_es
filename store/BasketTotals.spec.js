describe("basket totals tells people how much is in users baskets", () => {
  it("have a value of 0 for a newly created basket", () => {
    const dave = { total: 0 };
    const basket = {dave}
    expect(basket.dave.total).toBe(0);
  });
});
describe("Request worker takes a request, hits some API and produces a complete request command", () => {
  it("takes event, hits api and executes command", () => {
    const event = {
      eventType: "requestCreated",
      data: {
        id: '{"type":"createRequest","name":"dave"}',
        foreignId: "0f98b078-7279-4bd1-af2a-0d38a2e95cc5",
      },
      position: 0,
    };
  });
});

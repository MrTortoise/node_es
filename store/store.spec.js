describe("an event store will append events to a stream and return streams", () => {
  it("will store an event", async () => {
    let store = {};
    const streamName = "streamName";
    store = await writeToStream(store, streamName, -1, { data: { name: "dave" } });
    expect(store[streamName].events[0].data.name).toEqual("dave");
  });

  it("will throw if stream is in wrong position",async () => {
    let store = {};
    const streamName = "streamName";
    try{
        await writeToStream(store, streamName, 0, { data: { name: "dave" } });
    }
    catch(e){
        expect(e).toEqual(new Error("incorrect stream position"))
    }
  });
});

async function writeToStream(store, streamName, currentPosition, event) {
  let stream = store[streamName];
  if (stream == undefined) {
    stream = { events: [], currentPosition: -1 };
  }

  if (stream.currentPosition != currentPosition)
    throw new Error("incorrect stream position");

  return {
    ...store,
    [streamName]: {
      currentPosition: currentPosition++,
      events: [...stream.events, event],
    },
  };
}

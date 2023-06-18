
import { EventStore } from './EventStore';
import { InMemoryStore } from './InMemoryStore';

describe("an event store will append events to a stream and return a store", () => {
    
  it("will store an event", async () => {
    let store = new InMemoryStore();
    const eventStore = new EventStore(store)
    const streamName = "streamName";
    await eventStore.writeToStream(streamName, -1, { data: { name: "dave" } });
    const stream = await eventStore.readStream(streamName)
    expect(stream.events[0].data.name).toEqual("dave");
  });

  it("will throw if stream is in wrong position",async () => {
    let store = new InMemoryStore();
    const eventStore = new EventStore(store)
    const streamName = "streamName";
    try{
        await eventStore.writeToStream(streamName, 0, { data: { name: "dave" } });
    }
    catch(e){
        expect(e).toEqual(new Error("incorrect stream position"))
    }
  });


});




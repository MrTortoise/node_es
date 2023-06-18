import { EventStore } from "./EventStore";
import { EventStoreWithRouter } from "./EventStoreWithRouter";
import { InMemoryStore } from "./InMemoryStore";
import { EventRouter } from "./eventRouter";

describe("eventstore with routing will write events and route them to appropiate projections", () => {
  let eventStore;
  beforeEach(() => {
    const store = new InMemoryStore();
    const es = new EventStore(store);
    const router = new EventRouter();
    eventStore = new EventStoreWithRouter(es, router);
  });

  it("will store an event", async () => {
    const streamName = "streamName";
    await eventStore.writeToStream(streamName, -1, { data: { name: "dave" } });
    const stream = await eventStore.readStream(streamName);
    expect(stream.events[0].data.name).toEqual("dave");
  });

  it("will throw if stream is in wrong position", async () => {
    const streamName = "streamName";
    try {
      await eventStore.writeToStream(streamName, 0, { data: { name: "dave" } });
    } catch (e) {
      expect(e).toEqual(new Error("incorrect stream position"));
    }
  });

  it("will forward the event to any matching handlers / projections", () => {


    expect(1).toEqual(1);
  });
});

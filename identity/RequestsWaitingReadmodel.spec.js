import { InMemoryStore } from "../store/InMemoryStore";
import { EventStore } from "../store/EventStore";
import { EventRouter } from "../store/eventRouter";
import { EventStoreWithRouter } from "../store/EventStoreWithRouter";
import { RequestsWaitingReadmodel } from "./RequestsWaitingReadmodel";

describe("Readmodel that keeps count of waiting requests", () => {
  let router;
  let eventStore;
  let readModel;
  beforeEach(() => {
    const ims = new InMemoryStore();
    const store = new EventStore(ims);
    router = new EventRouter();
    eventStore = new EventStoreWithRouter(store, router);
    readModel = new RequestsWaitingReadmodel(eventStore);
  });

  it("have a value of 0 when just started", () => {
    expect(readModel.total).toEqual(0);
  });

  it("will have a value of 1 after one event", async () => {
    await eventStore.writeToStream("test", -1, { eventType: "requestCreated" });

    expect(readModel.total).toBe(1);
  });

  it("will have a value of 1 after one event is completed", async () => {
    await eventStore.writeToStream("test", -1, { eventType: "requestCreated" });
    await eventStore.writeToStream("test", 0, {
      eventType: "requestCompleted",
    });

    expect(readModel.total).toBe(0);
  });

  it("will have a value of 1 after one event relevant", async () => {
    await eventStore.writeToStream("test", -1, { eventType: "requestCreated" });
    await eventStore.writeToStream("test", 0, { eventType: "dave" });

    expect(readModel.total).toBe(1);
  });
});



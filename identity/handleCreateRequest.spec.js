import { InMemoryStore } from "../store/InMemoryStore";
import { EventStore } from "../store/EventStore";
import { generateId } from "../store/generateId";
import { EventStoreWithRouter } from "../store/EventStoreWithRouter";
import { EventRouter } from "../store/eventRouter";
import { handleCreateRequest } from "./handleCreateRequest";

describe("a request command handler takes commands, loads state and applies a policy to emit events", () => {
  let router;
  let eventStore;
  beforeEach(() => {
    const ims = new InMemoryStore();
    const store = new EventStore(ims);
    router = new EventRouter();
    eventStore = new EventStoreWithRouter(store, router);
  });

  it("will take a command and write an event to stream", async () => {
    const commandId = generateId();
    const command = { type: "createRequest", name: "dave", id: commandId };
    const streamId = await handleCreateRequest(eventStore, command);
    const stream = await eventStore.readStream(streamId);
    const event = stream.events[0];
    expect(event.eventType).toEqual("requestCreated");
    expect(event.position).toEqual(0);
  });

  it("will error in unrecognised command", async () => {
    expect.assertions(1);
    const command = { type: "goBoom", name: "dave", id: "commandId" };
    try {
      await handleCreateRequest(eventStore, command);
    } catch (e) {
      expect(e).toEqual(new Error("unrecognised command"));
    }
  });
});



import { InMemoryStore } from "../store/InMemoryStore";
import { EventStore } from "../store/EventStore";
import { generateId } from "../store/generateId";
import { EventStoreWithRouter } from "../store/EventStoreWithRouter";
import { EventRouter } from "../store/eventRouter";
import {
  CreateRequestHandler,
  handler,
} from "./CreateRequestHandler";
import { craphash } from "../crypto/craphash";

describe("a request command handler takes commands, loads state and applies a policy to emit events", () => {
  let router;
  let eventStore;
  let handler;
  beforeEach(() => {
    const ims = new InMemoryStore();
    const store = new EventStore(ims);
    router = new EventRouter();
    eventStore = new EventStoreWithRouter(store, router);
    handler = new CreateRequestHandler(eventStore, craphash);
  });

  it("will take a command and write an event to stream", async () => {
    const commandId = generateId();
    const command = { type: "createRequest", name: "dave", id: commandId };
    const streamId = await handler.handle(command);
    const stream = await eventStore.readStream(streamId);
    const event = stream.events[0];
    expect(event.eventType).toEqual("requestCreated");
    expect(event.position).toEqual(0);
  });

  it("will error if creating twice", async () => {
    expect.assertions(1)
    const commandId = generateId();
    const command = { type: "createRequest", name: "dave", id: commandId };
    const streamId = await handler.handle(command);
    try{
      await handler.handle(command)
    }catch(e){
      expect(e).toEqual(new Error('request already exists'))
    }
  });

  it("will error in unrecognised command", async () => {
    expect.assertions(1);
    const command = { type: "goBoom", name: "dave", id: "commandId" };
    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toEqual(new Error("unrecognised command"));
    }
  });
});

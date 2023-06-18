import { InMemoryStore } from "../store/InMemoryStore";
import { EventStore } from "../store/EventStore";
import { generateId } from "../store/generateId";

describe("a request command handler takes commands, loads state and applies a policy to emit events", () => {
  it("will take a command and write an event to stream", async () => {
    let store = new InMemoryStore();
    // paused test whilst i realised that this allso needs a dependency on a event router for projecting
    const eventStore = new EventStore(store); 
    const commandHandler = new RequestCommandHandler(eventStore)
    const id = generateId();
    const command = { type: "createPerson", name: "dave", id };
    await handleCommand(eventStore, command);
    const stream = await eventStore.readStream(`person-${id}`);
    expect(stream.events[0]).toEqual({
      eventType: "personCreated",
      position: 0,
    });
  });
});

class RequestCommandHandler{
    constructor(eventStore){
        this.store = eventStore
    }
}

async function handleCommand(eventStore, command) {
  eventStore.writeToStream(`person-${command.id}`, -1, {
    eventType: "personCreated",
  });
}
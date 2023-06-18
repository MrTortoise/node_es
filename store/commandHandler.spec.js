import { InMemoryStore } from "./InMemoryStore";
import { EventStore } from "./EventStore";
import { generateId } from "./generateId";

describe("a command handler needs to take a command, read a stream then write to it", () => {
  it("will take a command and write an event to stream", async () => {
    let store = new InMemoryStore();
    const eventStore = new EventStore(store);
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

async function handleCommand(eventStore, command) {
  eventStore.writeToStream(`person-${command.id}`, -1, {
    eventType: "personCreated",
  });
}

const { handleEvent } = require("./preProcessingLeadTimeMetrics");
import { InMemoryStore } from "./InMemoryStore";
import { EventStore } from "./EventStore";
import { v4 as uuidv4 } from "uuid";

describe("a command handler needs to take a command, read a stream then write to it", () => {
  it("will take a command and write an event to stream", async () => {
    let store = new InMemoryStore();
    const eventStore = new EventStore(store)
    const id = generateId();
    const command = { type: "createPerson", name: "dave", id };
    await handleCommand(eventStore, command);
    const stream = await eventStore.readStream(eventStore, "person-someId");
    expect(stream.events[0]).toEqual({ eventType: "personCreated" });
  });
});

function generateId() {
  return uuidv4();
}


async function handleCommand(eventStore, command) {}



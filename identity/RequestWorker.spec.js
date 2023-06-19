import { InMemoryStore } from "../store/InMemoryStore";
import { EventStore } from "../store/EventStore";
import { EventRouter } from "../store/eventRouter";
import { EventStoreWithRouter } from "../store/EventStoreWithRouter";
import { CommandRouter } from "../store/CommandRouter";
import { RequestCreatedWorker } from "./RequestCreatedWorker";
import { SomeApi } from "./SomeApi";

describe("Request worker takes a request, hits some API and produces a complete request command", () => {
  let router;
  let eventStore;
  let worker;
  beforeEach(() => {
    const ims = new InMemoryStore();
    const store = new EventStore(ims);
    router = new EventRouter();
    eventStore = new EventStoreWithRouter(store, router);
    worker = new RequestCreatedWorker(eventStore);
  });

  it("takes event, hits api and executes command",async  () => {
    const id = '{"type":"createRequest","name":"dave"}';
    const event = {
      eventType: "requestCreated",
      data: {
        id,
        foreignId: "0f98b078-7279-4bd1-af2a-0d38a2e95cc5",
      },
      position: 0,
    };

    let result;
    const commandHandler = {
      handle: (c) => 
      {
        result = c},
    };
    const commandRouter = new CommandRouter();
    commandRouter.register("completeRequest", commandHandler);

    const api = new SomeApi();

    const worker = new RequestCreatedWorker(eventStore, commandRouter, api);
    router.registerForEvent(
      "RequestCreatedWorker",
      { eventType: "requestCreated" },
      worker
    );

    await eventStore.writeToStream(`customer-${id}`, -1, event);

    expect(result.commandType).toEqual("completeRequest");
  });
});



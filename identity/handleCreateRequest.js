import { generateId } from "../store/generateId";

export async function handleCreateRequest(eventStore, command) {
    if (command.type == "createRequest") {
        const id = generateId();

        const streamId = `request-${id}`;
        await eventStore.writeToStream(streamId, -1, {
            eventType: "requestCreated",
            data: { id, foreignId: command.id },
        });
        return streamId;
    }
    throw new Error("unrecognised command");
}

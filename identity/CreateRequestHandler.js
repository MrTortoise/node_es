
export class CreateRequestHandler{
    constructor(eventStore, hashFunction){
        this.hasher = hashFunction
        this.eventStore = eventStore
    }

    async handle(command) {
        if (command.type == "createRequest") {
            const fields = {
                type: command.type,
                name: command.name
            }
            const id = this.hasher(fields);
            const streamId = `request-${id}`;

            const stream = await this.eventStore.readStream(streamId)
            if (stream != undefined) throw new Error('request already exists')
    
            await this.eventStore.writeToStream(streamId, -1, {
                eventType: "requestCreated",
                data: { id, foreignId: command.id },
            });
            return streamId;
        }
        throw new Error("unrecognised command");
    }
}

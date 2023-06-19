export class RequestCreatedWorker {
    // this is a worker ... workers turn events (or readmodels) into commands
    // it takes an event and executes a command against a different stream
    // process managers are examples of more complex workers
    // personally I prefer to use process managers when there is a a,b,c,done sequence
    // over saga and choreography
    constructor(eventStore, commandRouter, api) {
        this.eventStore = eventStore;
        this.commandRouter = commandRouter;
        this.api = api;
    }

    async handle(event) {
        const data = await this.api.get();
        const command = {
            commandType: 'completeRequest',
            data
        };

        this.commandRouter.handle(command);
    }
}

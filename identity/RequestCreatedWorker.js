export class RequestCreatedWorker {
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

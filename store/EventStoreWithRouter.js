export class EventStoreWithRouter {
    constructor(eventStore, router) {
        this.eventStore = eventStore;
        this.router = router;
    }

    async writeToStream(streamName, currentPosition, event) {
        await this.eventStore.writeToStream(streamName, currentPosition, event);
        this.router.routeEvent(event);
    }

    async readStream(streamName) {
        return await this.eventStore.readStream(streamName);
    }
}

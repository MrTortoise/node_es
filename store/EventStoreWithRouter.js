export class EventStoreWithRouter {
    constructor(eventStore, router) {
        this.eventStore = eventStore;
        this.router = router;
    }

    async writeToStream(streamId, currentPosition, event) {
        await this.eventStore.writeToStream(streamId, currentPosition, event);
        this.router.routeEvent(event);
    }

    async readStream(streamId) {
        return await this.eventStore.readStream(streamId);
    }
}

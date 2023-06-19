export class RequestsWaitingReadmodel {
    constructor(eventStore) {
        eventStore.registerForEvent(
            "waitingRequestReadmodel",
            { eventType: ["requestCreated", "requestCompleted"] },
            this
        );
        this.total = 0;
    }

    handle(event) {
        if (event.eventType == "requestCreated") {
            this.total++;
        } else if (event.eventType == "requestCompleted") {
            this.total--;
        }
    }
}

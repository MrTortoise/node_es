export class EventStore {
  constructor(store) {
    this.store = store;
  }

  async writeToStream(streamName, currentPosition, event) {
    let stream = await this.store.readStream(streamName);
    if (stream == undefined) {
      stream = { events: [], currentPosition: -1 };
    }

    if (stream.currentPosition != currentPosition)
      throw new Error("incorrect stream position");

    await this.store.writeToStream(streamName, event);
  }

  async readStream(streamName){
    return this.store.readStream(streamName)
  }

}

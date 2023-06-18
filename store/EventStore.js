export class EventStore {
  constructor(store) {
    this.store = store;
  }

  async writeToStream(streamId, currentPosition, event) {
    let stream = await this.store.readStream(streamId);
    if (stream == undefined) {
      stream = { events: [], currentPosition: -1 };
    }

    if (stream.currentPosition != currentPosition)
      throw new Error("incorrect stream position");

    await this.store.writeToStream(streamId, event);
  }

  async readStream(streamId){
    return await this.store.readStream(streamId)
  }
}

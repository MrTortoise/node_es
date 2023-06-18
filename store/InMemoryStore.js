
export class InMemoryStore {
  constructor() {
    this.streams = {};
  }

  async writeToStream(streamName, event) {
    let stream = this.streams[streamName];
    if (stream == undefined) {
      event.position = 0;
      stream = { events: [event], currentPosition: 0 };
    } else {
      event.position = stream.events.length;
      stream = {
        events: [...stream.events, event],
        currentPosition: stream.currentPosition++,
      };
    }

    this.streams[streamName] = stream;
  }

  async readStream(streamName) {
    return this.streams[streamName];
  }
}

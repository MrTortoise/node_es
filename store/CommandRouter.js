import { EventEmitter } from "node:events";

export class CommandRouter {
    // think of this a bit like a controller in express
    // only instead of a url and some params it takes a message
    constructor() {
        this.emitter = new EventEmitter();
    }

    register(commandName, handler) {
        this.emitter.addListener(commandName, handler.handle.bind(handler));
    }

    handle(command){
        this.emitter.emit(command.commandType, command)
    }
}

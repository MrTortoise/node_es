function isMatch(registration, event) {
  const matcher = registration.matcher;
  for (var prop in matcher) {
    const value = matcher[prop];
    if (typeof value == "string" || value instanceof String) {
      if (event[prop] !== value) return false;
    }

    if (Array.isArray(value)) {
      return value.some((v) => {
        return event[prop] === v;
      });
    }
  }
  return true;
}

export class EventRouter{
    constructor(){
        this.subscrptions = {}
    }

    registerForEvent(name, matcher, toCall){
        this.subscrptions = {...this.subscrptions,[name]: { matcher, toCall } }
    }

   async routeEvent(event){
        const names = Object.keys(this.subscrptions);
        const matchedNames = names.filter((n) => isMatch(this.subscrptions[n], event));
        matchedNames.forEach(async (n) => await this.subscrptions[n].toCall(event));
    }
}
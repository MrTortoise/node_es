function isMatch(registration, event) {
  const matcher = registration.matcher;
  for (var prop in matcher) {
    const value = matcher[prop];
    if (typeof value == "string" || value instanceof String) {
      if (event[prop] !== value) return false;
    }

    if (Array.isArray(value)) {
      return value.some((v) => {
        if (typeof v == "string" || v instanceof String) {
          return event[prop] === v;
        }
      });
    }
  }
  return true;
}

export function registerForEvent(router, name, matcher, toCall) {
  return { ...router, [name]: { matcher, toCall } };
}

export function routeEvent(router, event) {
  const names = Object.keys(router);
  const matchedNames = names.filter((n) => isMatch(router[n], event));
  matchedNames.forEach((n) => router[n].toCall(event));
}

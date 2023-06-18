export const handleEvent = (state, e) => {
  return { ...state, [e.data.investigationId]: { started: e.createdOn, completed: false } };
};

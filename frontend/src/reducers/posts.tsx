interface ActionInterface {
  type: string;
  payload?: string;
}

export default (state = [], action: ActionInterface) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return state;
    default:
      return state;
  }
};

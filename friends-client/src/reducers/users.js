export default (state = { users: [], loading: true }, action) => {
  switch (action.type) {
    case "POPULATE_USERS":
      return {
        ...state,
        users: action.users,
        loading: false,
      };

    default:
      return state;
  }
};

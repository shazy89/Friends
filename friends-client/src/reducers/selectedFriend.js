export default (state = { friend: null }, action) => {
  switch (action.type) {
    case "SELECT_FRIEND":
      return {
        ...state,
        friend: action.friendInfo,
      };

    default:
      return state;
  }
};

import {
  CURRENT_USER,
  ADD_NEW_FRIEND,
  ADD_NEW_CHAT,
  USER_AVATAR,
} from "../actions/auth";

const user = (
  state = { user: "", friends: [], chats: [], users: [], loggedIn: false },
  action
) => {
  switch (action.type) {
    case CURRENT_USER:
      state = Object.assign({}, state, {
        user: action.user,
        friends: action.friends,
        chats: action.chats,
        loggedIn: true,
      });
      return state;
    case USER_AVATAR:
      const editInfo = {
        ...state.user,
        user: {
          ...state.user.user,
          username: action.userInfo.username,
          avatar: action.userInfo.avatar,
        },
      };
      debugger;
      return {
        ...state,
        user: editInfo,
      };
    case ADD_NEW_FRIEND:
      const editUserFriends = { ...state.user, friends: action.friends };

      return {
        ...state,
        user: editUserFriends,
        friends: action.friends,
      };
    case ADD_NEW_CHAT:
      const chts = { ...state.user, chats: [...state.user.chats, action.chat] };
      return {
        ...state,
        user: chts,
        chats: [...state.chats, action.chat],
      };
    case "UPDATE_INFO":
      const userInfo = { ...state.user.user.user, user: action.userInfo };

      return {
        ...state,
        user: userInfo,
      };

    default:
      return state;
  }
};
export default user;

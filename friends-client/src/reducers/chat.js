export default (
  state = { activeChatMessages: [], activeChat: "", loading: true },
  action
) => {
  switch (action.type) {
    case "LOAD_CHAT":
      return {
        activeChatMessages: action.chat.messages,
        activeChat: action.chat.chat,
        loading: false,
      };
    case "MESSAGE":
      let msg = action.message.slice(-1)[0];

      return {
        ...state,
        activeChatMessages: [...state.activeChatMessages, msg],
      };

    default:
      return state;
  }
};

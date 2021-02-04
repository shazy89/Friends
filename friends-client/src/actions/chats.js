const updateChat = (chat) => {
  return {
    type: "LOAD_CHAT",
    chat,
  };
};

export const fetchActiveChatInfo = (chat) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/chats/${chat.id}`)
      .then((resp) => resp.json())
      .then((chat) => {
        dispatch(updateChat(chat));
      });
  };
};

export const activeChatInfo = (chat) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/chats/${chat.id}`)
      .then((resp) => resp.json())
      .then((chat) => {
        dispatch(updateChat(chat));
      });
  };
};

export const selectFriend = (friendInfo) => {
  return {
    type: "SELECT_FRIEND",
    friendInfo,
  };
};

const addNewMessage = (message) => {
  return {
    type: "MESSAGE",
    message,
  };
};

export const newMessage = (message, chat, user) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/chats/${chat.id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        messages: {
          content: message,
          chat_id: chat.id,
          user_id: user.id,
          chat: chat,
        },
      }),
    })
      .then((response) => response.json())
      .then((message) => {
        dispatch(addNewMessage(message));
      });
  };
};

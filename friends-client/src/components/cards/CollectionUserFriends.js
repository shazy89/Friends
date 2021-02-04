import React, { useEffect } from "react";
import { CollectionItem } from "react-materialize";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/chats";
import LoadingPage from "../LoadingPage";
const CollectionUserFriends = ({
  friend,
  selectFriend,
  activeChatInfo,
  currentUser,
  loggedIn,
}) => {
  if (loggedIn) {
    const activeChat = currentUser.chats.find((chat) => {
      return friend.chats.map((c) => parseInt(c.id)).includes(chat.chat.id);
    });

    const handleChatWithUser = (e) => {
      e.preventDefault();
      selectFriend(friend);
      activeChatInfo(activeChat.chat);
    };

    return (
      <div
        onClick={handleChatWithUser}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "GhostWhite";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "";
        }}
      >
        <CollectionItem
          id={friend.id}
          className="avatar"
          style={{ borderBottomColor: "darkgray", cursor: "pointer" }}
        >
          <img src={friend.avatar} className="circle" alt={friend.username} />
          <span className="name" style={{ fontFamily: "serif" }}>
            {friend.username}
          </span>
        </CollectionItem>
      </div>
    );
  }
  if (!loggedIn) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }
};

const mapStateToProps = (usr) => {
  return {
    currentUser: usr.auth,
    loggedIn: usr.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionUserFriends);

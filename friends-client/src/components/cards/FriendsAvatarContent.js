import React from "react";
import * as Actions from "../../actions/chats";
import { ActionCableConsumer } from "react-actioncable-provider";
import { bindActionCreators } from "redux";
import {
  Collection,
  Icon,
  Collapsible,
  CollapsibleItem,
} from "react-materialize";
import { connect } from "react-redux";
import CollectionUserFriends from "./CollectionUserFriends";

const FriendsAvatarContent = ({
  users,
  currentUserFriends,
  currentUser,
  fetchActiveChatInfo,
  chat,
}) => {
  const displayFriends = users.users
    .filter((user) => {
      return currentUserFriends
        .map((fr) => parseInt(fr.friend_id))
        .includes(user.id);
    })
    .map((friend) => (
      <CollectionUserFriends key={friend.id} id={friend.id} friend={friend} />
    ));

  return (
    <Collapsible accordion>
      <CollapsibleItem
        expanded={true}
        header="Friends"
        icon={<Icon>filter_drama</Icon>}
        node="div"
      >
        <Collection>
          <ActionCableConsumer
            channel={{ channel: "FeedChannel" }}
            onReceived={() => {
              fetchActiveChatInfo(chat);
            }}
          />
          {displayFriends}
        </Collection>
      </CollapsibleItem>
    </Collapsible>
  );
};

const mapStateToProps = (usr) => {
  return {
    users: usr.users,
    currentUserFriends: usr.auth.friends,
    currentUser: usr.auth,
    chat: usr.chat.activeChat,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsAvatarContent);

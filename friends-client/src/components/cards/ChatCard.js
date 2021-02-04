import React, { useState, useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/chats";
import {
  Icon,
  Col,
  Card,
  Textarea,
  Button,
  Chip,
  Row,
} from "react-materialize";
import { connect } from "react-redux";
import bgImg from "../../assets/bgImg.png";
import { ActionCableConsumer } from "react-actioncable-provider";
import Message from "./message/MessageCard";
import ScrollableFeed from "react-scrollable-feed";

const ChatCard = ({
  friend,
  chat,
  user,
  newMessage,
  fetchActiveChatInfo,
  activeChatMessages,
}) => {
  const [message, setMessage] = useState("");

  const handleNewMessageSubmit = (e) => {
    e.preventDefault();
    newMessage(message, chat, user);
    setMessage("");
  };
  let msg = activeChatMessages.map((message) => (
    <Message key={message.id} message={message} />
  ));

  return (
    <div>
      <ActionCableConsumer
        channel={{ channel: "FeedChannel" }}
        onReceived={() => {
          fetchActiveChatInfo(chat);
        }}
      />
      <Col m={8} l={8} s={12}>
        <Card style={{ borderRadius: "5%" }} revealIcon={<Icon>edit</Icon>}>
          {friend ? (
            <Chip
              close={false}
              closeIcon={<Icon className="close">close</Icon>}
              options={null}
            >
              <img
                alt="Contact Person"
                className="responsive-img"
                src={friend.avatar}
              />
              <ActionCableConsumer
                channel={{ channel: "FeedChannel" }}
                onReceived={() => {
                  fetchActiveChatInfo(chat);
                }}
              />
              <span style={{ fontFamily: "cursive" }}>{friend.username} </span>
            </Chip>
          ) : null}
          <div
            style={{
              resize: "none",
              overflowY: "scroll",
              height: "300px",
              backgroundImage: `url(${bgImg})`,
            }}
          >
            <ScrollableFeed>{msg}</ScrollableFeed>
          </div>
          <Card
            style={{
              borderRadius: "5%",
              resize: "none",
              overflowY: "scroll",
              height: "100px",
            }}
            revealIcon={<Icon>edit</Icon>}
          >
            <Row>
              <Textarea
                id="Textarea-12"
                l={10}
                m={10}
                s={9}
                xl={10}
                placeholder="Type a message..."
                onKeyPress={(event) =>
                  event.key === "Enter" ? handleNewMessageSubmit(event) : null
                }
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Button flat onClick={handleNewMessageSubmit}>
                <Icon className="close" type="submit">
                  send
                </Icon>
              </Button>
            </Row>
          </Card>
        </Card>
      </Col>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

const mapStateToProps = (store) => {
  return {
    friend: store.selectedFriend.friend,
    chat: store.chat.activeChat,
    user: store.auth.user.user,
    activeChatMessages: store.chat.activeChatMessages,
    activeChat: store.chat.activeChat,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);

import React from "react";
import { Icon, Chip } from "react-materialize";
import "./Message.css";
import { connect } from "react-redux";

const Message = ({ key, message, currentUser }) => {
  let isSentByCurrentUser = false;

  if (currentUser.user.username === message.username) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd" id={message.id}>
      <Chip
        close={false}
        closeIcon={<Icon className="close">close</Icon>}
        options={null}
      >
        <img
          alt="Contact Person"
          className="responsive-img"
          src={currentUser.user.avatar}
        />
        <span style={{ fontFamily: "cursive" }}>
          {currentUser.user.username}{" "}
        </span>
      </Chip>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.content}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart" id={message.id}>
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.content}</p>
      </div>
      <Chip
        close={false}
        closeIcon={<Icon className="close">close</Icon>}
        options={null}
      >
        <img
          alt="Contact Person"
          className="responsive-img"
          src={message.avatar}
        />
        <span style={{ fontFamily: "cursive" }}>{message.username} </span>
      </Chip>
    </div>
  );
};
const mapStateToProps = (usr) => {
  return {
    currentUser: usr.auth.user,
  };
};
export default connect(mapStateToProps)(Message);

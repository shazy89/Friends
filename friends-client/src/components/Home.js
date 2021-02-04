import React from "react";
import SideCard from "./cards/SideCard";
import Login from "./Login";
import { Row } from "react-materialize";
import { connect } from "react-redux";
import ChatCard from "./cards/ChatCard";
import UserProfile from "./cards/UserProfileCard";
import UserBioCard from "./cards/UserBioCard";
const Home = ({ history, user }) => {
  if (user.loggedIn) {
    return (
      <div className="container f5f5f5 grey lighten-4">
        <Row>
          <UserProfile history={history} />
          <UserBioCard />
        </Row>
        <Row>
          <SideCard />
          <ChatCard />
        </Row>
      </div>
    );
  }

  if (!user.loggedIn) {
    return <Login />;
  }
};

const mapStateToProps = (usr) => {
  return {
    user: usr.auth,
  };
};

export default connect(mapStateToProps)(Home);

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import NavBar from "./NavBar";
import Network from "./Network";
import Notfound from "./Notfound";
import Settings from "./user/Settings";
import { connect } from "react-redux";
import {
  loadCurrentUser,
  loadAllUsers,
  userEditFunction,
} from "../actions/auth";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: { user: null, loggingIn: true },
      user: {},
      friends: [],
      chats: [],
    };
  }

  setLoggedInUser = (user) => {
    localStorage.setItem("token", user.token);
    this.setState({
      auth: {
        user: {
          username: user.username,
          id: user.id,
        },
        loggingIn: false,
      },
    });
    this.props.loadCurrentUser(this.state.auth.user);
  };

  logOutUser = (e) => {
    localStorage.removeItem("token");
    localStorage.clear();
    this.setState({
      auth: { user: null, loggingIn: false },
    });
    window.location = `/login`;
  };

  componentDidMount() {
    this.props.loadAllUsers();
    const token = localStorage.getItem("token");
    if (token) {
      return fetch("http://localhost:3001/current_user", {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            this.setState({
              auth: {
                user: user,
              },
              loggingIn: false,
            });
            this.props.loadCurrentUser(this.state.auth.user);
          } else {
            this.setState({
              auth: {
                user: null,
                loggingIn: false,
              },
            });
          }
        });
    }
  }

  render() {
    let status = this.props.loggedIn;
    return (
      <div>
        {status ? (
          <NavBar
            logOutUser={this.logOutUser}
            setLoggedInUser={this.setLoggedInUser}
            history={this.history}
          />
        ) : null}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} status={status} logOutUser={this.logOutUser} />
            )}
          />
          <Route path="/login" render={(props) => <Login {...props} />} />

          <Route
            path="/signup"
            render={(props) => (
              <Signup {...props} setLoggedInUser={this.setLoggedInUser} />
            )}
          />
          <Route path="/network" render={(props) => <Network {...props} />} />
          <Route path="/settings" render={(props) => <Settings {...props} />} />

          <Route component={Notfound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (usr) => {
  return {
    user: usr.auth.user.user,
    loggedIn: usr.auth.loggedIn,
  };
};

export default connect(mapStateToProps, {
  loadCurrentUser,
  loadAllUsers,
  userEditFunction,
})(Routes);

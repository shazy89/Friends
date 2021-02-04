import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  TextInput,
  Icon,
  Col,
  Card,
  CardTitle,
  Button,
} from "react-materialize";
import { loadCurrentUser } from "../actions/auth";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import vid from "../assets/myVid.mp4";

class Login extends Component {
  //static propTypes = {
  //  setLoggedInUser: PropTypes.func.isRequired,
  //};
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        username: "",
        password: "",
      },
    };
  }

  formListener = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let currentCredState = Object.assign({}, this.state.credentials);
    currentCredState[name] = value;
    this.setState({
      credentials: currentCredState,
    });
    console.log(this.state);
  };

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

  loginUser = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    return fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          this.setLoggedInUser(res);
          window.location = "/";
        }
      });
  };

  render() {
    return (
      <div>
        <video
          autoPlay
          loop
          muted
          s={12}
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            right: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
            marginTop: "280px",
          }}
        >
          <source src={vid} type="video/mp4" />
        </video>

        <Row>
          <Col
            className="center container"
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              float: "none",
              marginTop: "10%",
            }}
          >
            <Card
              closeIcon={<Icon>close</Icon>}
              header={<h1 style={{ fontFamily: "cursive" }}>friends</h1>}
              revealIcon={<Icon>more_vert</Icon>}
              title="LogIn"
            >
              <TextInput
                s={12}
                placeholder="username"
                type="text"
                name="username"
                onChange={this.formListener}
              />
              <TextInput
                s={12}
                placeholder="password"
                type="password"
                name="password"
                onChange={this.formListener}
              />
              <Button
                placeholder="submit"
                type="submit"
                onClick={this.loginUser}
                node="button"
                waves="light"
                className="waves-effect orange btn"
              >
                <Icon right> check</Icon>
                LogIn
              </Button>
              <p>
                <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(user) {
  return {
    // user: user.auth.user.user,
    // friends: user.auth.friends,
    // chats: user.auth.chats,
  };
}
export default connect(mapStateToProps, { loadCurrentUser })(Login);

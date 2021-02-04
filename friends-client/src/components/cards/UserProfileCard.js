import React from "react";
import { Modal, Col, Card, Icon } from "react-materialize";
import { connect } from "react-redux";
import UserEditModal from "./UserEditModal";

const UserProfileCard = ({ user, history }) => {
  return (
    <div>
      <Col m={3} l={3} s={12}>
        <Card revealIcon={<Icon>edit</Icon>}>
          <Card>
            <div className="center">
              <Modal
                bottomSheet={false}
                fixedFooter={false}
                id="Modal-0"
                open={false}
                options={{
                  dismissible: true,
                  endingTop: "10%",
                  inDuration: 250,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  opacity: 0.5,
                  outDuration: 250,
                  preventScrolling: true,
                  startingTop: "4%",
                }}
                trigger={
                  <img
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "50%",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    src={user.avatar}
                    alt="user avatar"
                  />
                }
              >
                <div className="center">
                  <img
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "40%",
                    }}
                    src={user.avatar}
                    alt="user avatar"
                  />
                </div>
              </Modal>
            </div>
          </Card>
          <UserEditModal history={history} />
          <h4 style={{ fontFamily: "serif" }}>{user.username}</h4>
        </Card>
      </Col>
    </div>
  );
};

const mapStateToProps = (usr) => {
  return {
    user: usr.auth.user.user,
    loggedIn: usr.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(UserProfileCard);

import React, { useState } from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import Login from "./Login";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user, logOutUser }) => {
  return (
    <div>
      <Navbar
        alignLinks="right"
        className="3f51b5 indigo"
        brand={
          <NavLink style={{ fontFamily: "cursive" }} to="/">
            {" "}
            friends{" "}
          </NavLink>
        }
        centerChildren
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <NavItem>
          <NavLink to="/network">
            <Icon>supervisor_account</Icon> network{" "}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings">
            <Icon>settings</Icon> settings{" "}
          </NavLink>
        </NavItem>
        <NavItem onClick={(e) => logOutUser(e)}>Logout</NavItem>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (usr) => {
  return {
    user: usr.auth,
  };
};

export default connect(mapStateToProps)(NavBar);

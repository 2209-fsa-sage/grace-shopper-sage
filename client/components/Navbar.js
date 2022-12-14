import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, me } from "../store";
import MyCart from "./Pages/Cart/MyCart";
const Navbar = (props) => {
  const { authorized, loadInitialData, logout, user } = props;

  useEffect(() => {
    const checkLogin = async () => {
      loadInitialData();
    };

    checkLogin();
  }, []);

  const onClickHandler = async () => {
    await logout();
  };
  return (
    <div className="navbar">
      <div>
        <h1>Sage</h1>
        <h4>Find your new favorite mug</h4>
      </div>

      <nav>
        {user?.id ? (
          <div>
            <Link to="/">Home</Link>
            <Link
              to={{
                pathname: `/user/${user.id}`,
              }}
            >
              Profile
            </Link>
            <a href="#" onClick={onClickHandler}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>

      <MyCart />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth.authUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);

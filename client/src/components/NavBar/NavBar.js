import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import Login from "./Login/Login";
import "./NavBar.css";
import SignUp from "./SignUp/SignUp";
import UploadImage  from "./UploadImage/UploadImage";
import userimg from "../../images/img_avatar2.png";

export const NavBar = ({ user, logoutUser }) => {
  let history = useHistory();

  useEffect(() => {
    const modal = document.querySelector(".loginForm");
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }, []);

  const openLogin = () => {
    document.querySelector(".loginForm").style.display = "block";
  };

  const openSignUp = () => {
    document.querySelector(".signUpForm").style.display = "block";
  };

  const Logout = async () => {
    await history.push("/");
    await logoutUser();
  };

  const uploadImage = async () => {
    document.querySelector(".uploadImageForm").style.display = "block";
  };

  return (
    <div className="navbar">
      <NavLink to="/home" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/about" activeClassName="active">
        About
      </NavLink>
      <NavLink to="/contact" activeClassName="active">
        Contanct
      </NavLink>
      {user !== null ? (
        <>
          <NavLink to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>

          <NavLink to="/product" activeClassName="active">
            Product
          </NavLink>

          <NavLink to="/user" activeClassName="active">
            Users
          </NavLink>

          <div
            className="right btnLogin"
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </div>
          <div className="right imgUserDiv">
            <UploadImage />
            <img
              src={userimg}
              width={40}
              className="imgUser"
              onClick={() => {
                uploadImage();
              }}
              alt="UserImage"
            />
          </div>
        </>
      ) : (
        <>
          <div
            className="right btnLogin"
            onClick={() => {
              openLogin();
            }}
          >
            Login
            <Login />
          </div>
          <div
            className="right btnLogin"
            onClick={() => {
              openSignUp();
            }}
          >
            SignUp
            <SignUp />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

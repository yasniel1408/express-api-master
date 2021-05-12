import React, { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./Login.css";
import userimg from "../../../images/img_avatar2.png";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/userActions";
import Alert from "../../Alert/Alert";

const Login = ({ loginUser }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeModal = async () => {
    const modal = await document.querySelector(".loginForm");
    modal.style.display = "none";
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser({ email, password });
    (response)? history.push("/dashboard"): history.push("/home");
  };

  return (
    <div id="id01" className="modal loginForm">
      <form className="modal-content animate" onSubmit={onLogin}>
        <Alert 
          visible={true} 
          text="HOLAAAA" 
          serverity="error"
          />
        <div className="imgcontainer">
          <span
            onClick={() => closeModal()}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
          <img src={userimg} alt="Avatar" className="avatar" />
        </div>

        <div className="container">
          <Input
            text="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            required={true}
            setValue={setEmail}
            value={email}
          />

          <Input
            text="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            required={true}
            setValue={setPassword}
            value={password}
          />

          <Button type={"submit"} text="Login" />
          <Button text="Cancel" classbtn="cancelbtn" onclick={closeModal} />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.data,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: ({ email, password }) =>
      dispatch(loginUser({ email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

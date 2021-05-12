import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { loginUser, registerUser } from "../../../redux/actions/userActions";
import Alert from "../../Alert/Alert";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./SignUp.css";

const SignUp = ({ loading }) => {
  let history = useHistory();

  const [alert, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const closeModal = async () => {
    const modal = await document.querySelector(".signUpForm");
    modal.style.display = "none";
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setAlert(true);
      setTextAlert("Password dont'n mached!");
    }
    const response = await registerUser({ email, name, password });
    if (response === true) {
      history.push("/home");
    } else {
      setAlert(true);
      setTextAlert(response.err?response.err.message:"")
    }
  };

  return (
    <div className="signUpForm">
      <span onClick={() => closeModal()} className="close" title="Close Modal">
        &times;
      </span>
      <form className="modal-content animate" onSubmit={onRegister}>
        <Alert
          visible={alert}
          setAlert={setAlert}
          text={textAlert}
          serverity="error"
        />
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <Input
            text="Name"
            name="name"
            type="text"
            placeholder="Enter your Name"
            required={true}
            setValue={setName}
            value={name}
          />

          <Input
            text="Email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            required={true}
            setValue={setEmail}
            value={email}
          />

          <Input
            text="Password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            required={true}
            setValue={setPassword}
            value={password}
          />

          <Input
            text="Repeat Password"
            name="repeatPassword"
            type="password"
            placeholder="Enter your Repeat Password"
            required={true}
            setValue={setRepeatPassword}
            value={repeatPassword}
          />

          <div className="clearfix">
            <Button type={"submit"} text={loading ? "Cargando..." : "Login"} />
            <Button text="Cancel" classbtn="cancelbtn" onclick={closeModal} />
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.userdata,
    loading: state.userReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: ({ email, password }) =>
      dispatch(loginUser({ email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

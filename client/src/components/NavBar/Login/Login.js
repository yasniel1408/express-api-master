import React, { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./Login.css";
import userimg from "../../../images/img_avatar2.png";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/userActions";
import Alert from "../../Alert/Alert";

const Login = ({ loginUser, loading }) => {
  let history = useHistory();

  const [alert, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeModal = async () => {
    const modal = await document.querySelector(".loginForm");
    modal.style.display = "none";
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser({ email, password });
    if (response === true) {
      history.push("/dashboard");
    } else {
      setAlert(true);
      setTextAlert(response.err.message)
    }
  };

  return (
    <div className="modal loginForm">
      <form className="modal-content animate" onSubmit={onLogin}>
        <Alert
          visible={alert}
          setAlert={setAlert}
          text={textAlert}
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

          <Button type={"submit"} text={loading ? "Cargando..." : "Login"} />
          <Button text="Cancel" classbtn="cancelbtn" onclick={closeModal} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

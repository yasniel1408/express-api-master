import React from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./Login.css";
import userimg from "../../../images/img_avatar2.png";
const Login = (props) => {

  const closeModal = () => {
    const modal = document.querySelector(".loginForm");
    modal.style.display = "none";
  };

  return (
    <div id="id01" className="modal loginForm">
      <form className="modal-content animate" method="post">
        <div className="imgcontainer">
          <span
            onClick={()=>closeModal()}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
          <img src={userimg} alt="Avatar" className="avatar" />
        </div>

        <div className="container">
          <Input
            text="Username"
            name="username"
            type="text"
            placeholder="Enter Username"
            required={true}
          />

          <Input
            text="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            required={true}
          />

          <Button type={"submit"} text="Login" />
          <Button
            text="Cancel"
            classbtn="cancelbtn"
            onclick={closeModal}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

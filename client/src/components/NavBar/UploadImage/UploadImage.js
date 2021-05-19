import React, { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./UploadImage.css";
import userimg from "../../../images/img_avatar2.png";
import Alert from "../../Alert/Alert";

const UploadImage = () => {
  const [alert, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const [loading, setLoading] = useState(false);

  const closeModal = async () => {
    try {
      const modal = await document.querySelector(".uploadImageForm");
      modal.style.display = "none";
    } catch (error) {
      // console.log(error)
    }
    setAlert(false);
    setTextAlert("");
  };

  const onUploadImage = async (e) => {
    e.preventDefault();
    alert("OKOK");
  };

  return (
    <div className="modal uploadImageForm">
      <form
        className="modal-content animate"
        onSubmit={onUploadImage}
        encType="multipart/form-data"
      >
        <div className="imgcontainer">
          <span
            onClick={() => closeModal()}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
          <img src={userimg} alt="Avatar" className="avatar2" />
        </div>

        <div className="container">
          <Input
            text="Avatar"
            name="avatar"
            type="file"
            required={true}
            // setValue={setEmail}
            // value={email}
          />

          <Alert
            visible={alert}
            setAlert={setAlert}
            text={textAlert}
            serverity="error"
          />

          <Button type={"submit"} text={loading ? "Cargando..." : "Login"} />
          <Button text="Cancel" classbtn="cancelbtn" onclick={closeModal} />
        </div>
      </form>
    </div>
  );
};

export default UploadImage;

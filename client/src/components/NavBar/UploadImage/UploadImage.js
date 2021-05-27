import React, { useRef, useState } from "react";
import Button from "../../Button/Button";
import "./UploadImage.css";
import userimg from "../../../images/img_avatar2.png";
import Alert from "../../Alert/Alert";
import { HTTP_SERVER_DIR } from "../../../utils/rutasAPI";
import { connect } from "react-redux";
import { changeAvatar } from "../../../redux/actions/userActions";

const UploadImage = ({ user, changeAvatar }) => {
  const [alert, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [serverity, setServerity] = useState("error");

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState();

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

  const handleImageUpload = (e) => {
    setAvatar(e.target.files[0]);
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      reader.onprogress = (e) =>{
        console.log(e.total, e.loaded)
      }
    }
  };

  const onUploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("avatar", avatar);
    const response = await changeAvatar({ formData, _id: user._id });
    if (response === true) {
      setAlert(true);
      setServerity("success");
      setTextAlert("Imagen subida correctamente!");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      setAlert(true);
      setServerity("error");
      setTextAlert(response.err.message);
    }
    setLoading(false);
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
        </div>

        <div className="container">
          <div className="form-grup fileInput">
            <img
              className="fileImage"
              src={user.avatar ? HTTP_SERVER_DIR + user.avatar : userimg}
              ref={uploadedImage}
              alt="imageUser"
            />
            <input
              onChange={(e) => handleImageUpload(e)}
              id="photo-avatar"
              accept="image/*"
              ref={imageUploader}
              className="inputFileHidden"
              name="avatar"
              type="file"
              required
            />
            <label
              htmlFor="photo-avatar"
              className={"btnFileUpload"}
              type={"button"}
            >
              {"Upload image"}
            </label>
          </div>

          <Alert
            visible={alert}
            setAlert={setAlert}
            text={textAlert}
            serverity={serverity}
          />

          <Button type={"submit"} text={loading ? "Cargando..." : "Save"} />
          <Button text="Cancel" classbtn="cancelbtn" onclick={closeModal} />
        </div>
      </form>
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
    changeAvatar: ({ formData, _id }) =>
      dispatch(changeAvatar({ formData, _id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);

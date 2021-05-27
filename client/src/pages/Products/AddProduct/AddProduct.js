import React, { useEffect, useState } from "react";
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import UseAxios from "../../../utils/UseAxios";
import "./AddProduct.css";
import { urlProduct } from "../../../utils/rutasAPI";
import Swal from "sweetalert2";

export const AddProduct = ({ _id, loadTable }) => {
  const [alert, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [serverity] = useState("error");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const [loading, setLoading] = useState(false);


  const closeModal = async () => {
    const modal = await document.querySelector(".addProductForm");
    modal.style.display = "none";
    setAlert(false);
    setTextAlert("");
  };

  const onAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await UseAxios({
      method: "post",
      url: `${urlProduct}`,
      data: {
        name,
        description,
      },
    });
    if (!response.hasOwnProperty("err")) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User deleted correctly!",
        text: "The user has been removed.",
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
      setLoading(false);
      loadTable();
    } else {
      setLoading(false);
      setAlert(true);
      setTextAlert(response.err.message);
    }
  };

  return (
    <div className="addProductForm">
      <form className="modal-content animate" onSubmit={onAddProduct}>
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
          <h1>Add Product</h1>
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
            text="Description"
            name="description"
            type="text"
            placeholder="Enter your description"
            required={true}
            setValue={setDescription}
            value={description}
          />

          <Alert
            visible={alert}
            setAlert={setAlert}
            text={textAlert}
            serverity={serverity}
          />

          <div className="clearfix">
            <Button type={"submit"} text={loading ? "Cargando..." : "Save"} />
            <Button text="Cancel" classbtn="cancelbtn" onclick={closeModal} />
          </div>
        </div>
      </form>
    </div>
  );
};


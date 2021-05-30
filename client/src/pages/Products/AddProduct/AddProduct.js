import React, { useState } from "react";
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import "./AddProduct.css";
import io from "socket.io-client";

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

  const onSocketAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const socket = io("/");
    socket.emit("new_product_data", { name, description });
    socket.on("new_product_created", function (response) {
      if (response) {
        closeModal();
        loadTable();
        setLoading(false);
      }
    });
  };

  return (
    <div className="addProductForm">
      <form className="modal-content animate" onSubmit={onSocketAddProduct}>
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

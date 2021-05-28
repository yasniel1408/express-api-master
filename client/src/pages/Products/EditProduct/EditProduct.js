import React, { useEffect, useState } from "react";
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import UseAxios from "../../../utils/UseAxios";
import "./EditProduct.css";
import { urlProduct } from "../../../utils/rutasAPI";
import Swal from "sweetalert2";

export const EditProduct = ({ _id, loadTable }) => {
  const [alert, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [serverity] = useState("error");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (_id !== "") {
        const response = await UseAxios({
          method: "get",
          url: `${urlProduct}/${_id}`,
        });
        setDescription(response.product.description);
        setName(response.product.name);
      }
    };
    loadProduct();
  }, [_id]);

  const closeModal = async () => {
    const modal = await document.querySelector(".editProductForm");
    modal.style.display = "none";
    setAlert(false);
    setTextAlert("");
  };

  const onEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await UseAxios({
      method: "put",
      url: `${urlProduct}/${_id}`,
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
    <div className="editProductForm">
      <form className="modal-content animate" onSubmit={onEditProduct}>
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
          <h1>Edit User</h1>
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


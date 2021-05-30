import React, { useEffect, useState } from "react";
import "./Home.css";
import { Product } from "./Product";
import { Users } from "./Users";

import io from "socket.io-client";
import UseAxios from "../../utils/UseAxios";
import { urlProduct } from "../../utils/rutasAPI";
import Button from "../../components/Button/Button";
const socket = io("/");

export function Home() {
  const [products, setProducts] = useState([]);
  const [productsNew, setProductsNew] = useState(0);
  const [productsDeletedMessages, setProductsDeletedMessages] = useState([]);
  let contador = 1;

  useEffect(() => {
    cargarProducts();

    socket.on("new_product_created", async (response) => {
      if (response) setProductsNew(contador++);
    });

    socket.on("product_deleted", async (response) => {
      let list = [...productsDeletedMessages];
      list.push(response.oldProduct)
      setProductsDeletedMessages(list);
      console.log(list);
    });
  }, [productsDeletedMessages]);

  const cargarProducts = async () => {
    const response = await UseAxios({
      url: urlProduct,
      method: "get",
    });
    setProducts(response.products.reverse());
  };

  const UploadNewProducts = () => {
    setProductsNew([]);
    cargarProducts();
  };

  const ReloadProducts = () => {
    setProductsDeletedMessages([]);
    cargarProducts();
  };

  return (
    <div className="row animate" style={{ minHeight: "70vh" }}>
      <div className="side">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <div className="fakeimg" style={{ height: 200 }}>
          Image
        </div>
        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        <h3>Users</h3>

        <Users />

        <br />
      </div>
      <ul className="main">
        {productsNew > 0 ? (
          <Button
            text={`Upload (${productsNew}) new products now!!!`}
            onclick={UploadNewProducts}
          />
        ) : (
          ""
        )}
        {!!productsDeletedMessages &&
          productsDeletedMessages.map((p) => (
            <div>
              <p>El producto con nombre "{p.name}" ha sido eliminado</p>
            </div>
          ))}
        {productsDeletedMessages.length > 0 ? (
          <Button text={`Reload Now!`} onclick={ReloadProducts} />
        ) : (
          ""
        )}

        {!!products && products.map((p) => <Product key={p._id} p={p} />)}
      </ul>
    </div>
  );
}

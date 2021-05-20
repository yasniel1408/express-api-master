import React, { useEffect } from "react";
import "./Products.css";
import $ from "jquery";
import { urlGetProductsDataTable } from "../../utils/rutasAPI";
import refreshToken from "../../utils/refreshToken";
require("datatables.net");

export const Products = () => {
  useEffect(() => {
    loadTable();
  });

  const loadTable = async () => {
    $("#table-products").dataTable().fnDestroy();
    $("#table-products").DataTable({
      responsive: false,
      ajax: {
        method: "GET",
        url: urlGetProductsDataTable,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        error: async(xhr, error, thrown) => {
          if(xhr.status === 403){
            await refreshToken()
            await loadTable()
          }
          console.log(xhr.status);
        },
      },
      columns: [
        {
          data: "_id",
          type: "string",
          visible: true,
          searchable: false,
        },
        {
          data: "name",
          type: "string",
          visible: true,
          searchable: true,
        },
        {
          data: "description",
          type: "string",
          visible: true,
          searchable: true,
        },
      ],
      dom: "BRlfrtipRT",
      pageLength: 10,
      processing: true,
      serverSide: true,
    });
  };

  return (
    <div className="contentProduct animate">
      <table id="table-products">
        <thead>
          <tr>
            <th>Id Producto</th>
            <th>Nomber</th>
            <th>Descripción</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};


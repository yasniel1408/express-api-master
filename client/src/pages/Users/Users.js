import React, { useEffect, useState } from "react";
import "./Users.css";
import { urlUser } from "../../utils/rutasAPI";
import $ from "jquery";
import { urlGetUserDataTable } from "../../utils/rutasAPI";
import refreshToken from "../../utils/refreshToken";
import UseAxios from "../../utils/UseAxios";
import Swal from "sweetalert2";
import { EditUser } from "./EditUser/EditUser";
import userimg from "../../images/img_avatar2.png";

require("datatables.net");

export const Users = () => {
  const [_id, set_id] = useState("");

  useEffect(() => {
    loadTable();
  });

  const loadTable = async () => {
    $("#table-users").dataTable().fnDestroy();
    $("#table-users").DataTable({
      responsive: true,
      ajax: {
        method: "GET",
        url: urlGetUserDataTable,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        error: async (xhr, error, thrown) => {
          if (xhr.status === 403) {
            await refreshToken();
            await loadTable();
          }
          console.log(JSON.parse(xhr.responseText).message);
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
          data: "avatar",
          visible: true,
          searchable: true,
          render: (e) => {
            return `<img class="imgUserTable" src="${(e)?e:userimg}" alt="userImg" />`;
          },
        },
        {
          data: "name",
          type: "email",
          visible: true,
          searchable: true,
        },
        {
          data: "email",
          type: "string",
          visible: true,
          searchable: true,
        },
        {
          data: "signupDate",
          type: "string",
          visible: true,
          searchable: false,
        },
        {
          data: null,
          visible: true,
          searchable: false,
          render: (e) => {
            let actions = "";
            actions += `<a href="#" data-id=${e._id} data-toggle="tooltip" data-placement="top" title="Edit" class="mr-2 edit"><svg class="svgBlueTeal" version="1.2" overflow="visible" preserveAspectRatio="none" viewBox="0 0 20 20" width="20" height="20"><g transform="translate(0, 0)"><g transform="translate(0, 0) rotate(0)"><path d="M9.99973,0c-5.52264,0 -9.99973,4.4774 -9.99973,9.9998c0,5.5224 4.4771,10.0002 9.99973,10.0002c5.52264,0 10.00027,-4.47753 10.00027,-10.0002c0,-5.52267 -4.47763,-9.9998 -10.00027,-9.9998zM14.7535,7.19633l-0.94981,0.9498l-1.93341,-1.93327l-0.73347,0.73347l1.93341,1.9334l-4.74216,4.74173l-1.93328,-1.93307l-0.73347,0.73347l1.93328,1.93327l-0.47254,0.47253l-0.009,-0.009c-0.0524,0.08627 -0.1376,0.1492 -0.2388,0.17167l-1.80288,0.402c-0.027,0.00607 -0.05447,0.009 -0.0816,0.009c-0.0984,0 -0.194,-0.03873 -0.26487,-0.1098c-0.09093,-0.0906 -0.1288,-0.22147 -0.1008,-0.34687l0.4018,-1.80233c0.02267,-0.10113 0.08573,-0.18653 0.17187,-0.2388l-0.00913,-0.00913l7.63138,-7.63167c0.11187,-0.11167 0.2936,-0.11167 0.40547,0.00033l1.52814,1.5278c0.11187,0.11187 0.11187,0.2936 -0.00013,0.40547z" vectorEffect="non-scaling-stroke" style={{strokeWidth: 0, strokeLinecap: 'butt', strokeLinejoin: 'miter', fill: 'rgb(0, 188, 225)'}} /></g><defs><path id="path-161469920969426323" d="M9.99973,0c-5.52264,0 -9.99973,4.4774 -9.99973,9.9998c0,5.5224 4.4771,10.0002 9.99973,10.0002c5.52264,0 10.00027,-4.47753 10.00027,-10.0002c0,-5.52267 -4.47763,-9.9998 -10.00027,-9.9998zM14.7535,7.19633l-0.94981,0.9498l-1.93341,-1.93327l-0.73347,0.73347l1.93341,1.9334l-4.74216,4.74173l-1.93328,-1.93307l-0.73347,0.73347l1.93328,1.93327l-0.47254,0.47253l-0.009,-0.009c-0.0524,0.08627 -0.1376,0.1492 -0.2388,0.17167l-1.80288,0.402c-0.027,0.00607 -0.05447,0.009 -0.0816,0.009c-0.0984,0 -0.194,-0.03873 -0.26487,-0.1098c-0.09093,-0.0906 -0.1288,-0.22147 -0.1008,-0.34687l0.4018,-1.80233c0.02267,-0.10113 0.08573,-0.18653 0.17187,-0.2388l-0.00913,-0.00913l7.63138,-7.63167c0.11187,-0.11167 0.2936,-0.11167 0.40547,0.00033l1.52814,1.5278c0.11187,0.11187 0.11187,0.2936 -0.00013,0.40547z" vectorEffect="non-scaling-stroke" /></defs></g></svg></a>`;
            if (e._id !== "60a3f51c88dbaa13f456b09a")
              actions += `<a href="#" data-id=${e._id} data-toggle="tooltip" data-placement="top" title="Delete" class="mr-2 delete"><svg class="svgRed" version="1.2" overflow="visible" preserveAspectRatio="none" viewBox="0 0 15 20" width="15" height="20"><g transform="translate(0, 0)"><g transform="translate(0, 0) rotate(0)"><path d="M1.07141,4.44443h12.85717v13.33333c0,1.22781 -0.95891,2.22224 -2.14283,2.22224h-8.57146c-1.18396,0 -2.14288,-0.99443 -2.14288,-2.22224zM15,1.11109v2.22224h-15v-2.22224h3.74997l1.07146,-1.11109h5.35712l1.07146,1.11109z" vectorEffect="non-scaling-stroke" style={{strokeWidth: 0, strokeLinecap: 'butt', strokeLinejoin: 'miter', fill: 'rgb(212, 0, 62)'}} /></g><defs><path id="path-161469920966426008" d="M1.07141,4.44443h12.85717v13.33333c0,1.22781 -0.95891,2.22224 -2.14283,2.22224h-8.57146c-1.18396,0 -2.14288,-0.99443 -2.14288,-2.22224zM15,1.11109v2.22224h-15v-2.22224h3.74997l1.07146,-1.11109h5.35712l1.07146,1.11109z" vectorEffect="non-scaling-stroke" /></defs></g></svg></a>`;
            return actions;
          },
        },
      ],
      dom: "BRlfrtipRT",
      pageLength: 10,
      processing: true,
      serverSide: true,
    });
  };

  //DELETE
  $(document).on("click", ".delete", function (event) {
    Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete the user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Accept`,
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const _id = $(this).data("id");
        const response = await UseAxios({
          method: "delete",
          url: `${urlUser}/${_id}`,
        });
        if (!response.hasOwnProperty("err")) {
          loadTable();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User deleted correctly!",
            text: "The user has been removed.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  });

  //EDIT
  $(document).on("click", ".edit", function (event) {
    const currentId = $(this).data("id");
    set_id(currentId);
    document.querySelector(".editUserForm").style.display = "block";
  });

  return (
    <div className="contentUsers animate">
      <table id="table-users">
        <thead>
          <tr>
            <th>Id User</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Signup Date</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <EditUser _id={_id} loadTable={loadTable} />
    </div>
  );
};

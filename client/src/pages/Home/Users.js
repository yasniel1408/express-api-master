import React, { useEffect, useState } from "react";
import UseAxios from "../../utils/UseAxios";
import { urlUser } from "../../utils/rutasAPI";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      const response = await UseAxios({
        url: urlUser,
        method: "get",
      });
      setUsers(response.users);
    };
    onLoad();
  }, []);

  const User = ({ user }) => (
    <div className="userItem">
      <img
        src={user.avatar}
        width={50}
        height={50}
        alt={`image_${user.name}`}
        style={{ borderRadius: "50%", marginRight: 19, objectFit: "cover" }}
      />
      <div>
        <p>{user.name}</p>
        <p style={{ fontSize: 10 }}>{user.email}</p>
      </div>
    </div>
  );

  if (!users) return "NO HAY USERS";

  return !!users.length && users.map((user) => <User key={user._id} user={user} />);
};

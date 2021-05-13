import jwt_decode from "jwt-decode";

const decodeToken = async () => {
  let token = localStorage.getItem("auth-token");
  return await jwt_decode(token);
};

export default decodeToken;

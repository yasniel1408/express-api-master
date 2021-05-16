import jwt_decode from "jwt-decode";

const decodeToken = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const user = await jwt_decode(token);
    return user;
  } catch (error) {
    // console.log(error)
  }
};

export default decodeToken;

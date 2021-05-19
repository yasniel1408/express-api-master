import { urlRefreshToken } from "./rutasAPI";
import decodeToken from "./decodeToken";
import axios from "axios";

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  const res = await decodeToken();
  if (refreshToken) {
    let newToken = await axios({
      method: "post",
      url: urlRefreshToken,
      data: { refreshToken, email: res.user.email },
    });
    if (newToken.data.token) {
      localStorage.setItem("auth-token", newToken.data.token);
      return true;
    }else{
      // localStorage.setItem("auth-token", "");
      // localStorage.setItem("refresh-token", "");
    }
  }
  return false;
};

export default refreshToken;
import axios from "axios";
import refreshToken from "./refreshToken";

const useAxios = async ({ method, url, data }) => {
  let token = localStorage.getItem("auth-token");
  const peticion = async() => {
    return await axios({
      method,
      url,
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => {
        return true;
      },
    });
  }
  const response = await peticion()
  if(response.data.hasOwnProperty("auth")){
    if(!response.data.auth){
      await refreshToken()
      await peticion()
    }
  }

  return response.data;
};

export default useAxios;

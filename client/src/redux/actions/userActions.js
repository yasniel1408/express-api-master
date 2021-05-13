import { ActionTypes } from ".";
import { urlLogin, urlRegister, urlLogout } from "../../utils/rutasAPI";
import verifiedToken from "../../utils/refreshToken";
import useAxios from "../../utils/useAxios";
import decodeToken from "../../utils/decodeToken";

export const userFetch = () => ({
  type: ActionTypes.USER_FETCH,
});

export const userSuccess = (data) => ({
  type: ActionTypes.USER_SUCCESS,
  payload: data,
});

export const userStopFetch = () => ({
  type: ActionTypes.USER_STOP_FETCH,
});

export const autoLoginUser = () => {
  return async (dispatch) => {
    await dispatch(userFetch());
    let userDelToken = await verifiedToken();
    if (userDelToken) {
      await dispatch(userSuccess(userDelToken));
      return true;
    } else {
      return false;
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(userFetch());
    const response = await useAxios({
      method: "post",
      url: urlLogin,
      data: { email, password },
    });
    if (response.hasOwnProperty("err")) {
      dispatch(userStopFetch());
      return response;
    }
    localStorage.setItem("auth-token", response.token);
    localStorage.setItem("refresh-token", response.refreshToken);
    let userDelToken = await decodeToken();
    dispatch(userSuccess(userDelToken));
    return true;
  };
};

export const registerUser = ({ email, name, password }) => {
  return async (dispatch) => {
    dispatch(userFetch());
    const response = await useAxios({
      method: "post",
      url: urlRegister,
      data: { email, name, password },
    });
    if (response.hasOwnProperty("err")) {
      dispatch(userStopFetch());
      return response;
    }
    dispatch(userStopFetch());
    return true;
  };
};

// export const logoutUser = () =>{
//     return async(dispatch) => {
//         dispatch(userFetch());
//         const response = await verifiedToken();
//         if(response === false){
//             return `El Token no es valido`;
//         }else{
//             const ok = await Axios.post(urlLogout,{
//                 "headers":{
//                     'Authorization': localStorage.getItem('auth-token')
//                 }
//             })
//             if(ok.status !== 200) return `Ha ocurrido un error al salir`;
//             localStorage.setItem("auth-token", "")
//         }
//         dispatch(userStopFetch());
//         return true;
//     }
// }

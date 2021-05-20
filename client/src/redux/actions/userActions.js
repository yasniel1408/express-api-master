import { ActionTypes } from ".";
import {
  urlLogin,
  urlRegister,
  urlLogout,
  urlAvatar,
} from "../../utils/rutasAPI";
import useAxios from "../../utils/UseAxios";
import decodeToken from "../../utils/decodeToken";
import UseAxios from "../../utils/UseAxios";

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
    dispatch(userFetch());
    let userDelToken = await decodeToken();
    if (userDelToken) {
      dispatch(userSuccess(userDelToken));
      return true;
    } else {
      return false;
    }
  };
};

export const changeAvatar = ({ formData, _id }) => {
  return async (dispatch) => {
    const response = await UseAxios({
      method: "post",
      url: `${urlAvatar}/${_id}`,
      data: formData,
    });
    if (response.hasOwnProperty("err")) {
      return response;
    }
    let userDelToken = await decodeToken();
    userDelToken.user.avatar = response.user.avatar
    dispatch(userSuccess(userDelToken));
    return true;
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

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(userFetch());
    const response = await useAxios({
      method: "post",
      url: urlLogout,
      data: { refreshToken: localStorage.getItem("refresh-token") },
    });
    if (response.auth === false) {
      localStorage.setItem("auth-token", response.token);
      localStorage.setItem("refresh-token", response.token);
    }
    dispatch(userStopFetch());
    return true;
  };
};

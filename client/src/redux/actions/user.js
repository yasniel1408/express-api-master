import { USER_FETCH, USER_SUCCESS, USER_STOP_FETCH } from "./actionTypes";
import Axios from "axios";
import {urlLogin, urlRegister, urlLogout, urlCrearOGuardarPerfil, urlActulizarUsernameEmail, urlActulizarPassword} from '../../utils/rutasAPI'
import verifiedToken from "../validations/verifiedToken";
import jwt_decode from 'jwt-decode'

export const userFetch = () => ({
    type: USER_FETCH
});

export const userSuccess = data => ({
    type: USER_SUCCESS,
    payload: data,
});

export const userStopFetch = () => ({
    type: USER_STOP_FETCH
});

export const updatePassword = ({password, user_id}) => {
    return async(dispatch) => {
        await dispatch(userFetch());
        const response = await Axios.post(urlActulizarPassword, {password, user_id}, {
            "headers":{
                'Authorization': localStorage.getItem('auth-token')
            }
        })
        if(response.data.u){
            if(response.data.u.nModified){
                dispatch(userStopFetch());
                return {message: response.data.status, severity: "success"};
            }else{
                dispatch(userStopFetch());
                return {message: "Error de conexión", severity: "error"};
            }
        }else{
            if(!response.data.ok){
                dispatch(userStopFetch());
                return {message: "Los campos no pueden estar vacios", severity: "error"};
            }
        }
    }
}

export const updateUser = userCurrent => {
    return async(dispatch) => {
        await dispatch(userFetch());
        const response = await Axios.post(urlActulizarUsernameEmail, userCurrent, {
            "headers":{
                'Authorization': localStorage.getItem('auth-token')
            }
        })
        if(response.data.token){
            localStorage.setItem('auth-token', response.data.token)
            let userCurrent = await jwt_decode(response.data.token)
            await dispatch(userSuccess(userCurrent));
            return {message: response.data.status, severity: "success"};
        }else{
            dispatch(userStopFetch());
            return {message: "Error de conexión", severity: "error"};
        }
    }
}

export const updateProfile = profile => {
    return async(dispatch) => {
        await dispatch(userFetch());
        if(profile.age< 10 || profile.age > 100){
            dispatch(userStopFetch());
            return {message: "La edad solo puede estar en el rango de 10 a 100", severity: "error"};
        }
        const response = await Axios.post(urlCrearOGuardarPerfil, profile, {
            "headers":{
                'Authorization': localStorage.getItem('auth-token')
            }
        })
        if(response.data.token){
            localStorage.setItem('auth-token', response.data.token)
            let userDelToken = await jwt_decode(response.data.token)
            console.log(userDelToken)
            await dispatch(userSuccess(userDelToken));
            return {message: response.data.status, severity: "success"};
        }else{
            dispatch(userStopFetch());
            return {message: "Error de conexión", severity: "error"};
        }
    }
}

export const autoLoginUser = () => {
    return async(dispatch) => {
        await dispatch(userFetch());
        let userDelToken = await verifiedToken();
        if(userDelToken){
            await dispatch(userSuccess(userDelToken));
            return true;            
        }else{
            return false;
        }
    }
}

export const loginUser = ({username, password}) => {
    return async(dispatch) => {
        dispatch(userFetch());
        const response = await Axios.post(urlLogin, {username, password}, {
            "headers":{
                'Content-Type': 'application/json'
            }
        })
        if(response.data.ok === false || !response.data.token){
            dispatch(userStopFetch());
            return response.data.err.message;
        }
        localStorage.setItem('auth-token', response.data.token);
        let userDelToken =await verifiedToken();
        dispatch(userSuccess(userDelToken));
        return true;
    }
}

export const registerUser = ({username, password, email}) =>{
    return async(dispatch) => {
        dispatch(userFetch());
        const response = await Axios.post(urlRegister, {username, password, email}, {
            "headers":{
            'Content-Type': 'application/json'
            }
        })
        if(response.data.name === "MongoError" && response.data.keyValue.username){
            return `El usuario ${response.data.keyValue.username} ya existe`;
        }else if(response.data.name === "MongoError" && response.data.keyValue.email){
            return `El email ${response.data.keyValue.email} ya existe`;
        }
        dispatch(userStopFetch());
        return true;
    }
}

export const logoutUser = () =>{
    return async(dispatch) => {
        dispatch(userFetch());
        const response = await verifiedToken();
        if(response === false){
            return `El Token no es valido`;
        }else{
            const ok = await Axios.post(urlLogout,{
                "headers":{
                    'Authorization': localStorage.getItem('auth-token')
                }
            })
            if(ok.status !== 200) return `Ha ocurrido un error al salir`;
            localStorage.setItem("auth-token", "")
        }
        dispatch(userStopFetch());
        return true;
    }
}
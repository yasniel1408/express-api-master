import { ActionTypes } from "."
import Axios from "axios";
import {urlLogin, urlRegister, urlLogout, urlCrearOGuardarPerfil, urlActulizarUsernameEmail, urlActulizarPassword} from '../../utils/rutasAPI'
import verifiedToken from "../validations/verifiedToken";

export const userFetch = () => ({
    type: ActionTypes.USER_FETCH
});

export const userSuccess = data => ({
    type: ActionTypes.USER_SUCCESS,
    payload: data,
});

export const userStopFetch = () => ({
    type: ActionTypes.USER_STOP_FETCH
});

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
        if(response.data.auth === false || !response.data.token){
            dispatch(userStopFetch());
            return response.data.err;
        }
        localStorage.setItem('auth-token', response.data.token);
        let userDelToken = await verifiedToken();
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
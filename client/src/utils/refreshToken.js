import {urlRefreshToken} from './rutasAPI';
import jwt_decode from 'jwt-decode'; 
import useAxios from './useAxios';
import decodeToken from './decodeToken';

export const refreshToken = async() => {
    const token = localStorage.getItem('auth-token')
    const refreshToken = localStorage.getItem('refresh-token')
    const user = decodeToken()

    if(token !== null && token !== ""){

      let newToken = await useAxios({
        method: "post",
        url: urlRefreshToken,
        data: { refreshToken, "" },
      });

      if(newToken.data.auth){
        return jwt_decode(token)
      }
    }
    return false;
}

export default refreshToken
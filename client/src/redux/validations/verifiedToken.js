import Axios from 'axios';
import {urlVerifiedToken} from '../../utils/rutasAPI';
import jwt_decode from 'jwt-decode'; 

export const verifiedToken = async() => {
    let token = localStorage.getItem('auth-token')
    if(token !== null && token !== ""){
      let tokenValid = await Axios({
        method: "POST",
        url: urlVerifiedToken,
        headers: {                    
          Accept: "application/json",                    
          "Content-Type": "application/json",
          Authorization: token                
        }
      })
      if(tokenValid.data.ok){
        return jwt_decode(token)
      }
    }
    return false;
}

export default verifiedToken
import axios from "axios";

const useAxios = async({ method, url, data }) => {
  try {
    let token = localStorage.getItem('auth-token')
    const response = await axios({
        method,
        url,
        data,
        headers: {                    
          "Accept": "application/json",                    
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`                
        },
        validateStatus: (status) => {
            return true;
        },
      })
      return response.data
  } catch (error) {
      console.log(error)
  }
};
export default useAxios;

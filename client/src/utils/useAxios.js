import axios from "axios";

const useAxios = async({ method, url, data }) => {
  try {
    const response = await axios({
        method,
        url,
        data,
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

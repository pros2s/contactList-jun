import axios from 'axios';


interface axiosParams {
  url: string,
  method: string,
  data?: any
}

const callAPI = async ({ url, method, data }: axiosParams) => {
  return await axios({
    url,
    method,
    data,
  });
};


export default callAPI;

import axios from 'axios';


const callAPI = async ({ url, method, data }) => {
  return await axios({
    url,
    method,
    data,
  });
};


export default callAPI;

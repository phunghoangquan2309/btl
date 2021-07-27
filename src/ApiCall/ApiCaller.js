import axios from 'axios';
import * as Config from './../constant/Config';
export default function callAPI(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}

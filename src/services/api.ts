import Axios from 'axios';

const baseURL = 'https://urna-api-v1.herokuapp.com';

const api = Axios.create({
  baseURL,
});

export default api;

import Axios from 'axios';

const baseURL = 'http://localhost:3333/';

const api = Axios.create({
  baseURL,
});

export default api;

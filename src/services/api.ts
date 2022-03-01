import Axios from 'axios';

const baseURL = 'https://polar-eyrie-78797.herokuapp.com/';

const api = Axios.create({
  baseURL,
});

export default api;

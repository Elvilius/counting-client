import axios from 'axios';

const { VUE_APP_API_URL: baseURL } = { VUE_APP_API_URL: 'http://localhost:4000' };

export default axios.create({ baseURL });
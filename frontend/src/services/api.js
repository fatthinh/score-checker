import axios from "axios";

// const API_BASE_URL = 'http://52.221.193.90:8080/seventee/api/';
const API_BASE_URL = "http://localhost:8000/app/";

const baseConfig = {
  baseURL: API_BASE_URL,
};

export default axios.create(baseConfig);

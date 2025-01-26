import axios from "axios";

const API_BASE_URL = "https://lpthinh-sparta.site/app/";

const baseConfig = {
  baseURL: API_BASE_URL,
};

export default axios.create(baseConfig);

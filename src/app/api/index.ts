import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL;

const api = axios.create({
  baseURL
});

export default api;
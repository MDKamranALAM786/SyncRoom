import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const client = axios.create({
    baseURL: BASE_URL,
    credentials: true
});

export default client;


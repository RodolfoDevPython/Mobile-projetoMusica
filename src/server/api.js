import axios from "axios";

const api = axios.create({
    baseURL : "http://a7949b6eb852.ngrok.io/api"
});

export default api;
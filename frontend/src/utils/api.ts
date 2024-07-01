import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:8680/'
});

export default httpClient;
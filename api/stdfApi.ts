import axios from "axios";

export const stdfApi = axios.create({
    baseURL: "http://localhost:3000/",
    
})
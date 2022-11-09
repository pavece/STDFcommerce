import axios from "axios";

export const stdfApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
});

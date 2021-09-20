import axios from "axios";

//create new axios instance
export default axios.create({
  baseURL: process.env.baseUrl
});

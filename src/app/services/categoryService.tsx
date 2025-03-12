import axios from "axios";
import config from "../config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.category}`, { params })
    .then((response: any) => response.data);
}
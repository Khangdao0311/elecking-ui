import axios from "axios";
import config from "../config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.stats}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

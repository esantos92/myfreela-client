import axios from "axios";

export const api = new axios.create({
  baseURL: 'https://myfreela.gigalixirapp.com/api/',
});
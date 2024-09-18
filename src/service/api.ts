import axios from 'axios';

export const clients = axios.create({
  baseURL: 'http://localhost:3000/authentication',
});

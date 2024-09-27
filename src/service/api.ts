import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'http://localhost:3001/authentication',
});

export const roomApi = axios.create({
  baseURL: 'http://localhost:3001/room',
});

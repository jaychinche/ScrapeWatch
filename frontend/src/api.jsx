// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scrapewatch.onrender.com',
});

export default api;

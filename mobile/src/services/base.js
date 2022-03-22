import axios from 'axios';

const url = 'http://7714-187-180-189-201.ngrok.io/'
// const url = 'https://localhost:80/';
const baseUrl = axios.create({
  baseURL: url
});

export { baseUrl, url };
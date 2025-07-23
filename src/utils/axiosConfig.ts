import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // replace with your base if different
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODdmZDU0MWRmNDJlYmQyMWZjMDg4ZDgwM2U0ZjY4NCIsIm5iZiI6MTc1MzAyMjg2Mi42NDMwMDAxLCJzdWIiOiI2ODdkMDE4ZTIyMzEwMmJjM2U1NWNiN2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t6XqlIETS2RmRxKemHEoWd7Mu_OPPKaTJIlBUctYSL0`, // Your Bearer token
    'Content-Type': 'application/json',
  },
});

export default API; 
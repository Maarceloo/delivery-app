import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001',
});

export const postLogin = async (endpoint, body) => {
  const { data } = await request.post(endpoint, body);
  return data;
};
export default request;

import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getData = async (endpoint) => {
  const { data } = await request.get(endpoint);
  return data;
};

export const postData = async (endpoint, body, token) => {
  const { data } = await request.post(endpoint, body, { headers: {
    Authorization: token,
  } });
  return data;
};
export default request;

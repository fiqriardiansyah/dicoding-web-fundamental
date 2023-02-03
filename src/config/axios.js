import axios from 'axios';
import { responseLogger, requestLogger, errorLogger } from 'axios-logger';

const client = axios.create();

client.defaults.baseURL = process.env.BASE_URL;
client.defaults.timeout = 10000;
client.defaults.validateStatus = () => true;

client.interceptors.request.use((req) => {
  req.params = {
    api_key: `${process.env.API_KEY}`,
  };
  return process.env.NODE_ENV === 'development' ? requestLogger(req) : req;
}, (error) => (process.env.NODE_ENV === 'development' ? errorLogger(error) : error));

client.interceptors.response.use((res) => {
  const { status, data } = res;
  if (status !== 200) {
    alert(data?.status_message || 'Ooops something went wrong');
  }
  return process.env.NODE_ENV === 'development' ? responseLogger(res) : res;
}, (error) => {
  if (error.response?.status !== 200) {
    alert(error.response?.status_message || 'Ooops something went wrong');
  }
  return process.env.NODE_ENV === 'development' ? errorLogger(error) : error;
});

export default client;

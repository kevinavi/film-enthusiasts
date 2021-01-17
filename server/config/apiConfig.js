/* * Global configuration for axios * */
import axios from 'axios';
import requestHandler from './apiRequestHandler.js';
import { successResponseHandler, errorResponseHandler } from './apiResponseHandler.js';

const configureServices = () => {
// Set the base url for api calls
  axios.defaults.baseURL = process.env.RAPIDAPI_BASE_URL;

  // Request interceptor
  axios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => Promise.reject(error),
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => successResponseHandler(response),
    (error) => errorResponseHandler(error),
  );
};

// Gets the api request configuration
const getConfig = () => {
  const conf = {
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
  };
  return conf;
};

export { configureServices, getConfig };
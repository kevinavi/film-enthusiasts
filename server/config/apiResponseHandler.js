const errorResponseHandler = (error) => {
  if (error.response.status === 500 && error.response.data) {
    console.log(error.response);
  }
  return Promise.reject(error);
};

const successResponseHandler = (response) => response;

export { errorResponseHandler, successResponseHandler };
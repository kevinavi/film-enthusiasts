import { errorResponseHandler, successResponseHandler } from '../../config/apiResponseHandler.js';

test('test success request configuation handler', () => {
  const response = { data: { hash: 1 } };
  const handledResponse = successResponseHandler(response);
  expect(handledResponse).toEqual(response);
});

test('test request configuation handler', () => {
  const errorResponse = { errorMessage: 'error occurred', status: 500 };
  return errorResponseHandler({ response: errorResponse }).catch((e) => {
    expect(e).toMatchObject({ response: errorResponse });
  });
});

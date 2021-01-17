import requestHandler from '../../config/apiRequestHandler.js';

test('test request configuation handler', () => {
  const request = { header: { "x-api-key": "Something" } };
  const response = requestHandler(request);
  expect(request).toEqual(response);
});

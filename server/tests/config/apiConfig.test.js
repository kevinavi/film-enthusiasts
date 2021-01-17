import { getConfig } from '../../config/apiConfig.js';

test('test request config', async () => {
  const config = await getConfig();
  expect(config).toEqual({ headers: { "x-rapidapi-host": undefined, "x-rapidapi-key": undefined } });
});

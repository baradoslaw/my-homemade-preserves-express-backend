import {makeHash} from "../utils/hash";

test('makeHash creates valid bcrypt hash (60 characters).', async () => {
  const text = 'Example password';
  const newHash = await makeHash(text);

  expect(newHash.length).toBe(60);
});

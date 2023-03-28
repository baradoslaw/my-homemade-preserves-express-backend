import {checkHash, makeHash} from "../utils/hash";

test('makeHash creates valid bcrypt hash (60 characters).', async () => {
  const text = 'Example password';
  const newHash = await makeHash(text);

  expect(newHash.length).toBe(60);
});

test('checkHash returns true when provided with string and bcrypt hash based on it.', async () => {
  const text = 'Example password';
  const hash = await makeHash(text);

  const isMatched = await checkHash(text, hash);

  expect(isMatched).toBe(true);
});

test('checkHash returns false when provided with string and bcrypt hash based on other text.', async () => {
  const text1 = 'Example password 1';
  const text2 = 'Example password 2';
  const hash = await makeHash(text1)

  const isMatched = await checkHash(text2, hash);

  expect(isMatched).toBe(false);
});

const {hash} = require('bcrypt');

export const makeHash = async (plainText: string): Promise<string> => {
  return hash(plainText, 10);
};

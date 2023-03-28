import {compare, hash} from "bcrypt";

export const makeHash = async (plainText: string): Promise<string> => {
  return await hash(plainText, 10);
};

export const checkHash = async (text: string, givenHash: string): Promise<boolean> => {
  return await compare(text, givenHash);
};

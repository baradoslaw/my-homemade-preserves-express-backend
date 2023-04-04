import {v4 as uuid} from 'uuid';
import {TypeOfPreserve} from "../../types";

const defaultPreserve = {
  name: 'Ogórki kiszone',
  description: 'Tradycyjne polskie ogórki kiszone',
  typeName: TypeOfPreserve.Pickles,
  userId: 'dec63404-66ad-43c1-b483-47701306ee91', // Test1
}

test('Can build PreserveRecord.', () => {
  const preserve = new PreserveRecord({
    ...defaultPreserve,
    id: uuid(),
  });

  expect(preserve.id.length).toBe(36);
  expect(typeof preserve.id).toBe('string');

  expect(preserve.name).toBe('Ogórki kiszone');
  expect(preserve.description).toBe('Tradycyjne polskie ogórki kiszone');
  expect(preserve.typeName).toBe('Kiszonki');
  expect(preserve.userId).toBe('dec63404-66ad-43c1-b483-47701306ee91');
});

test('Can build PreserveRecord without id provided.', () => {
  const preserve = new PreserveRecord(defaultPreserve);

  expect(preserve.name).toBe('Ogórki kiszone');
  expect(preserve.description).toBe('Tradycyjne polskie ogórki kiszone');
  expect(preserve.typeName).toBe('Kiszonki');
  expect(preserve.userId).toBe('dec63404-66ad-43c1-b483-47701306ee91');
});

test('PreserveRecord doesn\'t allow empty name.', () => {
  const message = 'Nazwa przetworu nie może być pusta.';

  expect(() => new PreserveRecord({
    ...defaultPreserve,
    name: '',
  })).toThrow(message);
});

test('PreserveRecord doesn\'t allow typeName that isn\'t defined in TypeOfPreserve.', () => {
  const message = 'Błędny typ przetworu.';

  expect(() => new PreserveRecord({
    ...defaultPreserve,
    typeName: '',
  })).toThrow(message);

  expect(() => new PreserveRecord({
    ...defaultPreserve,
    typeName: 'type',
  })).toThrow(message);
});

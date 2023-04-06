import {pool} from "../../utils/db";
import {PreserveRecord} from "../../records/preserve.record";

const defaultPreserve = {
  name: 'Ogórki kiszone',
  description: 'Tradycyjne polskie ogórki kiszone',
  typeName: 'Kiszonka',
  userId: 'dec63404-66ad-43c1-b483-47701306ee91', // Test1
}

afterAll(async () => {
  await pool.end();
});

test('PreserveRecord.getOne downloads data from database for one entry.', async () => {
  const preserve = await PreserveRecord.getOne('843cf290-8bbc-43e9-90e6-6b0a50d529e5');

  expect(preserve.id).toBe('843cf290-8bbc-43e9-90e6-6b0a50d529e5');
  expect(preserve.name).toBe('Ogórki kiszone');
  expect(preserve.description).toBe('Najlepsze ogórki');
  expect(preserve.typeName).toBe('Kiszonka');
  expect(preserve.userId).toBe('dec63404-66ad-43c1-b483-47701306ee91')
});

test('PreserveRecord.getOne returns null from database for unexisting entry.', async () => {
  const preserve = await PreserveRecord.getOne('wrong ID');

  expect(preserve).toBeNull();
});

test('PreserveRecord.getAllPreservesForUser downloads all entries for provided user id.', async () => {
  const preserves = await PreserveRecord.getAllPreservesForUser('dec63404-66ad-43c1-b483-47701306ee91');

  expect(preserves.length).not.toBe(0);
  expect(preserves[0].name).toBe('Ogórki kiszone');
  expect(preserves[1].name).toBe('Suszone borowiki');
});

test('PreserveRecord.getAllPreservesForUser returns empty array, when there is no preserves for given user id.', async () => {
  const preserves = await PreserveRecord.getAllPreservesForUser('This user does not have preserves.');

  expect(preserves.length).toBe(0);
});

// test('PreserveRecord.insert inserts data to database.', async () => {
//   const preserve = new
// });

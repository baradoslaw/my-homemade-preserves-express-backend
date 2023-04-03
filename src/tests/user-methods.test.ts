import {UserRecord} from "../../records/user.record";
import {pool} from "../../utils/db";

const defaultUser = {
  login: 'Test login',
  pwd: '$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS', // Test pwd
  email: 'test@email.com',
  name: 'Test',
  surname: 'Person',
};

afterAll(async () => {
  await pool.execute("DELETE FROM `user` WHERE `login` = 'Test login'");
  await pool.end();
});

test('UserRecord.getOneById downloads data from database for one entry.', async () => {
  const user = await UserRecord.getOneById('dec63404-66ad-43c1-b483-47701306ee91');

  expect(user.id).toBe('dec63404-66ad-43c1-b483-47701306ee91');
  expect(user.login).toBe('Test1');
  expect(user.pwd).toBe('$2a$12$1Pbh5rfnPxiK5tVwOAxhhOe9CNICnekP0LCYrt2pW20NsVbEPJaXe');
  expect(user.email).toBe('testEmail@mail.to');
  expect(user.name).toBe('Testing');
  expect(user.surname).toBe('Unit');
});

test('UserRecord.getOneById returns null from database for unexisting entry.', async () => {
  const user = await UserRecord.getOneById('asdzx');

  expect(user).toBeNull();
});

test('UserRecord.getOneByLogin downloads data from database for one entry.', async () => {
  const user = await UserRecord.getOneByLogin('Test1');

  expect(user.id).toBe('dec63404-66ad-43c1-b483-47701306ee91');
  expect(user.login).toBe('Test1');
  expect(user.pwd).toBe('$2a$12$1Pbh5rfnPxiK5tVwOAxhhOe9CNICnekP0LCYrt2pW20NsVbEPJaXe');
  expect(user.email).toBe('testEmail@mail.to');
  expect(user.name).toBe('Testing');
  expect(user.surname).toBe('Unit');
});

test('UserRecord.getOneById returns null from database for unexisting entry.', async () => {
  const user = await UserRecord.getOneByLogin('asdzx');

  expect(user).toBeNull();
});

test('UserRecord.insert inserts data to database.', async () => {
  const user = new UserRecord(defaultUser);
  await user.insert();

  const foundUser = await UserRecord.getOneById(user.id);

  expect(foundUser).toBeDefined();
  expect(foundUser).not.toBeNull();
  expect(foundUser.id).toBe(user.id);
});


test('UserRecord.insert does not allow to save UserRecord with login that is already occupied or user that is already saved.', async () => {
  const user = new UserRecord({
    ...defaultUser,
    login: 'Test1',
  });

  await expect(async () => {
    await user.insert();
  }).rejects.toThrowError('Nie można dodać już istniejącego użytkownika.');

  const user1 = await UserRecord.getOneByLogin('Test1');
  await expect(async () => {
    await user1.insert();
  }).rejects.toThrowError('Nie można dodać już istniejącego użytkownika.');
});

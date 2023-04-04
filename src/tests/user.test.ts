import {v4 as uuid} from 'uuid';
import {UserRecord} from "../../records/user.record";

const defaultUser = {
  login: 'Test login',
  pwd: '$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS', // Test pwd
  email: 'test@email.com',
  name: 'Test',
  surname: 'Person',
};

test('Can build UserRecord.', () => {
  const user = new UserRecord({
    ...defaultUser,
    id: uuid(),
  });

  expect(user.id.length).toBe(36);
  expect(typeof user.id).toBe('string');

  expect(user.login).toBe('Test login');
  expect(user.pwd).toBe('$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS');
  expect(user.email).toBe('test@email.com');
  expect(user.name).toBe('Test');
  expect(user.surname).toBe('Person');
});

test('Can build UserRecord without id provided.', () => {
  const user = new UserRecord(defaultUser);

  expect(user.login).toBe('Test login');
  expect(user.pwd).toBe('$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS');
  expect(user.email).toBe('test@email.com');
  expect(user.name).toBe('Test');
  expect(user.surname).toBe('Person');
});

test('UserRecord allows empty name.', () => {
  const user = new UserRecord({
    ...defaultUser,
    name: '',
  });

  expect(user.login).toBe('Test login');
  expect(user.pwd).toBe('$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS');
  expect(user.email).toBe('test@email.com');
  expect(user.surname).toBe('Person');
});

test('UserRecord allows empty surname.', () => {
  const user = new UserRecord({
    ...defaultUser,
    surname: '',
  });

  expect(user.login).toBe('Test login');
  expect(user.pwd).toBe('$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS');
  expect(user.email).toBe('test@email.com');
  expect(user.name).toBe('Test');
});

test('UserRecord validates login correctly.', () => {
  const message = 'Login powinien zawierać od 5 do 20 znaków.';

  expect(() => new UserRecord({
    ...defaultUser,
    login: 'qwertyuiopasdfghjkl21',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    login: 'qwe4',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    login: '',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    login: 'sggg5!',
  })).not.toThrow(message);
});

test('UserRecord validates email correctly.', () => {
  const message = 'Podano niepoprawny adres email.';

  expect(() => new UserRecord({
    ...defaultUser,
    email: 'asfddf',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '@sczx.com',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '@sczx',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '@sczx.',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '@com',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '@.com',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '.com',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '.',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: 'sczx.com',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: 'sczx.com@',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: 'address@email.com@email.com',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: 'address@email.com@',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    email: '',
  })).toThrow(message);
});

test('UserRecord validates password correctly.', () => {
  const message = 'Niepoprawne hasło. Hasło powinno składać się przynajmniej z ośmiu znaków (maksymalnie 20 znaków), w tym małych i dużych liter oraz cyfr.';

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'aq1QAzq',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'Q1azwsxcde34rfvbgt56y',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'ASD567SZX',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'sdj7856shs',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'asdsdhJSB',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'sdsdfds',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'HDSJASDFH',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: '673482347',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'aq1QAzq',
  })).toThrow(message);

  expect(() => new UserRecord({
    ...defaultUser,
    pwd: 'a!q1QAz@q',
  })).not.toThrow(message);
});

test('UserRecord.initPwd() properly creates hash of a password.', async () => {
  const user = new UserRecord({
    ...defaultUser,
    pwd: 'pwd1ASZXc',
  });
  await user.initPwd();

  expect(user.pwd.length).toBe(60);
  await expect(async () => {
    await user.initPwd();
  }).rejects.toThrowError('Hasło już zostało zhashowane.');
});

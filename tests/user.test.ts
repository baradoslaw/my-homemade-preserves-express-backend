const defaultUser = {
  login: 'Test login',
  pwd: '$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS', // Test pwd
  email: 'test@email.com',
  name: 'Test',
  surname: 'Person',
};

test('Can build UserRecord.', () => {
  const user = new UserRecord(defaultUser);

  expect(user.id.length).toBe(36);
  expect(typeof user.id).toBe('string');

  expect(user.login).toBe('Test login');
  expect(user.pwd).toBe('$2y$10$gWw9NC9t2E/l9ZqBb3SDt..qDkk4V7IMCcF7xiFW6pQrk.Ah.vrrS');
  expect(user.email).toBe('test@email.com');
  expect(user.name).toBe('Test');
  expect(user.surname).toBe('Person');
});

test('UserRecord validates login correctly.', () => {
  const message = 'Login powinien zawierać od 5 do 20 znaków.';

  expect(new UserRecord({
    ...defaultUser,
    login: 'qwertyuiopasdfghjkl21',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: 'qwe4',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: '',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: 'sggg5!',
  })).not.toThrow('Login musi składać się przynajmniej z 5 znaków.');
});

test('UserRecord validates email correctly.', () => {
  const message = 'Podano niepoprawny adres email.';

  expect(new UserRecord({
    ...defaultUser,
    email: 'asfddf',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '@sczx.com',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '@sczx',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '@sczx.',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '@com',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '@.com',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '.com',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '.',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: 'sczx.com',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: 'sczx.com@',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: 'address@email.com@email.com',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: 'address@email.com@',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    email: '',
  })).not.toThrow(message);
});

test('UserRecord validates name correctly and allows empty name.', () => {
  const message = 'Imię powinno zawierać wyłącznie litery bez cyfr i znaków specjalnych, dodatkowo nie powinno zawierać więcej niż 40 znaków.';

  expect(new UserRecord({
    ...defaultUser,
    name: 'AQ1qM0JT2wMu5OItUpnpSTN312LNQKPol0BFNeT7g',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: 'cIPQKxqRzMmLSHVpByFJjFExtDROJOrEYwOUouGwi',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: 'ahh1',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: 'xzcvczx!',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    login: '',
  })).toThrow(message);
});

test('UserRecord validates name correctly and allows empty surname.', () => {
  const message = 'Nazwisko powinno zawierać wyłącznie litery bez cyfr i znaków specjalnych, dodatkowo nie powinno zawierać więcej niż 40 znaków.';

  expect(new UserRecord({
    ...defaultUser,
    surname: 'AQ1qM0JT2wMu5OItUpnpSTN312LNQKPol0BFNeT7g',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    surname: 'cIPQKxqRzMmLSHVpByFJjFExtDROJOrEYwOUouGwi',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    surname: 'ahh1',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    surname: 'xzcvczx!',
  })).toThrow(message);

  expect(new UserRecord({
    ...defaultUser,
    surname: '',
  })).toThrow(message);
});

import {NewUserEntity, UserEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';
import {makeHash} from "../utils/hash";

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  public id: string;
  public login: string;
  public pwd: string;
  public email: string;
  public name: string;
  public surname: string;

  constructor(obj: NewUserEntity) {
    const strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

    if (obj.login.length < 5 || obj.login.length > 20) {
      throw new ValidationError('Login powinien zawierać od 5 do 20 znaków.');
    }

    if (obj.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) === null) {
      throw new ValidationError('Podano niepoprawny adres email.');
    }

    if (obj.pwd.length !== 60) {
      if(obj.pwd.length < 8 || obj.pwd.length > 20 || obj.pwd.match(strongRegex) === null) {
        throw new ValidationError('Niepoprawne hasło. Hasło powinno składać się przynajmniej z ośmiu znaków (maksymalnie 20 znaków), w tym małych i dużych liter oraz cyfr.');
      }
    }

    this.id = obj.id;
    this.login = obj.login;
    this.pwd = obj.pwd;
    this.email = obj.email;
    this.name = obj.name;
    this.surname = obj.surname;
  }

  static async getOneById(id: string): Promise<UserRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `user` WHERE id = :id", {
      id,
    }) as UserRecordResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getOneByLogin(login: string): Promise<UserRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `user` WHERE login = :login", {
      login,
    }) as UserRecordResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getOneByEmail(email: string): Promise<UserRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `user` WHERE email = :email", {
      email,
    }) as UserRecordResults;

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  async initPwd(): Promise<void> {
    if (this.pwd.length === 60) {
      throw new Error('Hasło już zostało zhashowane.');
    } else {
      this.pwd = await makeHash(this.pwd);
    }
  }

  async insert(): Promise<void> {
    if (await UserRecord.getOneByLogin(this.login) !== null) {
      throw new ValidationError('Nie można dodać już istniejącego użytkownika.');
    }

    if (await UserRecord.getOneByEmail(this.email) !== null) {
      throw new ValidationError('Podany email jest już zajęty.');
    }

    if (!this.id) {
      this.id = uuid();
    } else {
      throw new ValidationError('Nie można dodać już istniejącego użytkownika.')
    }

    await pool.execute("INSERT INTO `user`(`id`, `login`, `pwd`, `email`, `name`, `surname`) VALUES(:id, :login, :pwd, :email, :name, :surname)", this);
  }
}

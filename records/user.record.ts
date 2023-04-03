import {NewUserEntity, UserEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  public id: string;
  public login: string;
  public pwd: string;
  public email: string;
  public name: string;
  public surname: string;

  constructor(obj: NewUserEntity) {
    if (obj.login.length < 5 || obj.login.length > 20) {
      throw new ValidationError('Login powinien zawierać od 5 do 20 znaków.');
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(obj.email)) {
      throw new ValidationError('Podano niepoprawny adres email.');
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
}

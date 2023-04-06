import {NewPreserveEntity, PreserveEntity} from "../types/preserves/preserve-entity";
import {FieldPacket} from "mysql2";
import {TypeOfPreserve} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

type PreserveRecordResults = [PreserveEntity[], FieldPacket[]];

const listOfPreserves = Object.values(TypeOfPreserve);

export class PreserveRecord implements PreserveEntity {
  public id: string;
  public name: string;
  public description: string;
  public typeName: string;
  public userId: string;

  constructor(obj: NewPreserveEntity) {
    if (obj.name === '') {
      throw new ValidationError('Nazwa przetworu nie może być pusta.');
    }

    const found = listOfPreserves.find(el => el === obj.typeName);
    if (found === undefined) {
      throw new ValidationError('Niepoprawny typ przetworu.');
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.typeName = obj.typeName;
    this.userId = obj.userId;
  }

  static async getOne(id: string): Promise<PreserveRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `preserve` WHERE id = :id", {
      id,
    }) as PreserveRecordResults;

    return results.length === 0 ? null : new PreserveRecord(results[0]);
  }

  static async getAllPreservesForUser(id: string): Promise<PreserveEntity[]> {
    const [results] = await pool.execute("SELECT * FROM `preserve` WHERE `userId` = :id", {
      id,
    }) as PreserveRecordResults;

    return results;
  }
}

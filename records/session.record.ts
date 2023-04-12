import {FieldPacket} from "mysql2";
import {NewSessionEntity, SessionEntity} from "../types";
import {v4 as uuid} from "uuid";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

type SessionRecordResults = [SessionEntity[], FieldPacket[]];

export class SessionRecord implements SessionEntity {
  public sessionId: string;
  public userId: string;
  public createdAt: Date;

  constructor(obj: NewSessionEntity) {
    this.sessionId = obj.sessionId;
    this.userId = obj.userId;
    this.createdAt = obj.createdAt;
  }

  async insert(): Promise<void> {
    if (!this.sessionId) {
      this.sessionId = uuid();
      this.createdAt = new Date;
    }

    await pool.execute("INSERT INTO `session`(`sessionId`, `userId`, `createdAt`) VALUES (:sessionId, :userId, :createdAt)", this);
  }

  async delete(): Promise<void> {
    await pool.execute("DELETE FROM `session` WHERE `sessionId` = :id", {
      id: this.sessionId,
    });
  }

  static async getOne(id: string): Promise<SessionRecord> {
    const [results] = await pool.execute("SELECT * FROM `session` WHERE sessionId = :id", {
      id,
    }) as SessionRecordResults;

    return results.length === 0 ? null : new SessionRecord(results[0]);
  }

  static async checkSession(id: string, userId: string): Promise<boolean> {
    const [results] = await pool.execute("SELECT * FROM `session` WHERE sessionId = :id", {
      id,
    }) as SessionRecordResults;
    const session = results[0];

    if (results.length === 0) {
      return false;
    }

    return session.userId === userId;
  }
}

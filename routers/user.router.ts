import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {checkHash} from "../utils/hash";
import {ValidationError} from "../utils/errors";
import {SessionRecord} from "../records/session.record";

export const userRouter = Router()
  .post('/new-user', async (req, res) => {
    const user = new UserRecord(req.body);

    await user.initPwd();
    await user.insert();

    res.json(user.id);
  })

  .post('/log-in', async (req, res) => {
      const user = await UserRecord.getOneByLogin(req.body.login);

      if (await checkHash(req.body.pwd, user.pwd)) {
          const session = new SessionRecord({
              userId: user.id,
          });
          await session.insert();

          // res.cookie('sessionId', session.sessionId);  Doesn't work with fetch, for now I save cookie manually on FE
          res.json({
              user,
              sessionId: session.sessionId,
          });
      } else {
          throw new ValidationError('Niepoprawny login lub hasło.');
      }
  });

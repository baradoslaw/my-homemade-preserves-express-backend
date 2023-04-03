import {Router} from "express";
import {UserRecord} from "../records/user.record";

export const userRouter = Router()
  .post('/new-user', async (req, res) => {
    const user = new UserRecord(req.body);

    await user.initPwd();
    await user.insert();

    res.json(user.id);
  });

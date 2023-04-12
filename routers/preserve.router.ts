import {Router} from "express";
import {PreserveRecord} from "../records/preserve.record";
import {ValidationError} from "../utils/errors";
import {getSessionIdFromCookie, getUserIdFromCookie} from "../utils/getDataFromCookies";
import {SessionRecord} from "../records/session.record";

export const preserveRouter = Router()
  .get('/:id', async (req, res) => {
    const sessionId = getSessionIdFromCookie(req);
    const userId = getUserIdFromCookie(req);

    if (!(await SessionRecord.checkSession(sessionId, userId))) {
      throw new ValidationError('Nieautoryzowany dostęp.');
    }

    const preserve = await PreserveRecord.getOne(req.params.id ?? '');

    res.json(preserve);
  })

  .get('/for-user/:id', async (req, res) => {
    const sessionId = getSessionIdFromCookie(req);
    const userId = getUserIdFromCookie(req);

    if (!(await SessionRecord.checkSession(sessionId, userId))) {
      throw new ValidationError('Nieautoryzowany dostęp.');
    }

    const preserves = await PreserveRecord.getAllPreservesForUser(req.params.id);

    const preservesToSend = preserves.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        typeName: item.typeName,
      };
    });

    res.json(preservesToSend);
  })

  .post('/add', async (req, res) => {
    const sessionId = getSessionIdFromCookie(req);
    const userId = getUserIdFromCookie(req);

    if (!(await SessionRecord.checkSession(sessionId, userId))) {
      throw new ValidationError('Nieautoryzowany dostęp.');
    }

    const preserve = new PreserveRecord(req.body);
    await preserve.insert();
    res.json(preserve);
  })

  .delete('/delete/:id', async (req, res) => {
    const sessionId = getSessionIdFromCookie(req);
    const userId = getUserIdFromCookie(req);

    if (!(await SessionRecord.checkSession(sessionId, userId))) {
      throw new ValidationError('Nieautoryzowany dostęp.');
    }

    const preserve = await PreserveRecord.getOne(req.params.id);

    if (!preserve) {
      throw new ValidationError('Nie ma takiego wyrobu.');
    }

    await preserve.delete();
    res.end();
  });

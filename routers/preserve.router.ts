import {Router} from "express";
import {PreserveRecord} from "../records/preserve.record";

export const preserveRouter = Router()
  .get('/:id', async (req, res) => {
    const preserve = await PreserveRecord.getOne(req.params.id ?? '');

    res.json(preserve);
  })

  .get('/for-user/:id', async (req, res) => {
    const preserves = await PreserveRecord.getAllPreservesForUser(req.params.id);

    res.json(preserves);
  })

  .post('/add', async (req, res) => {
    const preserve = new PreserveRecord(req.body);
    await preserve.insert();
    res.json(preserve);
  });

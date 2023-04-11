import {Router} from "express";
import {PreserveRecord} from "../records/preserve.record";

export const preserveRouter = Router()
  .get('/:id', async (req, res) => {
    const preserve = await PreserveRecord.getOne(req.params.id ?? '');

    res.json(preserve);
  })

  .get('/for-user/:id', async (req, res) => {
    const preserves = await PreserveRecord.getAllPreservesForUser(req.params.id);

    const preservesToSend = preserves.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        typeName: item.typeName,
      };
    });
    console.log(preservesToSend);

    res.json(preservesToSend);
  })

  .post('/add', async (req, res) => {
    const preserve = new PreserveRecord(req.body);
    await preserve.insert();
    res.json(preserve);
  });

import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import './utils/db';
import {userRouter} from "./routers/user.router";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use('/user', userRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log('App listening on http://localhost:3001');
});

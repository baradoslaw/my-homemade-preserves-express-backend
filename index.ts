import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import './utils/db';
import {userRouter} from "./routers/user.router";
import rateLimit from "express-rate-limit";
import {preserveRouter} from "./routers/preserve.router";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 5 * 60 * 1000,    // 5 minutes
  max: 500,   // Limit each IP to 100 requests per `window` (here, per 5 minutes)
}));

app.use('/user', userRouter);
app.use('/preserve', preserveRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log('App listening on http://localhost:3001');
});

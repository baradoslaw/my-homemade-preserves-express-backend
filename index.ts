import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import './utils/db';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

// Routes

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log('App listening on http://localhost:3001');
});

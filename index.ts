import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.listen(3001, '0.0.0.0', () => {
  console.log('App listening on http://localhost:3001');
});

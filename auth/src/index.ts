import express from 'express';
import 'express-async-errors';
import authRouter from './auth.router';
import { errorHandler } from './middlewares/error-handler.middleware';
import { connectDb } from './db';

connectDb();

const app = express();

app.use((req, res, next) => {
  console.log('Got request', req.url);
  next();
});

app.use(express.json());
app.use('/auth', authRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

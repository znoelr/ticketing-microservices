import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import authRouter from './auth.router';
import { errorHandler } from './middlewares/error-handler.middleware';
import { connectDb } from './db';

connectDb();

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: true,
}));

app.use((req, res, next) => {
  console.log('Got request', req.url);
  next();
});

app.use('/auth', authRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

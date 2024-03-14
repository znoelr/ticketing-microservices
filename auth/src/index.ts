import express from 'express';
import authRouter from './auth.router';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

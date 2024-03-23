import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@mss-ticketing/common';
import { createTicketRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use('/api/tickets', createTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('[404] Not Found');
});

app.use(errorHandler);

export { app };

import 'express-async-errors';
import { connectDb } from './db';
import { app } from './app';

if(!process.env.JWT_KEY) {
  console.error('Env "JWT_KEY" must be provided');
  process.exit(1);
}

connectDb();

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

import request from 'supertest';
import { app } from '../app';

it('gets the logged in user', async () => {
  const cookie = await global.singup(app);

  const response = await request(app)
  .get('/auth/me')
  .set('Cookie', cookie)
  .send()
  .expect(200);

  expect(response.body.currentUser.email).toEqual('test@gmail.com');
});

it('responsds with null if not authenticated', async () => {
  const response = await request(app)
  .get('/auth/me')
  .send()
  .expect(200);

  expect(response.body.currentUser).toEqual(null);
});

import request from 'supertest';
import { app } from '../app';

it('gets the logged in user', async () => {
  const signupResponse = await request(app)
    .post('/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'abcde$12345',
    })
    .expect(201);
  const cookie = signupResponse.get('Set-Cookie');

  const response = await request(app)
  .get('/auth/me')
  .set('Cookie', cookie)
  .send()
  .expect(200);

  expect(response.body.currentUser.email).toEqual('test@gmail.com');
});

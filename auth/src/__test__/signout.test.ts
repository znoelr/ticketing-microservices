import request from 'supertest';
import { app } from '../app';

it('clears the cookie after signout', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'abcde$12345',
    })
    .expect(201);

  const response = await request(app)
  .get('/api/auth/signout')
  .expect(200);

  expect(response.get('Set-Cookie')[0])
    .toBe('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});

import request from 'supertest';
import { app } from '../app';

it('fails on unkwnow email', async () => {
  return request(app)
    .post('/auth/signin')
    .send({
      email: 'test@gmail.com',
      password: 'abcde$12345',
    })
    .expect(400);
});

it('fails on invalid password', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      email: 'test@gmal.com',
      password: 'abcde$12345',
    })
    .expect(201);

  await request(app)
    .post('/auth/signin')
    .send({
      email: 'test@gmal.com',
      password: '123456',
    })
    .expect(400);
});

it('responds with a cookie on successful signin', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      email: 'test@gmal.com',
      password: 'abcde$12345',
    })
    .expect(201);

  const response = await request(app)
    .post('/auth/signin')
    .send({
      email: 'test@gmal.com',
      password: 'abcde$12345',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
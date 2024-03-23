import request from 'supertest';
import { app } from '../app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'abcde$12345',
    })
    .expect(201);
});

it('returns a 400 on invalid email', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'kajsndwq',
      password: 'abcde$12345',
    })
    .expect(400);
});

it('returns a 400 on invalid password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'email@gmail.com',
      password: '1w',
    })
    .expect(400);
});

it('returns a 400 on missing email and password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'some@gmail.com'
    })
    .expect(400);

    await request(app)
    .post('/api/auth/signup')
    .send({
      password: 'aksjdn2k343242k34jn'
    })
    .expect(400);
});

it('returns a 400 on duplicate email', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'some@gmail.com',
      password: 'aksjdn2k343242k34jn',
    })
    .expect(201);

    await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'some@gmail.com',
      password: 'aksjdn2k343242k34jn',
    })
    .expect(400);
});

it('sets a cookie on successful signup', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'some@gmail.com',
      password: 'aksjdn2k343242k34jn',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
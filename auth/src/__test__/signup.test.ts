import request from 'supertest';
import { app } from '../app';

it('returns a 201 on successful signup', () => {
  request(app)
    .post('/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'abcde$12345',
    })
    .expect(201);
});

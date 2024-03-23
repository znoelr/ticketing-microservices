import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

declare global {
  var singup: (app: Express) => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'lakmd23neo23ch2ore7y9co87erybf9v84yrv';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.singup = async (app: Express) => {
  const signupResponse = await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'abcde$12345',
    })
    .expect(201);
  const cookie = signupResponse.get('Set-Cookie');
  return cookie;
}

import { MongoClient } from 'mongodb';

export const client = new MongoClient('mongodb://auth-mongo-cluster-ip:27017/auth');

export const connectDb = () => {
  client.connect()
    .then(() => console.log('Successful DB connection'))
    .catch((err) => console.log(err));
};

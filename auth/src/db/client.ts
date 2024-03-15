import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://auth-mongo-cluster-ip:27017/auth_db';

export const connectDb = () => {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('Successful DB connection'))
    .catch((err: Error) => console.log(err));
};

import mongoose from 'mongoose';

export const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Successful DB connection'))
    .catch((err: Error) => console.log(err));
};

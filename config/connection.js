import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected.')
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

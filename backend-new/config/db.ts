import mongoose from 'mongoose';

const connectDB = async () => {
  const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jiabt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // tslint:disable-next-line: no-console
  console.log(`MangoDB connected: ${conn.connection.host}`);
};

export default connectDB;

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import HttpError from '../models/http-error';
import routes from '../routes';
const app = express();

dotenv.config({
  path: './config/config.env',
});

//Body parser
app.use(express.json());

connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Mount routers
app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error: any, _req: any, res: any, next: any) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred!',
  });
});

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} on ${process.env.PORT}`
  )
);
// app.get('/', (req) => {
//   (req as any).name = '';
// });
// app.listen();

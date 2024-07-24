import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './database/connection';

import UserRouter from './controllers/auth/createUser';
import LoginRouter from './controllers/auth/login';
import ForgetRouter from './controllers/auth/forgetPassword';
import ResetRouter from './controllers/auth/resetPassword';
import States from './controllers/state/state';
import City from './controllers/city/city';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

connectDB();

app.use(express.json());
app.use(bodyParser.json());

app.use(UserRouter);
app.use(LoginRouter);
app.use(ForgetRouter);
app.use(ResetRouter);
app.use(States);
app.use(City);

app.listen(port, (): void => {
  console.log(`Connectivity with the port ${port}`);
});

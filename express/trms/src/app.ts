import expressSession from 'express-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import log from './log';
import baseRouter from './routes';
import { UserNotFoundError, PasswordDoesNotMatchError, AuthenticationError } from './error/errors';
import FormService from './services/formService';

dotenv.config({});

const app = express();

app.use(cors({
  credentials: true,
  origin: [
    process.env.WEB_CLIENT_ORIGIN || 'https://localhost:3000',
  ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'whatever-probably-should-be-from-env-vars',
  cookie: {},
}));

app.use('/', baseRouter);

const { BAD_REQUEST, UNAUTHORIZED } = StatusCodes;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof UserNotFoundError) {
    log.error(err);
    res.status(BAD_REQUEST).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof PasswordDoesNotMatchError) {
    log.error(err);
    res.status(BAD_REQUEST).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AuthenticationError) {
    log.error(err);
    res.status(UNAUTHORIZED).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

setInterval(FormService.autoUpdateFunction, 8.64e+7);

export default app;

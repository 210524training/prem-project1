import express, { Router } from 'express';
import userService from '../services/userService';
import User from '../models/user';
import { AuthenticationError } from '../error/errors';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  console.log('On user router');
  if(!req.session.isLoggedIn || !req.session.user) {
    res.send(401);
    throw new AuthenticationError('You must be logged in');
  }

  res.json([req.session.user]);
});

userRouter.get('/:username', async (req, res) => {
  const { username } = req.params;
  res.json(
    await userService.findByUsername(username),
  );
});

userRouter.post('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  console.log('On user router');
  res.json(
    await userService.addUser(req.body),
  );
});

userRouter.put('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.update(req.body),
  );
});

userRouter.delete('/:username', async (req, res) => {
  const { username } = req.params;
  res.json(
    await userService.delete(username),
  );
});

export default userRouter;

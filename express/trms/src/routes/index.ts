import express, { Router } from 'express';
import userRouter from './user.router';
import formRouter from './form.router';
import userService from '../services/userService';

const baseRouter = Router();

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  const { username, password } = req.body;

  const user = await userService.checkLogin(username, password);

  req.session.isLoggedIn = true;

  req.session.user = user;

  res.json(req.session.user);
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const { username } = req.session.user;

    req.session.destroy(() => {
      console.log(`${username} logged out`);
    });
  }
  res.status(202).send();
}

baseRouter.post('/logout', logout);
baseRouter.use('/api/v1/users', userRouter);
baseRouter.use('/api/v1/forms', formRouter);

export default baseRouter;

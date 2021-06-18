import express, { Router } from 'express';
import Form from '../models/form';
import formService from '../services/formService';

const formRouter = Router();

formRouter.get('/', async (req, res) => {
  res.json(
    await formService.getAll(),
  );
});

formRouter.get('/:formId', async (req, res) => {
  const { formId } = req.params;
  res.json(
    await formService.getById(formId),
  );
});

formRouter.post('/', async (req: express.Request<unknown, unknown, Form, unknown, {}>, res) => {
  res.json(
    await formService.addForm(req.body),
  );
});

formRouter.put('/', async (req: express.Request<unknown, unknown, Form, unknown, {}>, res) => {
  res.json(
    await formService.update(req.body),
  );
});

formRouter.delete('/:formId', async (req, res) => {
  const { formId } = req.params;
  res.json(
    await formService.delete(formId),
  );
});

export default formRouter;

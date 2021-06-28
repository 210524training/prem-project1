import express, { Router } from 'express';
import Form from '../models/form';
import formService from '../services/formService';

const formRouter = Router();

formRouter.get('/', async (req, res) => {
  res.json(
    await formService.getAll(),
  );
});

formRouter.get('/:formStatus/get-forms', async (req, res) => {
  const { formStatus } = req.params;
  res.json(
    await formService.getFormsByStatus(formStatus),
  );
});

formRouter.get('/:formId', async (req, res) => {
  const { formId } = req.params;
  res.json(
    await formService.getById(formId),
  );
});

formRouter.get('/:username/user', async (req, res) => {
  const { username } = req.params;
  console.log(username);
  res.json(
    await formService.getByUsername(username),
  );
});

formRouter.post('/', async (req, res) => {
  const {
    formId, username, name, email, submissionDate, eventDate, time, location,
    description, cost, gradingFormat, finalGrade, gradeCutoff, gradeSatisfaction, urgency,
    eventType, attached, formStatus, approvedBy, comment,
  } = req.body;

  res.json(
    await formService.addForm(
      formId, username, name, email, submissionDate, eventDate, time, location, description, cost,
      gradingFormat, finalGrade, gradeCutoff, gradeSatisfaction, urgency, eventType, attached,
      formStatus, approvedBy, comment,
    ),
  );
});

formRouter.put('/update', async (req, res) => {
  const { form } = req.body;
  res.json(
    await formService.update(
      form,
    ),
  );
});

formRouter.delete('/:formId', async (req, res) => {
  const { formId } = req.params;
  res.json(
    await formService.delete(formId),
  );
});

export default formRouter;

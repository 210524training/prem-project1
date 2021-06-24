import Form from '../models/form';
import FormDAO from '../DAO/formDAO';
import UserDAO from '../DAO/userDAO';
import userService from './userService';

export class FormService {
  constructor(
    public forms = FormDAO,
    public users = UserDAO,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  urgency(currentDate: Date, eventDate: Date): boolean {
    const changeDate = new Date(eventDate);
    const checkDate = changeDate.getDate() - 14;
    if(currentDate.getDate() < checkDate) {
      return false;
    }
    return true;
  }

  async addForm(form: Form): Promise<boolean> {
    const subDate = new Date();
    const id = Math.random().toString(36).substring(8);
    const isUrgent = this.urgency(subDate, form.eventDate);
    const userForm = this.forms.addForm(new Form(
      id,
      form.username,
      form.name,
      form.email,
      subDate,
      form.eventDate,
      form.time,
      form.location,
      form.description,
      form.cost,
      form.gradingFormat,
      undefined,
      form.gradeCutoff,
      undefined,
      isUrgent,
      form.eventType,
      form.attached,
      'Super',
      'Pending',
    ));
    const getUser = await this.users.findByUsername(form.username);
    if(getUser) {
      userService.addFormToUser(getUser, id);
    }
    return userForm;
  }

  getById(id: string): Promise<Form | undefined> {
    return this.forms.getById(id);
  }

  getByUsername(username: string): Promise<Form[]> {
    return this.forms.getByUsername(username);
  }

  getFormsByStatus(formStatus: string): Promise<Form[]> {
    return this.forms.getFormsByStatus(formStatus);
  }

  getAll(): Promise<Form[]> {
    return this.forms.getAll();
  }

  update(form: Form): Promise<boolean> {
    return this.forms.update(new Form(
      form.formId,
      form.username,
      form.name,
      form.email,
      form.submissionDate,
      form.eventDate,
      form.time,
      form.location,
      form.description,
      form.cost,
      form.gradingFormat,
      form.finalGrade,
      form.gradeCutoff,
      form.gradeSatisfaction,
      form.urgency,
      form.eventType,
      form.attached,
      form.formStatus,
      form.approvedBy,
    ));
  }

  delete(id: string): Promise<boolean> {
    return this.forms.delete(id);
  }
}

export default new FormService();

import Form from '../models/form';
import FormDAO from '../DAO/formDAO';
import UserDAO from '../DAO/userDAO';

export class FormService {
  constructor(
    public forms = FormDAO,
    public users = UserDAO,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  urgency(currentDate: string, eventDate: string): boolean {
    const current = new Date(currentDate);
    const changeDate = new Date(eventDate);
    const checkDate = changeDate.getDate() - 14;
    if(current.getDate() < checkDate) {
      return false;
    }
    return true;
  }

  async addForm(
    formId: string,
    username: string,
    name: string,
    email: string,
    sDate: string,
    eventDate: string,
    time: string,
    location: string,
    description: string,
    oldCost: string,
    gradingFormat: string,
    finalGrade: string | null,
    gradeCutoff: string,
    gradeSatisfaction: string | null,
    urgency: boolean | null,
    eventType: string,
    attached: File | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formStatus: string | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    approvedBy: string | null,
  ): Promise<boolean> {
    const cost = Number(oldCost);
    const id = Math.random().toString(36).substring(8);
    const isUrgent = this.urgency(sDate, eventDate);

    const userForm = this.forms.addForm(new Form(
      id,
      username,
      name,
      email,
      sDate,
      eventDate,
      time,
      location,
      description,
      cost,
      gradingFormat,
      ' ',
      gradeCutoff,
      null,
      isUrgent,
      eventType,
      attached,
      'Supervisor',
      'Pending',
    ));
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
    console.log(form.finalGrade);
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

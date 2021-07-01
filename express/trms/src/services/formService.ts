import Form from '../models/form';
import FormDAO from '../DAO/formDAO';
import UserDAO from '../DAO/userDAO';
import log from '../log';

export class FormService {
  constructor(
    public forms = FormDAO,
    public users = UserDAO,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  urgency(currentDate: string, eventDate: string): boolean {
    const current = new Date(currentDate);
    const changeDate = new Date(eventDate);
    const checkDate = changeDate.getTime() - 12096e5;
    if(current.getTime() < checkDate) {
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
    cost: number,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    comments: string | ' ',
  ): Promise<boolean> {
    // const cost = Number(oldCost);
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
      '',
      gradeCutoff,
      '',
      isUrgent,
      eventType,
      attached,
      'Supervisor',
      'Pending',
      ' ',
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
      form.comment,
    ));
  }

  async delete(id: string): Promise<void> {
    await this.forms.delete(id);
  }

  async autoUpdateFunction(): Promise<void> {
    const listForms = await this.forms.getAll();
    log.debug(listForms);
    listForms.forEach((item: Form) => {
      if(item.submissionDate) {
        const subDate = new Date(item.submissionDate);
        const maxDate = new Date(subDate.getFullYear(), subDate.getMonth(), subDate.getDate() + 14);
        const todayDate = new Date();
        if(todayDate > maxDate) {
          if(!(item.formStatus === 'Rejected') && !(item.formStatus === 'Approved')) {
            this.forms.update(new Form(
              item.formId,
              item.username,
              item.name,
              item.email,
              item.submissionDate,
              item.eventDate,
              item.time,
              item.location,
              item.description,
              item.cost,
              item.gradingFormat,
              item.finalGrade,
              item.gradeCutoff,
              item.gradeSatisfaction,
              item.urgency,
              item.eventType,
              item.attached,
              'Approved',
              'Approved',
              item.comment,
            ));
          }
        }
      }
    });
  }
}

export default new FormService();

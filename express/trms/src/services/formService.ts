import Form from '../models/form';
import FormDAO from '../DAO/formDAO';

export class FormService {
  constructor(
    public forms = FormDAO,
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

  addForm(form: Form): Promise<boolean> {
    const subDate = new Date();
    const id = Math.random().toString(36).substring(8);
    const isUrgent = this.urgency(subDate, form.eventDate);
    return this.forms.addForm(new Form(
      id,
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
      undefined,
      isUrgent,
      form.eventType,
      form.attached,
      'To Super',
      'Pending',
    ));
  }

  getById(id: string): Promise<Form | undefined> {
    return this.forms.getById(id);
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

  changeToEmployee(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, 'To Employee', form.approvedBy,
    ));
  }

  changeToSuper(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, 'To Super', form.approvedBy,
    ));
  }

  changeToHead(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, 'To Head', form.approvedBy,
    ));
  }

  changeToCoordinator(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, 'To Coordinator', form.approvedBy,
    ));
  }

  changeApprovedToSuper(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, form.formStatus, 'Super',
    ));
  }

  changeApprovedToHead(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, form.formStatus, 'Head',
    ));
  }

  changeApprovedToCoordinator(form: Form): Promise<boolean> {
    return this.update(new Form(
      form.formId, form.name, form.email, form.submissionDate,
      form.eventDate, form.time, form.location, form.description,
      form.cost, form.gradingFormat, form.finalGrade, form.gradeSatisfaction,
      form.urgency, form.eventType, form.attached, form.formStatus, 'Coordinator',
    ));
  }
}

export default new FormService();

import Form, { EventType } from '../models/form';
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

  addForm(
    name: string,
    email: string,
    eventDate: Date,
    time: Date,
    location: string,
    description: string,
    cost: number,
    gradingFormat: 'Score' | 'Presentation',
    eventType: EventType,
    attached: {} | undefined,
  ): Promise<boolean> {
    const subDate = new Date();
    const id = Math.floor(Math.random() * 900000) + 100000;
    const isUrgent = this.urgency(subDate, eventDate);

    const newForm = new Form(
      id,
      name,
      email,
      subDate,
      eventDate,
      time,
      location,
      description,
      cost,
      gradingFormat,
      undefined,
      undefined,
      isUrgent,
      eventType,
      attached,
      'To Super',
      'Pending',
    );

    return this.forms.addForm(newForm);
  }

  getById(id: number): Promise<Form | undefined> {
    return this.forms.getById(id);
  }

  getFormsByStatus(formStatus: string): Promise<Form[]> {
    return this.forms.getFormsByStatus(formStatus);
  }

  getAll(): Promise<Form[]> {
    return this.forms.getAll();
  }

  update(form: Form): Promise<boolean> {
    return this.forms.update(form);
  }

  delete(id: number): Promise<boolean> {
    return this.forms.delete(id);
  }
}

export default new FormService();

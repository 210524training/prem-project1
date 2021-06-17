import Form from '../models/form';
import FormDAO from '../DAO/formDAO';

export class FormService {
  constructor(
		public forms = FormDAO,
  ) {}

  addForm(form: Form): Promise<boolean> {
    return this.forms.addForm(form);
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

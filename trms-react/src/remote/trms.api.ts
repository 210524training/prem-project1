import Form from '../models/form';
import User from '../models/user';
import tuitionClient from './trms.client';

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await tuitionClient.post<User>('/login', {
		username,
		password,
	});
	return user;
}

export const sendRegister = async (username: string | undefined, password: string | undefined, email: string | undefined): Promise<User> => {
  const {data: user} = await tuitionClient.post<User>('/api/v1/users', {
		username,
		password,
		email,
	});
	return user;
}

export const getFormsByStatus = async (formStatus: string | undefined): Promise<Form[]> => {
	const {data: forms} = await tuitionClient.get<Form[]>(`/api/v1/forms/${formStatus}/get-forms`);
	return forms as Form[];
}

export const sendNewForm = async (
	formId: string | undefined, username: string | undefined, name: string | undefined, email: string | undefined,
	submissionDate: string | undefined, eventDate: string | undefined, time: string | undefined, location: string | undefined,
	description: string | undefined, cost: string | undefined, gradingFormat: string | undefined,
	finalGrade: string | undefined, gradeCutoff: string | undefined, gradeSatisfaction: string | undefined,
	urgency: string | undefined, eventType: string | undefined, attached: {} | undefined,
	formStatus: string | undefined, approvedBy: string | undefined,
	): Promise<Form> => {
		let newCost = Number(cost);

		const {data: form} = await tuitionClient.post<Form>('/api/v1/forms', {
			formId, username, name, email, submissionDate, eventDate, time, location, description, newCost, gradingFormat,
			finalGrade, gradeCutoff, gradeSatisfaction, urgency, eventType, attached, formStatus, approvedBy,
		});
	return form;
}

export const getByUsername = async (username: string): Promise<Form[]> => {
	const {data: forms} = await tuitionClient.get<Form[]>(`/api/v1/forms/${username}`);
	return forms as Form[];
}

export const updateForm = async (form: Form): Promise<Form> => {
	const {data: forms} = await tuitionClient.put<Form>('/api/v1/forms');
	return forms;
}
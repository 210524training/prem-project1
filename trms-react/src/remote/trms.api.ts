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
	formId: string | null, username: string | null, name: string | null, email: string | null,
	submissionDate: string | null, eventDate: string | null, time: string | null, location: string | null,
	description: string | null, cost: string | null, gradingFormat: string | null,
	finalGrade: string | null, gradeCutoff: string | null, gradeSatisfaction: string | null,
	urgency: boolean | null, eventType: string | null, attached: File | string | null,
	formStatus: string | null, approvedBy: string | null, comment: string | null,
	): Promise<Form> => {
		const {data: form} = await tuitionClient.post<Form>('/api/v1/forms', {
			formId, username, name, email, submissionDate, eventDate, time, location, description, cost, gradingFormat,
			finalGrade, gradeCutoff, gradeSatisfaction, urgency, eventType, attached, formStatus, approvedBy, comment,
		});
	return form;
}

export const getByUsername = async (username: string | null): Promise<Form[]> => {
	const {data: forms} = await tuitionClient.get<Form[]>(`/api/v1/forms/${username}/user`);
	return forms as Form[];
}

export const updateForm = async (form: Form): Promise<Form> => {
	console.log(form.formStatus);
	console.log(form.approvedBy);
	console.log(form.finalGrade);
	const {data: forms} = await tuitionClient.put<Form>('/api/v1/forms/update', {
		form,
	});
	return forms;
}
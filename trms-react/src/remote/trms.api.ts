import User from '../models/user';
import tuitionClient from './trms.client';

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await tuitionClient.post<User>('/login', {
		username,
		password,
	});
	return user;
}

export const sendRegister = async (username: string, password: string, email: string): Promise<User> => {
  const {data: user} = await tuitionClient.post<User>('/api/v1/users', {
		username,
		password,
		email,
	});
	return user;
}
import User from '../models/user';
import tuitionClient from './trms.client';

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await tuitionClient.post<User>('/login', {
		username,
		password,
	});
	return user;
}
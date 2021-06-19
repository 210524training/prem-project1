/* eslint-disable no-tabs */
// username
// password
// role
// email
// form id

export type Role = 'Employee' | 'Supervisor' | 'Head' | 'Co';

export default class User {
  constructor(
		public username: string,
		public password: string,
		public role: Role,
		public email: string,
		public forms: string[],
  ) {}
}

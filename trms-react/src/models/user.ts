export type Role = 'Employee' | 'Supervisor' | 'Head' | 'Co';

export default interface User {
    username: string;
    password: string;
    role: Role;
    email: string;
    forms: string[];
    availableAmount: number,
	pendingAmount: number,
}
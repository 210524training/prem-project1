export type Role = 'Employee' | 'Supervisor' | 'Head' | 'Co';

export default interface User {
    username: string | undefined,
    password: string | undefined,
    role: Role | undefined,
    email: string| undefined,
    forms: string[] | undefined,
    availableAmount: number,
	pendingAmount: number,
}
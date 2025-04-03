export interface CreateEmployeeData {
	username: string;
	password: string;
	name: string;
	email: string;
	mobile?: string;
}

export interface EmployeeData {
	id: number;
	username: string;
	name: string;
	email: string;
	mobile?: string;
	createdAt: Date;
	updatedAt: Date;
}
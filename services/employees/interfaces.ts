import type { Employee } from '@prisma/client';

interface IEmployeeService {
	createEmployee(data: CreateEmployeeData): Promise<EmployeeData>;
	getAllEmployees(): Promise<EmployeeData[]>;
	findEmployeeByUsername(username: string): Promise<Employee | null>;
}

interface CreateEmployeeData {
	username: string;
	password: string;
	name: string;
	email: string;
	mobile?: string;
}

interface EmployeeData {
	id: number;
	username: string;
	name: string;
	email: string;
	mobile?: string;
	createdAt: Date;
	updatedAt: Date;
}

export type { IEmployeeService, CreateEmployeeData, EmployeeData };

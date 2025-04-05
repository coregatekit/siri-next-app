import type { PrismaClient } from '@prisma/client';
import type { CreateEmployeeData, EmployeeData } from './interfaces';
import type { EncryptionService } from '../encryptions';

export class EmployeeService {
	private readonly prisma: PrismaClient;
	private readonly encryptionService: EncryptionService;

	constructor(
		prismaClient: PrismaClient,
		encryptionService: EncryptionService,
	) {
		this.prisma = prismaClient;
		this.encryptionService = encryptionService;
	}

	async createEmployee(data: CreateEmployeeData): Promise<EmployeeData> {
		try {
			// Check existing employee
			const existingUser = await this.prisma.employee.findFirst({
				where: {
					OR: [{ username: data.username }, { email: data.email }],
				},
			});

			if (existingUser) {
				throw new Error(
					existingUser.username === data.username
						? 'Username already exists'
						: 'Email already exists',
				);
			}

			// Hash password
			const hashedPassword = await this.encryptionService.hashPassword(
				data.password,
			);

			// Create employee
			const employee = await this.prisma.employee.create({
				data: {
					username: data.username,
					password: hashedPassword,
					name: data.name,
					email: data.email,
					mobile: data.mobile,
				},
			});

			return {
				id: employee.id,
				username: employee.username,
				name: employee.name,
				email: employee.email,
				mobile: employee.mobile,
				createdAt: employee.created_at,
				updatedAt: employee.updated_at,
			} as unknown as EmployeeData;
		} catch (error: unknown) {
			console.error('Error creating employee:', error);
			if (error instanceof Error) {
				const errorMessage = error.message;
				throw new Error(errorMessage);
			}
			return Promise.reject(
				'Unexpected error occurred while creating employee',
			);
		}
	}

	async getAllEmployees(): Promise<EmployeeData[]> {
		try {
			const employees = await this.prisma.employee.findMany();

			return employees.map((employee) => ({
				id: employee.id,
				username: employee.username,
				name: employee.name,
				email: employee.email,
				mobile: employee.mobile,
				isAdmin: employee.is_admin,
				isSetPw: employee.is_set_pw,
				createdAt: employee.created_at,
				updatedAt: employee.updated_at,
			})) as unknown as EmployeeData[];
		} catch (error) {
			console.error('Error fetching employees:', error);
			throw new Error('Failed to fetch employees');
		}
	}
}

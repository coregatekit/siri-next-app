import type { PrismaClient } from '@prisma/client';
import { EmployeeService } from '.';
import { type DeepMockProxy, mockDeep } from 'jest-mock-extended';
import type { EncryptionService } from '../encryptions';

jest.mock('@prisma/client', () => ({
	PrismaClient: jest.fn(),
}));

describe('Employee Service', () => {
	let service: EmployeeService;
	let prisma: DeepMockProxy<PrismaClient>;
	let encryptionService: DeepMockProxy<EncryptionService>;

	beforeEach(() => {
		jest.clearAllMocks();
		prisma = mockDeep<PrismaClient>();
		encryptionService = mockDeep<EncryptionService>();
		service = new EmployeeService(prisma, encryptionService);
	});

	describe('createEmployee', () => {
		const mockEmployeeData = {
			username: 'testuser',
			password: 'testpassword',
			name: 'Test User',
			email: 'test@example.com',
			mobile: '0991112234',
		};

		const mockCreatedEmployee = {
			id: '123',
			username: 'testuser',
			password: 'hashedpassword',
			name: 'Test User',
			email: 'test@example.com',
			mobile: '0991112234',
			is_set_pw: false,
			is_admin: false,
			created_at: new Date(),
			updated_at: new Date(),
		};

		it('should create an employee successfully', async () => {
			// Arrange
			prisma.employee.findFirst.mockResolvedValue(null);
			encryptionService.hashPassword.mockResolvedValue(
				mockCreatedEmployee.password,
			);
			prisma.employee.create.mockResolvedValue(mockCreatedEmployee);

			// Act
			const result = await service.createEmployee(mockEmployeeData);

			// Assert
			const expectedResponse = {
				id: mockCreatedEmployee.id,
				username: mockCreatedEmployee.username,
				name: mockCreatedEmployee.name,
				email: mockCreatedEmployee.email,
				mobile: mockCreatedEmployee.mobile,
				createdAt: mockCreatedEmployee.created_at,
				updatedAt: mockCreatedEmployee.updated_at,
			};

			expect(result).toEqual(expectedResponse);
			expect(prisma.employee.findFirst).toHaveBeenCalledWith({
				where: {
					OR: [
						{ username: mockEmployeeData.username },
						{ email: mockEmployeeData.email },
					],
				},
			});
			expect(encryptionService.hashPassword).toHaveBeenCalledWith(
				mockEmployeeData.password,
			);
			expect(prisma.employee.create).toHaveBeenCalledWith({
				data: {
					username: mockEmployeeData.username,
					password: mockCreatedEmployee.password,
					name: mockEmployeeData.name,
					email: mockEmployeeData.email,
					mobile: mockEmployeeData.mobile,
				},
			});
		});
	});
});

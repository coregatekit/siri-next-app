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
			isSetPw: false,
			isAdmin: false,
			createdAt: new Date(),
			updatedAt: new Date(),
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
				createdAt: mockCreatedEmployee.createdAt,
				updatedAt: mockCreatedEmployee.updatedAt,
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

		it('should throw an error if username already exists', async () => {
			// Arrange
			prisma.employee.findFirst.mockResolvedValue(mockCreatedEmployee);

			// Act & Assert
			await expect(service.createEmployee(mockEmployeeData)).rejects.toThrow(
				'Username already exists',
			);
			expect(prisma.employee.findFirst).toHaveBeenCalledWith({
				where: {
					OR: [
						{ username: mockEmployeeData.username },
						{ email: mockEmployeeData.email },
					],
				},
			});
		});

		it('should throw an error if email already exists', async () => {
			// Arrange
			const existingEmployee = {
				...mockCreatedEmployee,
				username: 'otheruser',
			};
			prisma.employee.findFirst.mockResolvedValue(existingEmployee);

			// Act & Assert
			await expect(service.createEmployee(mockEmployeeData)).rejects.toThrow(
				'Email already exists',
			);
			expect(prisma.employee.findFirst).toHaveBeenCalledWith({
				where: {
					OR: [
						{ username: mockEmployeeData.username },
						{ email: mockEmployeeData.email },
					],
				},
			});
		});

		it('should throw an error if an unexpected error occurs', async () => {
			// Arrange
			const unexpectedError = new Error(
				'Unexpected error occurred while creating employee',
			);
			prisma.employee.findFirst.mockResolvedValue(null);
			encryptionService.hashPassword.mockRejectedValue(unexpectedError);

			// Act & Assert
			await expect(service.createEmployee(mockEmployeeData)).rejects.toThrow(
				'Unexpected error occurred while creating employee',
			);
			expect(prisma.employee.findFirst).toHaveBeenCalledWith({
				where: {
					OR: [
						{ username: mockEmployeeData.username },
						{ email: mockEmployeeData.email },
					],
				},
			});
		});

		it('should handle non-Error exceptions', async () => {
			// Arrange
			prisma.employee.findFirst.mockResolvedValue(null);
			encryptionService.hashPassword.mockImplementation(() => {
				// Throw a non-Error object
				throw 'String error';
			});

			// Act & Assert
			await expect(service.createEmployee(mockEmployeeData)).rejects.toEqual(
				'Unexpected error occurred while creating employee',
			);
			expect(prisma.employee.findFirst).toHaveBeenCalled();
			expect(encryptionService.hashPassword).toHaveBeenCalled();
		});

		it('should handle null error', async () => {
			// Arrange
			prisma.employee.findFirst.mockResolvedValue(null);
			encryptionService.hashPassword.mockImplementation(() => {
				// Throw null
				throw null;
			});

			// Act & Assert
			await expect(service.createEmployee(mockEmployeeData)).rejects.toEqual(
				'Unexpected error occurred while creating employee',
			);
			expect(prisma.employee.findFirst).toHaveBeenCalled();
			expect(encryptionService.hashPassword).toHaveBeenCalled();
		});
	});
});

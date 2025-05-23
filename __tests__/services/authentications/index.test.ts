import { AuthenticationService } from '@/services/authentications';
import type { IAuthenticationService } from '@/services/authentications/interfaces';
import type { IEmployeeService } from '@/services/employees/interfaces';
import type { IEncryptionService } from '@/services/encryptions/interfaces';
import { mockDeep } from 'jest-mock-extended';

describe('Authentication Service', () => {
	let service: IAuthenticationService;
	let employeeService: IEmployeeService;
	let encryptionService: IEncryptionService;

	beforeEach(() => {
		jest.clearAllMocks();
		employeeService = mockDeep<IEmployeeService>();
		encryptionService = mockDeep<IEncryptionService>();

		service = new AuthenticationService(employeeService, encryptionService);
	});

	describe('signIn', () => {
		it('should return token when credentials are valid', async () => {
			// Arrange
			const username = 'testuser';
			const password = 'testpassword';
			const hashedPassword = 'hashedpassword';
			employeeService.findEmployeeByUsername = jest.fn().mockResolvedValue({
				id: '123',
				username: 'testuser',
				password: hashedPassword,
				name: 'Test User',
			});
			encryptionService.verifyPassword = jest.fn().mockResolvedValue(true);

			// Act
			const result = await service.signIn(username, password);

			// Assert
			expect(result).toBeTruthy();
			expect(result.success).toBe(true);
			expect(employeeService.findEmployeeByUsername).toHaveBeenCalledWith(
				username,
			);
			expect(encryptionService.verifyPassword).toHaveBeenCalledWith(
				password,
				hashedPassword,
			);
		});

		it('should throw error when employee not found', async () => {
			// Arrange
			const username = 'nonexistentuser';
			const password = 'testpassword';
			employeeService.findEmployeeByUsername = jest
				.fn()
				.mockResolvedValue(null);

			// Act
			const result = await service.signIn(username, password);

			// Assert
			expect(result).toBeTruthy();
			expect(result.success).toBe(false);
			expect(result.message).toBe('Employee not found');
			expect(employeeService.findEmployeeByUsername).toHaveBeenCalledWith(
				username,
			);
		});

		it('should throw error when password is invalid', async () => {
			// Arrange
			const username = 'testuser';
			const password = 'testpassword';
			const hashedPassword = 'hashedpassword';
			employeeService.findEmployeeByUsername = jest.fn().mockResolvedValue({
				id: '123',
				username: 'testuser',
				password: hashedPassword,
				name: 'Test User',
			});
			encryptionService.verifyPassword = jest.fn().mockResolvedValue(false);

			// Act
			const result = await service.signIn(username, password);

			// Assert
			expect(result).toBeTruthy();
			expect(result.success).toBe(false);
			expect(result.message).toBe('Invalid password');
			expect(employeeService.findEmployeeByUsername).toHaveBeenCalledWith(
				username,
			);
			expect(encryptionService.verifyPassword).toHaveBeenCalledWith(
				password,
				hashedPassword,
			);
		});

		it('should throw error when an unknown error occurs', async () => {
			// Arrange
			const username = 'testuser';
			const password = 'testpassword';
			const error = new Error('Database connection failed');
			employeeService.findEmployeeByUsername = jest
				.fn()
				.mockRejectedValue(error);

			// Act & Assert
			await expect(service.signIn(username, password)).rejects.toThrowError(
				'Database connection failed',
			);
			expect(employeeService.findEmployeeByUsername).toHaveBeenCalledWith(
				username,
			);
		});

		it('should throw generic error when unknown error without message occurs', async () => {
			// Arrange
			const username = 'testuser';
			const password = 'testpassword';
			employeeService.findEmployeeByUsername = jest
				.fn()
				.mockRejectedValue('Something went wrong');

			// Act & Assert
			await expect(service.signIn(username, password)).rejects.toThrowError(
				'Unknown error occurred',
			);
			expect(employeeService.findEmployeeByUsername).toHaveBeenCalledWith(
				username,
			);
		});
	});
});

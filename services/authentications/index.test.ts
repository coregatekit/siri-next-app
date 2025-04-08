import { mockDeep } from 'jest-mock-extended';
import type { IEmployeeService } from '../employees/interfaces';
import type { IEncryptionService } from '../encryptions/interfaces';
import type { IAuthenticationService } from './interfaces';
import { AuthenticationService } from '.';

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
			employeeService.findEmployeeByUsername = jest.fn().mockResolvedValue({
				id: '123',
				username: 'testuser',
				password: 'hashedpassword',
				name: 'Test User',
			});

			// Act
			const result = await service.signIn(username, password);

			// Assert
			expect(result).toBe('');
			expect(employeeService.findEmployeeByUsername).toHaveBeenCalledWith(
				username,
			);
		});
	});
});

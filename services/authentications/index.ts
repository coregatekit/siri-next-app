import type { IEmployeeService } from '../employees/interfaces';
import type { IEncryptionService } from '../encryptions/interfaces';
import type { IAuthenticationService } from './interfaces';

export class AuthenticationService implements IAuthenticationService {
	private readonly employeeService: IEmployeeService;
	private readonly encryptionService: IEncryptionService;

	constructor(
		employeeService: IEmployeeService,
		encryptionService: IEncryptionService,
	) {
		this.encryptionService = encryptionService;
		this.employeeService = employeeService;
	}

	async signIn(username: string, password: string): Promise<string | null> {
		try {
			// Find employee by username
			const employee =
				await this.employeeService.findEmployeeByUsername(username);
      
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Verify password
      const isPasswordValid = await this.encryptionService.verifyPassword(password, employee.password)
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
			return '';
		} catch (error: unknown) {
			console.error('Error signing in:', error);
			if (error instanceof Error) {
				throw new Error(error.message);
			}
			throw new Error('Unknown error occurred');
		}
	}
}

import type { JwtPayload, SessionPayload } from '@/app/types/auth';
import type { IEmployeeService } from '../employees/interfaces';
import type { IEncryptionService } from '../encryptions/interfaces';
import type { IAuthenticationService, SignInResult } from './interfaces';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@/commons/constants';

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

	async signIn(username: string, password: string): Promise<SignInResult> {
		try {
			// Find employee by username
			const employee =
				await this.employeeService.findEmployeeByUsername(username);

			if (!employee) {
				return {
					success: false,
					message: 'Employee not found',
				}
			}

			// Verify password
			const isPasswordValid = await this.encryptionService.verifyPassword(
				password,
				employee.password,
			);
			if (!isPasswordValid) {
				return {
					success: false,
					message: 'Invalid password',
				}
			}

			const payload: JwtPayload = {
				id: employee.id,
				username: employee.username,
				name: employee.name,
			};
			const accessToken = sign(payload, JWT_SECRET, {
				expiresIn: '1h',
			});

			return {
				success: true,
				message: 'Sign in successful',
				accessToken,
			};
		} catch (error: unknown) {
			console.error('Error signing in:', error);
			if (error instanceof Error) {
				throw new Error(error.message);
			}
			throw new Error('Unknown error occurred');
		}
	}
}

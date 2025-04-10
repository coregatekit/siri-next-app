import type { IAuthenticationService } from '@/services/authentications/interfaces';
import { EmployeeService } from '@/services/employees';
import type { IEmployeeService } from '@/services/employees/interfaces';
import { EncryptionService } from '@/services/encryptions';
import type { IEncryptionService } from '@/services/encryptions/interfaces';
import { closePrismaClient, getPrismaClient } from './prisma';
import { AuthenticationService } from '@/services/authentications';

let encryptionServie: IEncryptionService | null = null;
let employeeService: IEmployeeService | null = null;
let authServie: IAuthenticationService | null = null;

/**
 * Get an EncryptionService instance.
 * @returns {IEncryptionService} The EncryptionService instance.
 */
export function getEncryptionService(): IEncryptionService {
	if (!encryptionServie) {
		encryptionServie = new EncryptionService();
	}
	return encryptionServie;
}

/**
 * Get an EmployeeService instance.
 * @returns {IEmployeeService} The EmployeeService instance.
 */
export function getEmployeeService(): IEmployeeService {
	if (!employeeService) {
		employeeService = new EmployeeService(
			getPrismaClient(),
			getEncryptionService(),
		);
	}
	return employeeService;
}

/**
 * Get an AuthenticationService instance.
 * @returns {IAuthenticationService} The AuthenticationService instance.
 */
export function getAuthenticationService(): IAuthenticationService {
	if (!authServie) {
		authServie = new AuthenticationService(
			getEmployeeService(),
			getEncryptionService(),
		);
	}
	return authServie;
}

/**
 * Close all services.
 * @returns {Promise<void>} A promise that resolves when all services are closed.
 */
export async function closeServices(): Promise<void> {
  await closePrismaClient();
  encryptionServie = null;
  employeeService = null;
  authServie = null;
}

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
		return '';
	}
}

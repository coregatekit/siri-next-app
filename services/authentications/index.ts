import type { EmployeeService } from '../employees';
import type { EncryptionService } from '../encryptions';

export class AuthenticationService {
	private readonly employeeService: EmployeeService;
	private readonly encryptionService: EncryptionService;

	constructor(
		employeeService: EmployeeService,
		encryptionService: EncryptionService,
	) {
		this.encryptionService = encryptionService;
		this.employeeService = employeeService;
	}
}

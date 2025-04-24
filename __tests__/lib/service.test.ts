import {
	getEncryptionService,
	closeServices,
	getEmployeeService,
} from '@/lib/service';
import { EncryptionService } from '@/services/encryptions';
import { EmployeeService } from '@/services/employees';

// Mock PrismaClient to avoid browser environment issues
jest.mock('@prisma/client', () => {
	return {
		PrismaClient: jest.fn().mockImplementation(() => {
			return {
				$connect: jest.fn(),
				$disconnect: jest.fn(),
			};
		}),
	};
});

describe('Service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('getEncryptionService', () => {
		afterEach(async () => {
			await closeServices();
		});

		it('should return an instance of EncryptionService', () => {
			const service = getEncryptionService();

			expect(service).toBeDefined();
			expect(service).toBeInstanceOf(EncryptionService);
		});
	});

	describe('getEmployeeService', () => {
		afterEach(async () => {
			await closeServices();
		});

		it('should return an instance of EmployeeService', () => {
			const service = getEmployeeService();

			expect(service).toBeDefined();
			expect(service).toBeInstanceOf(EmployeeService);
		});
	});
});

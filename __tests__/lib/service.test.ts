import {
	getEncryptionService,
	closeServices,
	getEmployeeService,
	getAuthenticationService,
	getTodoService,
	getRoomTypeService,
} from '@/lib/service';
import { EncryptionService } from '@/services/encryptions';
import { EmployeeService } from '@/services/employees';
import { AuthenticationService } from '@/services/authentications';
import { TodoService } from '@/services/todos';
import { RoomTypeService } from '@/services/room-types';

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

	describe('getAuthenticationService', () => {
		it('should return an instance of AuthenticationService', () => {
			const service = getAuthenticationService();

			expect(service).toBeDefined();
			expect(service).toBeInstanceOf(AuthenticationService);
		});
	});

	describe('getTodoService', () => {
		it('should return an instance of TodoService', () => {
			const service = getTodoService();

			expect(service).toBeDefined();
			expect(service).toBeInstanceOf(TodoService);
		});
	});

	describe('getRoomTypeService', () => {
		it('should return an instance of RoomTypeService', () => {
			const service = getRoomTypeService();

			expect(service).toBeDefined();
			expect(service).toBeInstanceOf(RoomTypeService);
		});
	});
});

import { getEncryptionService, closeServices } from '@/lib/service';

describe('Service', () => {
	describe('getEncryptionService', () => {
		afterEach(async () => {
			await closeServices();
		});

		it('should return an instance of EncryptionService', () => {
			const service = getEncryptionService();

			expect(service).toBeDefined();
		});
	});
});

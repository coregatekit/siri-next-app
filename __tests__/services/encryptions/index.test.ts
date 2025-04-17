import { EncryptionService } from '@/services/encryptions';
import type { IEncryptionService } from '@/services/encryptions/interfaces';
import argon2 from 'argon2';

jest.mock('argon2', () => ({
	hash: jest.fn(),
	verify: jest.fn(),
	argon2id: 2,
}));

describe('EncryptionService', () => {
	let service: IEncryptionService;

	beforeEach(() => {
		jest.clearAllMocks();
		service = new EncryptionService();
	});

	describe('hashPassword', () => {
		it('should hash a password', async () => {
			// Arrange
			const plaintext = 'securePassword999';
			const expectedHash = 'hashedPassword123';
			(argon2.hash as jest.Mock).mockReturnValue(expectedHash);

			// Act
			const result = await service.hashPassword(plaintext);

			// Assert
			expect(result).toBe(expectedHash);
			expect(argon2.hash).toHaveBeenCalledWith(plaintext, {
				type: argon2.argon2id,
				memoryCost: 65536,
				timeCost: 4,
				parallelism: 4,
			});
		});

		it('should throw an error if hashing fails', async () => {
			// Arrange
			const plaintext = 'securePassword999';
			const errorMessage = 'Hashing failed';
			(argon2.hash as jest.Mock).mockRejectedValue(new Error(errorMessage));

			// Act & Assert
			await expect(service.hashPassword(plaintext)).rejects.toThrow(
				'Failed to hash password',
			);
			expect(argon2.hash).toHaveBeenCalledWith(plaintext, {
				type: argon2.argon2id,
				memoryCost: 65536,
				timeCost: 4,
				parallelism: 4,
			});
		});
	});

	describe('VerifyPassword', () => {
		it('should verify a password against a hash', async () => {
			// Arrange
			const plaintext = 'securePassword999';
			const hash = 'hashedPassword123';
			(argon2.verify as jest.Mock).mockReturnValue(true);

			// Act
			const result = await service.verifyPassword(plaintext, hash);

			// Assert
			expect(result).toBe(true);
			expect(argon2.verify).toHaveBeenCalledWith(hash, plaintext);
		});

		it('should throw an error if verification fails', async () => {
			// Arrange
			const plaintext = 'securePassword999';
			const hash = 'hashedPassword123';
			(argon2.verify as jest.Mock).mockRejectedValue(
				new Error('Verification failed'),
			);

			// Act & Assert
			await expect(service.verifyPassword(plaintext, hash)).rejects.toThrow(
				'Failed to verify password',
			);
			expect(argon2.verify).toHaveBeenCalledWith(hash, plaintext);
		});
	});
});

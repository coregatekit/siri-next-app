import argon2 from 'argon2';
import { hashPassword } from '@/lib/encryptions';

jest.mock('argon2', () => ({
	hash: jest.fn(),
	verify: jest.fn(),
	argon2id: 2,
}));

describe('hashPassword', () => {
	it('should hash a password', async () => {
		// Arrange
		const plaintext = 'securePassword999';
		const expectedHash = 'hashedPassword123';
		(argon2.hash as jest.Mock).mockReturnValue(expectedHash);

		// Act
		const result = await hashPassword(plaintext);

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
		await expect(hashPassword(plaintext)).rejects.toThrow(
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

import argon2 from 'argon2';

/**
 * Hash a password using Argon2
 * @param plaintext - The password to hash
 * @returns Promise containing the hashed password
 */
async function hashPassword(plaintext: string): Promise<string> {
	try {
		return await argon2.hash(plaintext, {
			type: argon2.argon2id, // Use Argon2id for better security
			memoryCost: 65536,
			timeCost: 4,
			parallelism: 4,
		});
	} catch (error) {
		console.error('Error hashing password:', error);
		throw new Error('Failed to hash password');
	}
}

/**
 * Verify a password against a hash
 * @param plaintext - The password to verify
 * @param hash - The hashed password
 * @returns Promise containing the verification result
 */
async function verifyPassword(
	plaintext: string,
	hash: string,
): Promise<boolean> {
	try {
		return await argon2.verify(hash, plaintext);
	} catch (error) {
		console.error('Error verifying password:', error);
		throw new Error('Failed to verify password');
	}
}

export { hashPassword };

interface IEncryptionService {
	/**
	 * Hashes a password using Argon2 algorithm.
	 * @param password - The password to hash.
	 * @param options - Optional hashing options.
	 * @returns A promise that resolves to the hashed password.
	 */
	hashPassword(password: string, options?: HashOptions): Promise<string>;

	/**
	 * Verifies a password against a hashed password.
	 * @param password - The password to verify.
	 * @param hashedPassword - The hashed password to compare against.
	 * @returns A promise that resolves to true if the password matches, false otherwise.
	 */
	verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}

interface HashOptions {
	/**
	 * Determines the memory usage of the algorithm (in KiB)
	 * Default is 65536 (64 MiB)
	 */
	memoryCost?: number;

	/**
	 * Determines the number of iterations
	 * Default is 3
	 */
	timeCost?: number;

	/**
	 * Determines the number of parallel threads
	 * Default is 4
	 */
	parallelism?: number;
}

export type { IEncryptionService, HashOptions };

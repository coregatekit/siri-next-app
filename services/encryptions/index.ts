import * as argon2 from 'argon2';
import type { HashOptions } from './interfaces';

export class EncryptionService {
	private readonly options: HashOptions;

	constructor() {
		this.options = {
			memoryCost: 65536,
			timeCost: 4,
			parallelism: 4,
		};
	}

  /**
   * Hash a password using Argon2
   * @param plaintext - The password to hash
   * @returns Promise containing the hashed password
   */
  async hashPassword(plaintext: string): Promise<string> {
    try {
      return await argon2.hash(plaintext, {
        type: argon2.argon2id, // Use Argon2id for better security
        memoryCost: this.options.memoryCost,
        timeCost: this.options.timeCost,
        parallelism: this.options.parallelism,
      })
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Failed to hash password');
    }
  }
}

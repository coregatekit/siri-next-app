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
}

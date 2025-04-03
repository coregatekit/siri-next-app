export interface HashOptions {
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

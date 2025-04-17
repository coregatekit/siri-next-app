import {
	DB_CONNECTION_STRING,
	DB_CONNECTION_TIMEOUT,
	DB_IDLE_TIMEOUT,
	DB_POOL_MAX,
} from '@/commons/constants';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | null = null;

function getPrismaClient(): PrismaClient {
	if (!prismaClient) {
		console.log('Initializing Prisma client');
		const adapter = new PrismaPg(
			{
				connectionString: DB_CONNECTION_STRING,
				max: DB_POOL_MAX,
				idleTimeoutMillis: DB_IDLE_TIMEOUT,
				connectionTimeoutMillis: DB_CONNECTION_TIMEOUT,
				allowExitOnIdle: true,
			},
			{
				schema: 'public',
			},
		);
		prismaClient = new PrismaClient({
			adapter,
			log: ['query', 'info', 'warn', 'error'],
		});
	}

	return prismaClient;
}

async function closePrismaClient(): Promise<void> {
	if (prismaClient) {
		console.log('Closing Prisma client');
		await prismaClient.$disconnect();
		prismaClient = null;
	}

	return Promise.resolve();
}

export { getPrismaClient, closePrismaClient };

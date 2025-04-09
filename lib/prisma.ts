import {
	DB_CONNECTION_STRING,
	DB_CONNECTION_TIMEOUT,
	DB_IDLE_TIMEOUT,
	DB_POOL_MAX,
} from '@/commons/constants';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

let pgPool: Pool | null = null;
let prismaClient: PrismaClient | null = null;

function getPool(): Pool {
	if (!pgPool) {
		console.log('Initializing new PostgreSQL connection pool');
		pgPool = new Pool({
			connectionString: DB_CONNECTION_STRING,
			max: DB_POOL_MAX,
			idleTimeoutMillis: DB_IDLE_TIMEOUT,
			connectionTimeoutMillis: DB_CONNECTION_TIMEOUT,
			allowExitOnIdle: true,
		});

		pgPool.on('error', (err) => {
			console.error('Unexpected error on idle PostgreSQL client', err);
			process.exit(-1); // Exit process with failure
		});
	}

	return pgPool;
}

function getPrismaClient(): PrismaClient {
	if (!prismaClient) {
		console.log('Initializing Prisma client');
		const pool = getPool();
		const adapter = new PrismaPg(pool);
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

	if (pgPool) {
		console.log('Closing PostgreSQL connection pool');
		await pgPool.end();
		pgPool = null;
	}
	
	return Promise.resolve();
}

export { getPool, getPrismaClient, closePrismaClient };

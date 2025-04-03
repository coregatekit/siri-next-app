import type { PrismaClient } from '@prisma/client';

export class EmployeeService {
	private readonly prisma: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prisma = prismaClient;
	}
}

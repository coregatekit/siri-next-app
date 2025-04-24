import type { PrismaClient } from '@prisma/client';
import type { IRoomTypeService, RoomTypeData } from './interfaces';

export class RoomTypeService implements IRoomTypeService {
	private readonly prisma: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prisma = prismaClient;
	}

	async getAllRoomTypes(): Promise<RoomTypeData[]> {
		return [];
	}
}

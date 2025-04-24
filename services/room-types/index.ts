import type { PrismaClient } from '@prisma/client';
import type { IRoomTypeService, RoomTypeData } from './interfaces';

export class RoomTypeService implements IRoomTypeService {
	private readonly prisma: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prisma = prismaClient;
	}

	async getAllRoomTypes(): Promise<RoomTypeData[]> {
		try {
			const types = await this.prisma.type.findMany();
			return types.map((type) => ({
				id: type.id,
				name: type.name,
				detail: type.detail || undefined,
				createdAt: type.createdAt,
				updatedAt: type.updatedAt,
			}));
		} catch (error: unknown) {
      console.error('Error fetching room types:', error);
      throw new Error('Failed to fetch room types');
    }
	}
}

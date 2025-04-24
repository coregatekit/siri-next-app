import type { PrismaClient } from '@prisma/client';
import type { CreateRoomType, IRoomTypeService, RoomTypeData } from './interfaces';

export class RoomTypeService implements IRoomTypeService {
	private readonly prisma: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prisma = prismaClient;
	}

	/**
	 * Retrieves all room types from the database.
	 * @returns {Promise<RoomTypeData[]>} - Returns an array of room types.
	 * @throws {Error} - Throws an error if the database query fails.
	 */
	async getAllRoomTypes(): Promise<RoomTypeData[]> {
		try {
			const types = await this.prisma.type.findMany();
			return types.map((type) => ({
				id: type.id,
				name: type.name,
				detail: type.detail,
				createdAt: type.createdAt,
				updatedAt: type.updatedAt,
			}));
		} catch (error: unknown) {
      console.error('Error fetching room types:', error);
      throw new Error('Failed to fetch room types');
    }
	}

	/**
	 * Creates a new room type.
	 * @param {CreateRoomType} data - The room type data to create.
	 * @returns {Promise<RoomTypeData>} - Returns the created room type.
	 * @throws {Error} - Throws an error if the database query fails.
	 */
	async createRoomType(data: CreateRoomType): Promise<RoomTypeData> {
		const { name, detail } = data;
		try {
			const newType = await this.prisma.type.create({
				data: {
					name,
					detail,
				},
			});
			return {
				id: newType.id,
				name: newType.name,
				detail: newType.detail,
				createdAt: newType.createdAt,
				updatedAt: newType.updatedAt,
			};
		} catch (error: unknown) {
			console.error('Error creating room type:', error);
			throw new Error('Failed to create room type');
		}
	}
}

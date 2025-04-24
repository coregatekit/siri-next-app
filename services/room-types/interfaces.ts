interface IRoomTypeService {
  getAllRoomTypes(): Promise<RoomTypeData[]>;
}

interface RoomTypeData {
  id: string;
  name: string;
  detail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { IRoomTypeService, RoomTypeData };

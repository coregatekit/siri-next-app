import type { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const RoomTypesColumn: ColumnDef<RoomType>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'detail',
    header: 'Detail',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
  },
];

export default function ManageRoomTypes() {
	return <div>ManageRoomTypes</div>;
}

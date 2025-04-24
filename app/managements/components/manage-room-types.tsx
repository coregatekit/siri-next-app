'use client';

import useRoomTypes from '@/app/hooks/use-room-types';
import { DataTable } from '@/components/ui/data-table';
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
	{
		accessorKey: 'action',
		header: 'Action',
	},
];

export default function ManageRoomTypes() {
	const { roomTypeData } = useRoomTypes();

	return (
		<div className='rounded-md bg-white shadow-md'>
			<DataTable columns={RoomTypesColumn} data={roomTypeData || []} />
		</div>
	);
}

import { Button } from '@/components/ui/button';
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
		// cell: ({ row }) => (
		// 	<div className='flex gap-2'>
		// 		<Button className='text-blue-500'>Edit</Button>
		// 		<Button className='text-red-500'>Delete</Button>
		// 	</div>
		// ),
	},
];

export default function ManageRoomTypes() {
	return (
		<div className='rounded-md bg-white shadow-md'>
			<DataTable columns={RoomTypesColumn} data={[]} />
		</div>
	);
}

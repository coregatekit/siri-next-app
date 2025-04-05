'use client';

import type { Employee } from '@/app/types/employees';
import type { ColumnDef } from '@tanstack/react-table';

export const EmployeeColumn: ColumnDef<Employee>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'username',
		header: 'Username',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'mobile',
		header: 'Mobile',
	},
	{
		accessorKey: 'isAdmin',
		header: 'Admin',
	},
	{
		accessorKey: 'isSetPw',
		header: 'Already Set Password',
	},
	{
		accessorKey: 'updatedAt',
		header: 'Latest Update',
	},
];

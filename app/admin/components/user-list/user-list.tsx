import type { Employee } from '@/app/types/employees';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import React from 'react';
import { EmployeeColumn } from './columns';

const mockEmployeeData: Employee[] = [
	{
		id: 'test1',
		username: 'test1',
		name: 'Test User 1',
		email: 'tester1@example.com',
		mobile: '1234567890',
		isAdmin: true,
		isSetPw: true,
		createdAt: new Date('2025-01-01'),
		updatedAt: new Date('2025-01-02'),
	},
	{
		id: 'test2',
		username: 'test2',
		name: 'Test User 2',
		email: 'tester2@example.com',
		mobile: '1234567891',
		isAdmin: false,
		isSetPw: true,
		createdAt: new Date('2025-01-01'),
		updatedAt: new Date('2025-01-02'),
	},
	{
		id: 'test3',
		username: 'test3',
		name: 'Test User 3',
		email: 'tester3@example.com',
		mobile: '1234567892',
		isAdmin: false,
		isSetPw: false,
		createdAt: new Date('2025-01-01'),
		updatedAt: new Date('2025-01-02'),
	},
	{
		id: 'test1',
		username: 'test1',
		name: 'Test User 1',
		email: 'tester1@example.com',
		mobile: '1234567890',
		isAdmin: true,
		isSetPw: true,
		createdAt: new Date('2025-01-01'),
		updatedAt: new Date('2025-01-02'),
	},
	{
		id: 'test2',
		username: 'test2',
		name: 'Test User 2',
		email: 'tester2@example.com',
		mobile: '1234567891',
		isAdmin: false,
		isSetPw: true,
		createdAt: new Date('2025-01-01'),
		updatedAt: new Date('2025-01-02'),
	},
	{
		id: 'test3',
		username: 'test3',
		name: 'Test User 3',
		email: 'tester3@example.com',
		mobile: '1234567892',
		isAdmin: false,
		isSetPw: false,
		createdAt: new Date('2025-01-01'),
		updatedAt: new Date('2025-01-02'),
	},
];

function UserList() {
	return (
		<div className='my-4 bg-white rounded-lg'>
			<DataTable columns={EmployeeColumn} data={mockEmployeeData} />
		</div>
	);
}

export default UserList;

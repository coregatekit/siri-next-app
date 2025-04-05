import { useEffect, useState } from 'react';
import type { Employee } from '@/app/types/employees';
import { DataTable } from '@/components/ui/data-table';
import { EmployeeColumn } from './user-list-columns';

const mockEmployeeData: Employee[] = [
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
	const [employees, setEmployees] = useState<Employee[]>(mockEmployeeData);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchEmployees = async () => {
			setIsLoading(true);
			const response = await fetch('/api/admin/employees');
			if (response.status === 200) {
				const data = await response.json();
				setEmployees(data);
			}
			setIsLoading(false);
		};

		fetchEmployees();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='my-4 bg-white rounded-lg'>
			<DataTable columns={EmployeeColumn} data={employees} />
		</div>
	);
}

export default UserList;

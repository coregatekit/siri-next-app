import { useEffect, useState } from 'react';
import type { Employee } from '@/app/types/employees';
import { DataTable } from '@/components/ui/data-table';
import { EmployeeColumn } from './user-list-columns';

function UserList() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchEmployees = async () => {
			setIsLoading(true);
			const response = await fetch('/api/employees');
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

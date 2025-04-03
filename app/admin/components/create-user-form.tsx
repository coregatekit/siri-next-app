import { Card } from '@/components/ui/card';
import React from 'react';

function CreateUserForm() {
	return (
		<Card>
			<h1 className='text-xl'>Create a new user</h1>
			<p className='text-sm text-gray-500'>
				Create a new user by filling out the form below.
			</p>
		</Card>
	);
}

export default CreateUserForm;

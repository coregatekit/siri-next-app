import { Button } from '@/components/ui/button';
import React from 'react';

type Props = {
	user: string;
};

function Header({ user }: Props) {
	const handleLogout = () => {
		// Handle logout logic here
		alert('Not implemented yet');
	}
	return (
		<div className='flex gap-4'>
			<div className='flex flex-col'>
				<h1 className='text-xl font-bold'>Hello {user}</h1>
				<p className='text-gray-600'>Welcome to the admin panel.</p>
			</div>

			<Button className='mt-4' onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export default Header;

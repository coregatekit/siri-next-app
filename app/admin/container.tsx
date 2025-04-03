import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Header from './components/header';
import MenuTabs from './components/menu-tabs';

function AdminContainer() {
	const [user, setUser] = useState<string>('Admin');

	return (
		<div className='flex flex-col items-center justify-start min-h-screen bg-gray-100'>
			<div className='mt-24 p-8 w-3/4 h-3/4 '>
				<Header user={user} />
				<MenuTabs />
			</div>
			<div>
				<Button className='mt-4'>Logout</Button>
			</div>
		</div>
	);
}

export default AdminContainer;

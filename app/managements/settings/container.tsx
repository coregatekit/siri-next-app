import type { MenuItem } from '@/app/types/menu';
import Menu from '@/components/menu';
import React from 'react';

const menuItems: MenuItem[] = [
	{
		name: 'Room Types',
		description: 'Manage the room types',
		href: '',
	},
];
export default function SettingsContainer() {
	return (
		<div className='flex flex-col mt-10 mx-12'>
			<div className='text-2xl font-bold mb-12'>System Settings</div>
			<div className='w-full'>
				<Menu menus={menuItems} className='w-full'/>
			</div>
		</div>
	);
}

import Menu from '@/components/menu';
import React from 'react';
import type { MenuItem } from './types/menu';
import Routes from '@/commons/routes';

const menuItems: MenuItem[] = [
	{
		name: 'Booking',
		description: 'Book a room at Siri Resort',
		href: Routes.BOOKING,
	},
	{
		name: 'Rooms',
		description: 'View available rooms',
		href: Routes.ROOMS,
	},
	{
		name: 'Management',
		description: 'Manage the resort operations',
		href: Routes.MANAGEMENT,
	},
	{
		name: 'Payments',
		description: 'Summarize the payments',
		href: Routes.PAYMENTS,
	},
	{
		name: 'Todo',
		description: 'Manage your tasks',
		href: Routes.TODO,
	},
];

export default function HomeContainer() {
	return (
		<div className='flex flex-col justify-center items-center gap-4 py-12'>
			<h1 className='text-2xl font-bold text-slate-700'>
				Welcome to Siri Resort
			</h1>
			<p className='text-slate-500'>
				This is a sample application to demonstrate the usage of Next.js.
			</p>

			<Menu />
		</div>
	);
}

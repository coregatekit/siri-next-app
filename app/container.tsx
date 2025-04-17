import Menu from '@/components/menu';
import React from 'react';
import type { MenuItem } from './types/menu';
import Routes from '@/commons/routes';
import PlusIcon from '@/components/icons/plus';
import BedDoubleIcon from '@/components/icons/bed-double';
import SlidersHorizontalIcon from '@/components/icons/sliders-horizontal';
import HandCoinsIcon from '@/components/icons/hand-coins';
import TodoListIcon from '@/components/icons/list-todo';

const menuItems: MenuItem[] = [
	{
		name: 'Booking',
		description: 'Book a room at Siri Resort',
		href: Routes.BOOKING,
		icon: <PlusIcon className='text-primary' />,
	},
	{
		name: 'Rooms',
		description: 'View available rooms',
		href: Routes.ROOMS,
		icon: <BedDoubleIcon className='text-primary' />,
	},
	{
		name: 'Management',
		description: 'Manage the resort operations',
		href: Routes.MANAGEMENT,
		icon: <SlidersHorizontalIcon className='text-primary' />,
	},
	{
		name: 'Payments',
		description: 'Summarize the payments',
		href: Routes.PAYMENTS,
		icon: <HandCoinsIcon className='text-primary' />,
	},
	{
		name: 'Todo',
		description: 'Manage your tasks',
		href: Routes.TODO,
		icon: <TodoListIcon className='text-primary' />,
	},

	{
		name: 'Managementx',
		description: 'Manage the resort operations',
		href: Routes.MANAGEMENT,
	},
	{
		name: 'Paymentsx',
		description: 'Summarize the payments',
		href: Routes.PAYMENTS,
	},
	{
		name: 'Todox',
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

			<Menu menus={menuItems} />
		</div>
	);
}

import React from 'react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar';
import type { SidebarMenuItem as TSidebarMenuItem } from '@/app/types/menu';
import Link from 'next/link';

const roomsManagementSidebars: TSidebarMenuItem[] = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: <span>🏠</span>,
	},
	{
		title: 'Booking',
		url: '/booking',
		icon: <span>⚙️</span>,
	},
	{
		title: 'Rooms',
		url: '/rooms',
		icon: <span>🛏️</span>,
	},
	// {
	// 	title: 'Managements',
	// 	url: '/managements',
	// 	icon: <span>📊</span>,
	// },
	// {
	// 	title: 'Payments',
	// 	url: '/payments',
	// 	icon: <span>💰</span>,
	// },
	// {
	// 	title: 'Todo',
	// 	url: '/todo',
	// 	icon: <span>📝</span>,
	// },
];

export default function AppSidebar() {
	return (
		<Sidebar>
			{/* Header */}
			<SidebarHeader>
				<h1 className='text-2xl font-bold text-primary'>Siri Resort</h1>
			</SidebarHeader>
			<div className='border-t border-slate-200 my-1' />

			<SidebarContent>
				{/* Room management Menu */}
				<SidebarGroup>
					<SidebarGroupLabel>
						<span className=''>Room Managements</span>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{roomsManagementSidebars.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url} className='flex items-center gap-2'>
											{item.icon}
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
          
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}

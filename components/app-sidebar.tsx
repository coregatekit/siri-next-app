import React from 'react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar';
import type { SidebarMenuItem as TSidebarMenuItem } from '@/app/types/menu';
import Link from 'next/link';

const sidebarItems: TSidebarMenuItem[] = [
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
	{
		title: 'Managements',
		url: '/managements',
		icon: <span>📊</span>,
	},
	{
		title: 'Payments',
		url: '/payments',
		icon: <span>💰</span>,
	},
	{
		title: 'Todo',
		url: '/todo',
		icon: <span>📝</span>,
	},
];

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<h1>Siri Resort</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						{sidebarItems.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<Link href={item.url} className='flex items-center gap-2'>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}

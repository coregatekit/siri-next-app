'use client';

import React, { useEffect } from 'react';
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
import useAuth from '@/app/contexts/auth.context';
import SidebarUser from './sidebar-user';

const roomManagementSidebars: TSidebarMenuItem[] = [
	{
		title: 'Dashboard',
		url: '/',
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
		title: 'Payments',
		url: '/payments',
		icon: <span>💰</span>,
	},
];

const systemManagementSidebars: TSidebarMenuItem[] = [
	{
		title: 'Users',
		url: '/managements/users',
		icon: <span>👤</span>,
	},
	{
		title: 'Settings',
		url: '/managements/settings',
		icon: <span>⚙️</span>,
	},
];

const otherSidebars: TSidebarMenuItem[] = [
	{
		title: 'Todo',
		url: '/todo',
		icon: <span>📝</span>,
	},
];

export default function AppSidebar() {
	const { isAuthenticated, checkAuth } = useAuth();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		checkAuth();
	}, []);

	console.log('isAuthenticated', isAuthenticated);
	return (
		<Sidebar>
			{/* Header */}
			<SidebarHeader>
				<Link href='/' className='flex items-center gap-2'>
					<span className='text-2xl font-bold text-primary'>Siri Resort</span>
				</Link>
			</SidebarHeader>
			<div className='border-t border-slate-200 my-1' />

			{/* Sidebar Content */}
			{isAuthenticated ? (
				<AuthenticatedSidebar />
			) : (
				<SidebarContent>
					<div className='flex flex-col items-center my-4'>
						<span className='text-gray-500'>Please login to continue</span>
					</div>
				</SidebarContent>
			)}

			{/* Footer */}

			<SidebarFooter>
				<div className='flex items-center justify-between p-4'>
					<span className='text-sm text-gray-500'>
						Develop by{' '}
						<Link href='https://coregate.dev' className='text-blue-400'>
							coregatekit
						</Link>
					</span>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

const AuthenticatedSidebar = () => {
	return (
		<SidebarContent>
			{/* User Profile */}
			<SidebarGroup>
				<SidebarGroupContent>
					<SidebarUser />
				</SidebarGroupContent>
			</SidebarGroup>

			{/* Room management Menu */}
			<SidebarGroup>
				<SidebarGroupLabel>
					<span>Room Management</span>
				</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{roomManagementSidebars.map((item) => (
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

				{/* System Managements */}
				<SidebarGroupContent>
					<SidebarGroupLabel>
						<span>System Management</span>
					</SidebarGroupLabel>
					<SidebarMenu>
						{systemManagementSidebars.map((item) => (
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

				{/* Other */}
				<SidebarGroupContent>
					<SidebarGroupLabel>
						<span>Other</span>
					</SidebarGroupLabel>
					<SidebarMenu>
						{otherSidebars.map((item) => (
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
	);
};

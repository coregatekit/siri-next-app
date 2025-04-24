import React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useAuth from '@/app/contexts/auth.context';
import { MoreVerticalIcon } from 'lucide-react';

export default function SidebarUser() {
	const { user } = useAuth();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size={'lg'} className='w-full'>
							<Avatar>
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className='flex flex-col'>
								<span className='truncate font-medium'>{user?.name}</span>
								<span className='trunecate text-xs text-muted-foreground'>{user?.username}</span>
							</div>
							<MoreVerticalIcon className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

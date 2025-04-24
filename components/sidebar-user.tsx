import React from 'react';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from './ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useAuth from '@/app/contexts/auth.context';
import {
	BellIcon,
	CreditCardIcon,
	LogOutIcon,
	MoreVerticalIcon,
	SettingsIcon,
	UserCircleIcon,
	UserIcon,
} from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export default function SidebarUser() {
	const { user } = useAuth();
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size={'lg'} className='w-full cursor-pointer'>
							<Avatar>
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback>
									<UserIcon />
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col'>
								<span className='truncate font-medium'>{user?.name}</span>
								<span className='trunecate text-xs text-muted-foreground'>
									{user?.username}
								</span>
							</div>
							<MoreVerticalIcon className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						side={'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={user?.avatar} alt={user?.name} />
									<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{user?.name}</span>
									<span className='truncate text-xs text-muted-foreground'>
										{user?.username}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem className='flex flex-row gap-2 p-2 cursor-pointer'>
								<UserCircleIcon />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem className='flex flex-row gap-2 p-2 cursor-pointer'>
								<SettingsIcon />
								Settings
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='flex flex-row gap-2 p-2 cursor-pointer'>
							<LogOutIcon />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

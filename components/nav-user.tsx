'use client';

import type { UserData } from '@/app/types/auth';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '@/app/hooks/use-auth';
import UserIcon from './icons/user';
import SettingsIcon from './icons/settings';
import LogoutIcon from './icons/logout';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
	user: UserData;
};

function NavUser({ user }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const { logout } = useAuth();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogout = async () => {
		await logout();
	};

	return (
		<div className='relative' ref={dropdownRef}>
			<div
				className='flex items-center gap-2 cursor-pointer py-2 px-3 hover:bg-slate-200 rounded-md'
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setIsOpen(!isOpen);
					}
				}}
			>
				<Avatar>
					<AvatarImage src={user.avatar} />
					<AvatarFallback><UserIcon /></AvatarFallback>
				</Avatar>
				<div className='font-medium'>{user.username}</div>
				<div>
					<HamburgerMenuIcon />
				</div>
			</div>

			{isOpen && (
				<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200'>
					<Link
						href='/profile'
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
						onClick={() => setIsOpen(false)}
					>
						<div className='flex items-center gap-2'>
							<UserIcon height={16} width={16} />
							<span>Profile</span>
						</div>
					</Link>

					<Link
						href='/settings'
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
						onClick={() => setIsOpen(false)}
					>
						<div className='flex items-center gap-2'>
							<SettingsIcon height={16} width={16} />
							<span>Settings</span>
						</div>
					</Link>

					<div className='border-t border-gray-100 my-1' />

					<button
						type='button'
						className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
						onClick={handleLogout}
					>
						<div className='flex items-center gap-2'>
							<LogoutIcon height={16} width={16} />
							<span>Logout</span>
						</div>
					</button>
				</div>
			)}
		</div>
	);
}

export default NavUser;

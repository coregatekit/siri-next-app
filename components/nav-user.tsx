'use client';

import type { UserData } from '@/app/types/auth';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
	user: UserData;
};

function NavUser({ user }: Props) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	return (
		<div className='relative' ref={dropdownRef}>
			<div
				className='flex items-center gap-2 cursor-pointer py-2 px-3 hover:bg-gray-100 rounded-md'
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setIsOpen(!isOpen);
					}
				}}
			>
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
						Profile
					</Link>

					<Link
						href='/settings'
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
						onClick={() => setIsOpen(false)}
					>
						Settings
					</Link>

					<div className='border-t border-gray-100 my-1' />

					<button
						type='button'
						className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
						onClick={async () => router.push('/login')}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default NavUser;

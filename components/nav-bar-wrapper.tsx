'use client';

import type { UserData } from '@/app/types/auth';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import NavUser from './nav-user';
import Link from 'next/link';
import { Button } from './ui/button';
import Routes from '@/commons/routes';

const mockUser: UserData = {
	id: 'ksadjfoiqpogjlasdf',
	username: 'aerichandesu',
	name: 'Uginaga Aeri',
};

function NavBarWrapper() {
	const pathName = usePathname();
	const excludedPaths = [Routes.LOGIN.toString()];
	const [user, setUser] = useState<UserData>(mockUser);

	if (excludedPaths.includes(pathName)) {
		return null;
	}

	return (
		<>
			<nav className='fixed top-0 left-0 right-0 flex bg-primary-foreground h-16 shadow-md z-50'>
				<div className='flex items-center justify-between w-full px-4'>
					{/* Logo or Brand Name */}
					<a href='/' className='text-xl font-bold text-gray-800'>
						Siri Resort
					</a>

					<div>
						{user ? (
							<NavUser user={user} />
						) : (
							<Link href='/login'>
								<Button>Login</Button>
							</Link>
						)}
					</div>
				</div>
			</nav>

			{/* Add a spacer to prevent content from being hidden under the navbar */}
			<div className='h-16' />
		</>
	);
}

export default NavBarWrapper;

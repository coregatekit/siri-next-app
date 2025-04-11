'use client';

import type { UserData } from '@/app/types/auth';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import NavUser from './nav-user';

function NavBarWrapper() {
	const pathName = usePathname();
	const excludedPaths = ['/sign-in', '/login'];
	const [user, setUser] = useState<UserData>({
		id: 'ksadjfoiqpogjlasdf',
		username: 'aerichandesu',
		name: 'Uginaga Aeri',
	});

	if (excludedPaths.includes(pathName)) {
		return null;
	}

	return (
		<nav className='flex bg-primary-foreground h-12 shadow-md'>
			<div className='flex items-center justify-between w-full px-4'>
				{/* Logo or Brand Name */}
				<a href='/' className='text-xl font-bold text-gray-800'>
					Siri Resort
				</a>

				<NavUser user={user} />
			</div>
		</nav>
	);
}

export default NavBarWrapper;

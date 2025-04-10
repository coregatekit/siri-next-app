'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

function NavBarWrapper() {
	const pathName = usePathname();
	const excludedPaths = ['/sign-in', '/login'];

	if (excludedPaths.includes(pathName)) {
		return null;
	}

	return <div>NavBar</div>;
}

export default NavBarWrapper;

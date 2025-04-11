'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

function NavBarWrapper() {
  const pathName = usePathname();
  const excludedPaths = ['/sign-in', '/login'];

  if (excludedPaths.includes(pathName)) {
    return null;
  }

  return (
    <nav className='flex min-w-1/10 items-center justify-between px-6 h-16 bg-yellow-100 shadow-md'>
      <div>
        {/* Logo or Brand Name */}
        <a href='/' className='text-xl font-bold text-gray-800'>
          Brand
        </a>
      </div>
    </nav>
  );
}

export default NavBarWrapper;

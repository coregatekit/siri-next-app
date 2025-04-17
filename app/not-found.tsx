import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center gap-4 my-24'>
			<h1 className='text-4xl font-bold text-primary'>404 - Page Not Found</h1>
			<p className='text-lg text-gray-700'>
				The page you are looking for does not exist.
			</p>
			<p className='text-lg text-gray-700'>
				Please check the URL or return to the home page.
			</p>
			<Link href='/'>
				<Button variant='link' className='text-xl cursor-pointer'>
					Return to home page
				</Button>
			</Link>
		</div>
	);
}

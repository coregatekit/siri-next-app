import React from 'react';
import type { MenuItem } from '@/app/types/menu';
import { Card } from './ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
	menus: MenuItem[];
	className?: string;
};

export default function Menu({ menus, className }: Props) {
	return (
		<div className={cn('flex flex-wrap w-4/6 justify-start items-center', className)}>
			{menus.map((menu) => (
				<Card
					key={menu.name}
					className=' w-52 h-48 m-4 p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300'
				>
					<Link
						href={menu.href}
						className='flex flex-col gap-2 items-start justify-center h-full'
					>
						<span>{menu.icon}</span>
						<h2 className='text-lg font-semibold text-slate-700'>
							{menu.name}
						</h2>
						<p className='text-sm text-slate-500'>{menu.description}</p>
					</Link>
				</Card>
			))}
		</div>
	);
}

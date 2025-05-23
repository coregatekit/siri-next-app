import type { IconProps } from '@/app/types/icon';
import { cn } from '@/lib/utils';
import React from 'react';

export default function TodoListIcon({ height, width, className }: IconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width || '24'}
			height={height || '24'}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={cn('lucide lucide-list-todo-icon lucide-list-todo', className)}
		>
			<rect x='3' y='5' width='6' height='6' rx='1' />
			<path d='m3 17 2 2 4-4' />
			<path d='M13 6h8' />
			<path d='M13 12h8' />
			<path d='M13 18h8' />
		</svg>
	);
}

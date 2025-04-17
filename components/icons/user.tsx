import type { IconProps } from '@/app/types/icon';
import { cn } from '@/lib/utils';
import React from 'react';

export default function UserIcon({ height, width, className }: IconProps) {
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
			className={cn('lucide lucide-user-icon lucide-user', className)}
		>
			<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
			<circle cx='12' cy='7' r='4' />
		</svg>
	);
}

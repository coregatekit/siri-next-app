import type { IconProps } from '@/app/types/icon';
import { cn } from '@/lib/utils';
import React from 'react';

export default function BedDoubleIcon({ height, width, className }: IconProps) {
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
			className={cn(
				'lucide lucide-bed-double-icon lucide-bed-double',
				className,
			)}
		>
			<path d='M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8' />
			<path d='M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4' />
			<path d='M12 4v6' />
			<path d='M2 18h20' />
		</svg>
	);
}

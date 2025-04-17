import type { ReactNode } from 'react';

type MenuItem = {
	name: string;
	description?: string;
	href: string;
	icon?: React.ReactNode;
};

type SidebarMenuItem = {
	title: string;
	url: string;
	icon: ReactNode;
};

export type { MenuItem, SidebarMenuItem };

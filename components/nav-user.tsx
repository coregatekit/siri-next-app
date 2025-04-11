import type { UserData } from '@/app/types/auth';
import Image from 'next/image';
import React from 'react';

type Props = {
	user: UserData;
};

function NavUser({ user }: Props) {
	return (
		<div className='flex items-center gap-2'>
			<div>{user.username}</div>
		</div>
	);
}

export default NavUser;

import React from 'react';

type Props = {
	user: string;
};

function Header({ user }: Props) {
	return (
		<div>
			<div className='flex flex-col'>
				<h1 className='text-xl font-bold'>Hello {user}</h1>
				<p className='text-gray-600'>Welcome to the admin panel.</p>
			</div>
		</div>
	);
}

export default Header;

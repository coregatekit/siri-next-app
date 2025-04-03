import React, { useEffect, useState } from 'react';
import Header from './components/header';
import MenuTabs from './components/menu-tabs';

function AdminContainer() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setUser] = useState<string>('');

	useEffect(() => {
		const authenticate = async () => {
			setIsLoading(true);
			const username = window.prompt('Enter your username:');
			if (!username) return false;
			const password = window.prompt('Enter your password:');
			if (!password) return false;

			const body = {
				username,
				password,
			};

			const response = await fetch('/api/admin/login', {
				method: 'POST',
				body: JSON.stringify(body),
			});
			if (response.status === 200) {
				setUser(username);
				alert('Login successful');
				return true;
			}
			alert('Invalid credentials');
			return false;
		};

		authenticate().then(result => {
			setIsAuthenticated(result);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <div>Authenticating...</div>;
	}

	return (
		<div className='flex flex-col items-center justify-start min-h-screen bg-gray-100'>
			<div className='mt-24 p-8 w-3/4 h-3/4 '>
				<Header user={user} />
				<MenuTabs />
			</div>
		</div>
	);
}

export default AdminContainer;

'use client';

import type { SignInFormData } from '@/app/types/sign-in';
import SignInBox from '@/components/sign-in';
import React from 'react';

function AdminLoginContainer() {
	const handleAdminSignIn = (data: SignInFormData) => {
		// Handle admin login logic here
		console.log('Admin login data:', data);
	};

	return <SignInBox handleSignIn={handleAdminSignIn} />;
}

export default AdminLoginContainer;

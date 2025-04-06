'use client';

import React from 'react';
import SignInBox from '@/components/sign-in';
import type { SignInFormData } from '../types/sign-in';


function SignInContainer() {
	const handleSignIn = (data: SignInFormData) => {
		// Handle login logic here
	};

	return (
		<div>
			<SignInBox handleSignIn={handleSignIn} />
		</div>
	);
}

export default SignInContainer;

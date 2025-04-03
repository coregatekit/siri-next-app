import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function LoginContainer() {
	return (
		<form>
			<h1>Login</h1>
			<div>
				<Label>Username</Label>
				<Input />
			</div>
			<div>
				<Label>Password</Label>
				<Input />
			</div>
			<Button type="submit">Login</Button>
		</form>
	);
}

export default LoginContainer;

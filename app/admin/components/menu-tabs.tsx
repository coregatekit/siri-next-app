import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import React from 'react';
import CreateUserForm from './create-user-form';
import UserList from './user-list';

function MenuTabs() {
	return (
		<div className='my-4 flex flex-col items-start w-full h-full'>
			<Tabs className='w-full' defaultValue='new-user'>
				<TabsList>
					<TabsTrigger value='new-user'>Create a new user</TabsTrigger>
					<TabsTrigger value='user-list'>Users</TabsTrigger>
				</TabsList>
				<TabsContent value='new-user'>
					<CreateUserForm />
				</TabsContent>

				<TabsContent value='user-list'>
					<UserList />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default MenuTabs;

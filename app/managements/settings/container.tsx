import React from 'react';
import SystemManagementAccordion from '../components/system-management-accordion';

export default function SettingsContainer() {
	return (
		<div className='flex flex-col mt-10 mx-12 w-full'>
			<div className='text-2xl font-bold mb-12'>System Settings</div>
			<SystemManagementAccordion />
		</div>
	);
}

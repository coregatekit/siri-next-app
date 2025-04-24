import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';
import ManageRoomTypes from './manage-room-types';

export default function SystemManagementAccordion() {
	return (
		<Accordion type='single' collapsible className='rounded-md w-full bg-accent p-6'>
			<AccordionItem value='item-1'>
				<AccordionTrigger className='text-primary text-lg'>Room Types</AccordionTrigger>
				<AccordionContent>
          <ManageRoomTypes />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

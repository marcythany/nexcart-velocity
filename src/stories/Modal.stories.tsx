import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Button from '../components/atoms/Button';
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from '../components/ui/Modal';

const meta = {
	title: 'UI/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible modal component with accessibility features and keyboard navigation.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl', 'full'],
		},
		closeOnOverlayClick: {
			control: 'boolean',
		},
		closeOnEscape: {
			control: 'boolean',
		},
	},
	args: {
		isOpen: true,
		onClose: fn(),
		size: 'md',
		closeOnOverlayClick: true,
		closeOnEscape: true,
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<ModalHeader>
					<h2>Modal Title</h2>
				</ModalHeader>
				<ModalBody>
					<p>This is the modal content. You can put any content here.</p>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' onClick={fn()}>
						Cancel
					</Button>
					<Button onClick={fn()}>Confirm</Button>
				</ModalFooter>
			</>
		),
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		children: (
			<>
				<ModalHeader>
					<h2>Small Modal</h2>
				</ModalHeader>
				<ModalBody>
					<p>This is a small modal with compact content.</p>
				</ModalBody>
				<ModalFooter>
					<Button size='sm' onClick={fn()}>
						OK
					</Button>
				</ModalFooter>
			</>
		),
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		children: (
			<>
				<ModalHeader>
					<h2>Large Modal</h2>
				</ModalHeader>
				<ModalBody>
					<div className='space-y-4'>
						<p>This is a large modal that can contain more content.</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<p>
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' onClick={fn()}>
						Cancel
					</Button>
					<Button onClick={fn()}>Save Changes</Button>
				</ModalFooter>
			</>
		),
	},
};

export const FullWidth: Story = {
	args: {
		size: 'full',
		children: (
			<>
				<ModalHeader>
					<h2>Full Width Modal</h2>
				</ModalHeader>
				<ModalBody>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<h3 className='text-lg font-semibold mb-2'>Column 1</h3>
							<p>This modal takes up the full width of the screen.</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold mb-2'>Column 2</h3>
							<p>Perfect for forms or detailed content.</p>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' onClick={fn()}>
						Close
					</Button>
					<Button onClick={fn()}>Submit</Button>
				</ModalFooter>
			</>
		),
	},
};

export const Confirmation: Story = {
	args: {
		children: (
			<>
				<ModalHeader>
					<h2>Confirm Action</h2>
				</ModalHeader>
				<ModalBody>
					<p>
						Are you sure you want to delete this item? This action cannot be
						undone.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' onClick={fn()}>
						Cancel
					</Button>
					<Button variant='primary' onClick={fn()}>
						Delete
					</Button>
				</ModalFooter>
			</>
		),
	},
};

export const FormModal: Story = {
	args: {
		size: 'lg',
		children: (
			<>
				<ModalHeader>
					<h2>Add New Product</h2>
				</ModalHeader>
				<ModalBody>
					<form className='space-y-4'>
						<div>
							<label className='block text-sm font-medium mb-1'>
								Product Name
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 border border-border rounded-md'
								placeholder='Enter product name'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Price</label>
							<input
								type='number'
								className='w-full px-3 py-2 border border-border rounded-md'
								placeholder='0.00'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>
								Description
							</label>
							<textarea
								className='w-full px-3 py-2 border border-border rounded-md'
								rows={3}
								placeholder='Enter product description'
							/>
						</div>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' onClick={fn()}>
						Cancel
					</Button>
					<Button onClick={fn()}>Create Product</Button>
				</ModalFooter>
			</>
		),
	},
};

export const NoCloseOnOverlay: Story = {
	args: {
		closeOnOverlayClick: false,
		children: (
			<>
				<ModalHeader>
					<h2>Important Notice</h2>
				</ModalHeader>
				<ModalBody>
					<p>
						This modal cannot be closed by clicking the overlay. You must use
						the close button or press Escape.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button onClick={fn()}>I Understand</Button>
				</ModalFooter>
			</>
		),
	},
};

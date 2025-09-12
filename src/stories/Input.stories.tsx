import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Mail, Search, User } from 'lucide-react';
import { fn } from 'storybook/test';
import Input from '../components/ui/Input';

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible input component with validation, icons, and accessibility features.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'error', 'success'],
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'search', 'tel', 'url'],
		},
		disabled: {
			control: 'boolean',
		},
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter your text...',
		label: 'Default Input',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Email Address',
		type: 'email',
		placeholder: 'Enter your email',
	},
};

export const WithHelperText: Story = {
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Enter your password',
		helperText: 'Must be at least 8 characters long',
	},
};

export const Error: Story = {
	args: {
		label: 'Email Address',
		type: 'email',
		placeholder: 'Enter your email',
		error: 'Please enter a valid email address',
	},
};

export const Success: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
		variant: 'success',
	},
};

export const WithStartIcon: Story = {
	args: {
		label: 'Search',
		type: 'search',
		placeholder: 'Search products...',
		startIcon: <Search size={16} />,
	},
};

export const WithEndIcon: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
		endIcon: <User size={16} />,
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		placeholder: 'Small input',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		placeholder: 'Large input',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		placeholder: 'This input is disabled',
		disabled: true,
		value: 'Disabled value',
	},
};

export const EmailWithIcon: Story = {
	args: {
		label: 'Email Address',
		type: 'email',
		placeholder: 'Enter your email',
		startIcon: <Mail size={16} />,
	},
};

export const Password: Story = {
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Enter your password',
		helperText:
			'Password must contain at least 8 characters, one uppercase letter, and one number',
	},
};

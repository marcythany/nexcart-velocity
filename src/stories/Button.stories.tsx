import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { fn } from 'storybook/test';
import Button from '../components/atoms/Button';

const meta = {
	title: 'Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A versatile button component with multiple variants, sizes, and states.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'outline', 'ghost', 'text', 'tactile'],
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
		},
		isLoading: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
		iconPosition: {
			control: { type: 'select' },
			options: ['left', 'right'],
		},
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Primary Button',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary Button',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Outline Button',
	},
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		children: 'Ghost Button',
	},
};

export const Text: Story = {
	args: {
		variant: 'text',
		children: 'Text Button',
	},
};

export const Tactile: Story = {
	args: {
		variant: 'tactile',
		children: 'Tactile Button',
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		children: 'Small Button',
	},
};

export const Medium: Story = {
	args: {
		size: 'md',
		children: 'Medium Button',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		children: 'Large Button',
	},
};

export const WithIcon: Story = {
	args: {
		icon: Heart,
		children: 'With Icon',
	},
};

export const IconOnly: Story = {
	args: {
		icon: ShoppingCart,
		'aria-label': 'Shopping Cart',
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		children: 'Loading...',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: 'Disabled Button',
	},
};

export const IconRight: Story = {
	args: {
		icon: User,
		iconPosition: 'right',
		children: 'Icon Right',
	},
};

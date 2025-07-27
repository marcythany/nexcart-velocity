import type { Meta, StoryObj } from '@storybook/nextjs';
import { Plus, ShoppingCart } from 'lucide-react';
import Button from '../../components/atoms/Button';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'outline', 'ghost', 'text', 'tactile'],
		},
		size: {
			control: { type: 'radio' },
			options: ['sm', 'md', 'lg'],
		},
	},
	parameters: {
		a11y: {
			config: {
				rules: [
					{
						id: 'color-contrast',
						reviewOnFail: true,
						selector: '*:not([disabled])',
					},
				],
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Add to Cart',
	},
};

export const Tactile: Story = {
	args: {
		variant: 'tactile',
		children: 'Add to Wishlist',
		icon: Plus,
	},
};

export const WithIcon: Story = {
	args: {
		variant: 'primary',
		children: 'Checkout',
		icon: ShoppingCart,
		iconPosition: 'right',
	},
};

export const LoadingState: Story = {
	args: {
		variant: 'secondary',
		children: 'Processing Payment',
		isLoading: true,
	},
};

export const Disabled: Story = {
	args: {
		variant: 'primary',
		children: 'Out of Stock',
		disabled: true,
	},
};

export const OrganicShape: Story = {
	args: {
		variant: 'tactile',
		children: 'Organic Button',
		className: 'rounded-organic',
	},
};

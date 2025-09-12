import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Header from '../components/organisms/Header';

const meta = {
	title: 'Organisms/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A comprehensive header component with navigation, search, cart, and user actions.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		cartItemCount: {
			control: { type: 'number', min: 0 },
		},
		wishlistItemCount: {
			control: { type: 'number', min: 0 },
		},
		isLoggedIn: {
			control: 'boolean',
		},
		userName: {
			control: 'text',
		},
	},
	args: {
		cartItemCount: 0,
		wishlistItemCount: 0,
		onCartClick: fn(),
		onWishlistClick: fn(),
		onSearch: fn(),
		onUserMenuClick: fn(),
		isLoggedIn: false,
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		cartItemCount: 0,
		wishlistItemCount: 0,
	},
};

export const WithItems: Story = {
	args: {
		cartItemCount: 3,
		wishlistItemCount: 5,
	},
};

export const LoggedIn: Story = {
	args: {
		cartItemCount: 2,
		wishlistItemCount: 1,
		isLoggedIn: true,
		userName: 'John Doe',
	},
};

export const ManyItems: Story = {
	args: {
		cartItemCount: 99,
		wishlistItemCount: 25,
		isLoggedIn: true,
		userName: 'Jane Smith',
	},
};

export const EmptyState: Story = {
	args: {
		cartItemCount: 0,
		wishlistItemCount: 0,
		isLoggedIn: false,
	},
};

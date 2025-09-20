import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SessionProvider } from 'next-auth/react';
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
	},
	args: {
		cartItemCount: 0,
		wishlistItemCount: 0,
		onCartClick: fn(),
		onWishlistClick: fn(),
		onSearch: fn(),
	},
	decorators: [
		(Story) => (
			<SessionProvider session={null}>
				<Story />
			</SessionProvider>
		),
	],
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
	},
	decorators: [
		(Story) => (
			<SessionProvider session={{ user: { name: 'John Doe' }, expires: '1' }}>
				<Story />
			</SessionProvider>
		),
	],
};

export const ManyItems: Story = {
	args: {
		cartItemCount: 99,
		wishlistItemCount: 25,
	},
	decorators: [
		(Story) => (
			<SessionProvider session={{ user: { name: 'Jane Smith' }, expires: '1' }}>
				<Story />
			</SessionProvider>
		),
	],
};

export const EmptyState: Story = {
	args: {
		cartItemCount: 0,
		wishlistItemCount: 0,
	},
};

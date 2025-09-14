import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ShoppingCart, {
	type CartItem,
} from '../components/molecules/ShoppingCart';

const sampleItems: CartItem[] = [
	{
		id: '1',
		productId: 'prod-1',
		name: 'Premium Wireless Headphones',
		price: 299.99,
		quantity: 1,
		image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
		variant: 'Black',
	},
	{
		id: '2',
		productId: 'prod-2',
		name: 'Organic Cotton T-Shirt',
		price: 49.99,
		quantity: 2,
		image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
		variant: 'Medium',
	},
	{
		id: '3',
		productId: 'prod-3',
		name: 'Ceramic Coffee Mug',
		price: 24.99,
		quantity: 1,
		image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
	},
];

const meta = {
	title: 'Molecules/ShoppingCart',
	component: ShoppingCart,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A comprehensive shopping cart component with item management and order summary.',
			},
		},
	},
	tags: ['autodocs'],
	args: {
		items: sampleItems,
		onUpdateQuantity: fn(),
		onRemoveItem: fn(),
		onClearCart: fn(),
	},
} satisfies Meta<typeof ShoppingCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
	args: {
		items: sampleItems,
	},
};

export const SingleItem: Story = {
	args: {
		items: [sampleItems[0]],
	},
};

export const ManyItems: Story = {
	args: {
		items: [
			...sampleItems,
			{
				id: '4',
				productId: 'prod-4',
				name: 'Smart Fitness Watch',
				price: 199.99,
				quantity: 1,
				image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png',
			},
			{
				id: '5',
				productId: 'prod-5',
				name: 'Bluetooth Speaker',
				price: 79.99,
				quantity: 3,
				image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png',
				variant: 'Blue',
			},
		],
	},
};

export const HighValueOrder: Story = {
	args: {
		items: [
			{
				id: '1',
				productId: 'prod-1',
				name: 'Premium Laptop',
				price: 1299.99,
				quantity: 1,
				image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
			},
			{
				id: '2',
				productId: 'prod-2',
				name: 'Wireless Mouse',
				price: 49.99,
				quantity: 2,
				image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
			},
		],
	},
};

export const FreeShipping: Story = {
	args: {
		items: [
			{
				id: '1',
				productId: 'prod-1',
				name: 'Book Collection',
				price: 25.99,
				quantity: 3,
				image:
					'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
			},
		],
	},
};

export const Empty: Story = {
	args: {
		items: [],
	},
};

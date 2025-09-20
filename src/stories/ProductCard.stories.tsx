import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ProductCard, { type Product } from '../components/molecules/ProductCard';

const sampleProduct: Product = {
	id: '1',
	name: 'Premium Wireless Headphones',
	price: 299.99,
	originalPrice: 399.99,
	rating: 4.8,
	reviewCount: 1247,
	image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
	images: [
		'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
		'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
	],
	description:
		'High-quality wireless headphones with noise cancellation and premium sound quality.',
	category: 'Electronics',
	inStock: true,
	isNew: true,
	isOnSale: true,
	variants: [
		{ id: '1', name: 'Color', value: 'Black', available: true },
		{ id: '2', name: 'Size', value: 'Standard', available: true },
	],
};

const meta = {
	title: 'Molecules/ProductCard',
	component: ProductCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A comprehensive product card component with ratings, pricing, and interactive features.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		isInWishlist: {
			control: 'boolean',
		},
	},
	args: {
		product: sampleProduct,
		onAddToCart: fn(),
		onToggleWishlist: fn(),
		onQuickView: fn(),
		isInWishlist: false,
	},
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		product: sampleProduct,
		priority: true,
	},
};

export const NewProduct: Story = {
	args: {
		product: {
			...sampleProduct,
			isNew: true,
			isOnSale: false,
		},
	},
};

export const OnSale: Story = {
	args: {
		product: {
			...sampleProduct,
			isNew: false,
			isOnSale: true,
		},
		priority: true,
	},
};

export const InWishlist: Story = {
	args: {
		product: sampleProduct,
		isInWishlist: true,
	},
};

export const OutOfStock: Story = {
	args: {
		product: {
			...sampleProduct,
			inStock: false,
			isNew: false,
			isOnSale: false,
		},
	},
};

export const HighRating: Story = {
	args: {
		product: {
			...sampleProduct,
			rating: 5.0,
			reviewCount: 2500,
		},
	},
};

export const LowRating: Story = {
	args: {
		product: {
			...sampleProduct,
			rating: 3.2,
			reviewCount: 45,
		},
	},
};

export const NoDiscount: Story = {
	args: {
		product: {
			...sampleProduct,
			originalPrice: undefined,
			isOnSale: false,
		},
	},
};

export const LongTitle: Story = {
	args: {
		product: {
			...sampleProduct,
			name: 'Premium Wireless Noise-Cancelling Over-Ear Headphones with Advanced Audio Technology',
		},
	},
};

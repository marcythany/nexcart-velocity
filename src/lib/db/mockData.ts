// Mock Database - In-memory data store for development
// In production, replace with a real database (PostgreSQL, MongoDB, etc.)

export interface MockProduct {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviewCount: number;
	image: string;
	images: string[];
	description: string;
	category: string;
	inStock: boolean;
	isNew: boolean;
	isOnSale: boolean;
	variants: MockProductVariant[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface MockProductVariant {
	id: string;
	name: string;
	value: string;
	available: boolean;
	price?: number;
}

export interface MockCart {
	id: string;
	userId?: string;
	items: MockCartItem[];
	total: number;
	subtotal: number;
	tax: number;
	shipping: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface MockCartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	variant?: string;
}

export interface MockUser {
	id: string;
	email: string;
	password: string; // In production, store hashed passwords
	name: string;
	avatar?: string;
	role: 'CUSTOMER' | 'ADMIN';
	createdAt: Date;
	updatedAt: Date;
}

export interface MockOrder {
	id: string;
	userId: string;
	items: MockOrderItem[];
	total: number;
	subtotal: number;
	tax: number;
	shipping: number;
	status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
	shippingAddress: MockAddress;
	billingAddress: MockAddress;
	createdAt: Date;
	updatedAt: Date;
}

export interface MockOrderItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	variant?: string;
}

export interface MockAddress {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface MockReview {
	id: string;
	productId: string;
	userId: string;
	userName: string;
	rating: number;
	title: string;
	comment: string;
	createdAt: Date;
	updatedAt: Date;
	helpful: number;
}

export interface MockCategory {
	id: string;
	name: string;
	slug: string;
	description?: string;
	image?: string;
	parentId?: string;
	children: MockCategory[];
	createdAt: Date;
	updatedAt: Date;
}

export interface MockWishlistItem {
	id: string;
	productId: string;
	userId: string;
	addedAt: Date;
}

// Mock Data
export const mockProducts: MockProduct[] = [
	{
		id: '1',
		name: 'Premium Wireless Headphones',
		price: 299.99,
		originalPrice: 399.99,
		rating: 4.8,
		reviewCount: 1247,
		image: '/api/placeholder/400/400',
		images: [
			'/api/placeholder/400/400',
			'/api/placeholder/400/400',
			'/api/placeholder/400/400',
		],
		description:
			'High-quality wireless headphones with active noise cancellation, premium sound quality, and 30-hour battery life.',
		category: 'Electronics',
		inStock: true,
		isNew: true,
		isOnSale: true,
		variants: [
			{ id: '1-black', name: 'Color', value: 'Black', available: true },
			{ id: '1-white', name: 'Color', value: 'White', available: true },
			{ id: '1-blue', name: 'Color', value: 'Blue', available: false },
		],
		tags: ['wireless', 'noise-cancelling', 'premium'],
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
	{
		id: '2',
		name: 'Organic Cotton T-Shirt',
		price: 49.99,
		rating: 4.6,
		reviewCount: 892,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Sustainable organic cotton t-shirt made from 100% organic cotton. Comfortable, breathable, and eco-friendly.',
		category: 'Clothing',
		inStock: true,
		isNew: false,
		isOnSale: false,
		variants: [
			{ id: '2-s', name: 'Size', value: 'S', available: true },
			{ id: '2-m', name: 'Size', value: 'M', available: true },
			{ id: '2-l', name: 'Size', value: 'L', available: true },
			{ id: '2-xl', name: 'Size', value: 'XL', available: false },
		],
		tags: ['organic', 'cotton', 'sustainable'],
		createdAt: new Date('2024-01-10'),
		updatedAt: new Date('2024-01-10'),
	},
	{
		id: '3',
		name: 'Smart Fitness Watch',
		price: 199.99,
		originalPrice: 249.99,
		rating: 4.7,
		reviewCount: 2156,
		image: '/api/placeholder/400/400',
		images: [
			'/api/placeholder/400/400',
			'/api/placeholder/400/400',
			'/api/placeholder/400/400',
		],
		description:
			'Advanced fitness tracking watch with heart rate monitor, GPS, and 7-day battery life.',
		category: 'Electronics',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '3-black', name: 'Color', value: 'Black', available: true },
			{ id: '3-silver', name: 'Color', value: 'Silver', available: true },
			{ id: '3-gold', name: 'Color', value: 'Gold', available: false },
		],
		tags: ['fitness', 'smartwatch', 'gps'],
		createdAt: new Date('2024-01-05'),
		updatedAt: new Date('2024-01-05'),
	},
	{
		id: '4',
		name: 'Ceramic Coffee Mug',
		price: 24.99,
		rating: 4.9,
		reviewCount: 543,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400'],
		description:
			'Handcrafted ceramic coffee mug with unique design. Perfect for your morning coffee ritual.',
		category: 'Home & Kitchen',
		inStock: true,
		isNew: false,
		isOnSale: false,
		variants: [],
		tags: ['ceramic', 'coffee', 'handcrafted'],
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
];

export const mockCategories: MockCategory[] = [
	{
		id: '1',
		name: 'Electronics',
		slug: 'electronics',
		description: 'Electronic devices and gadgets',
		image: '/api/placeholder/300/200',
		children: [],
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
	{
		id: '2',
		name: 'Clothing',
		slug: 'clothing',
		description: 'Fashion and apparel',
		image: '/api/placeholder/300/200',
		children: [],
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
	{
		id: '3',
		name: 'Home & Kitchen',
		slug: 'home-kitchen',
		description: 'Home and kitchen essentials',
		image: '/api/placeholder/300/200',
		children: [],
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
	{
		id: '4',
		name: 'Sports & Outdoors',
		slug: 'sports-outdoors',
		description: 'Sports and outdoor equipment',
		image: '/api/placeholder/300/200',
		children: [],
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
];

export const mockUsers: MockUser[] = [
	{
		id: '1',
		email: 'admin@nexcart.com',
		password: 'admin123', // In production, use hashed passwords
		name: 'Admin User',
		role: 'ADMIN',
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
	{
		id: '2',
		email: 'user@nexcart.com',
		password: 'user123',
		name: 'Test User',
		role: 'CUSTOMER',
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
	},
];

// In-memory storage (replace with database in production)
export const storage = {
	products: [...mockProducts],
	categories: [...mockCategories],
	users: [...mockUsers],
	carts: [] as MockCart[],
	orders: [] as MockOrder[],
	reviews: [] as MockReview[],
	wishlists: [] as MockWishlistItem[],
};

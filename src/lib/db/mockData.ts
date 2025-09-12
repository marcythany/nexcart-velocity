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

// Mock Data - Enhanced with more realistic products
export const mockProducts: MockProduct[] = [
	// Electronics Category
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
		id: '5',
		name: '4K Ultra HD Smart TV',
		price: 899.99,
		originalPrice: 1199.99,
		rating: 4.6,
		reviewCount: 892,
		image: '/api/placeholder/400/400',
		images: [
			'/api/placeholder/400/400',
			'/api/placeholder/400/400',
			'/api/placeholder/400/400',
		],
		description:
			'55-inch 4K Ultra HD Smart TV with HDR, built-in streaming apps, and voice control.',
		category: 'Electronics',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '5-55', name: 'Size', value: '55"', available: true },
			{ id: '5-65', name: 'Size', value: '65"', available: true },
		],
		tags: ['4k', 'smart-tv', 'hdr'],
		createdAt: new Date('2024-01-20'),
		updatedAt: new Date('2024-01-20'),
	},
	{
		id: '6',
		name: 'Wireless Gaming Mouse',
		price: 79.99,
		rating: 4.5,
		reviewCount: 654,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
		category: 'Electronics',
		inStock: true,
		isNew: true,
		isOnSale: false,
		variants: [
			{ id: '6-black', name: 'Color', value: 'Black', available: true },
			{ id: '6-white', name: 'Color', value: 'White', available: true },
			{ id: '6-red', name: 'Color', value: 'Red', available: true },
		],
		tags: ['gaming', 'wireless', 'rgb'],
		createdAt: new Date('2024-01-25'),
		updatedAt: new Date('2024-01-25'),
	},
	{
		id: '7',
		name: 'Bluetooth Portable Speaker',
		price: 149.99,
		originalPrice: 199.99,
		rating: 4.4,
		reviewCount: 432,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.',
		category: 'Electronics',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '7-blue', name: 'Color', value: 'Blue', available: true },
			{ id: '7-black', name: 'Color', value: 'Black', available: true },
			{ id: '7-gray', name: 'Color', value: 'Gray', available: false },
		],
		tags: ['bluetooth', 'portable', 'waterproof'],
		createdAt: new Date('2024-01-18'),
		updatedAt: new Date('2024-01-18'),
	},

	// Clothing Category
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
		id: '8',
		name: 'Premium Denim Jeans',
		price: 129.99,
		originalPrice: 159.99,
		rating: 4.7,
		reviewCount: 756,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'High-quality denim jeans with perfect fit and durability. Made from sustainable materials.',
		category: 'Clothing',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '8-30', name: 'Size', value: '30W x 32L', available: true },
			{ id: '8-32', name: 'Size', value: '32W x 32L', available: true },
			{ id: '8-34', name: 'Size', value: '34W x 32L', available: true },
			{ id: '8-36', name: 'Size', value: '36W x 32L', available: false },
		],
		tags: ['denim', 'premium', 'sustainable'],
		createdAt: new Date('2024-01-12'),
		updatedAt: new Date('2024-01-12'),
	},
	{
		id: '9',
		name: 'Merino Wool Sweater',
		price: 189.99,
		rating: 4.8,
		reviewCount: 423,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Luxurious merino wool sweater with natural temperature regulation and moisture-wicking properties.',
		category: 'Clothing',
		inStock: true,
		isNew: true,
		isOnSale: false,
		variants: [
			{ id: '9-navy', name: 'Color', value: 'Navy', available: true },
			{ id: '9-gray', name: 'Color', value: 'Gray', available: true },
			{ id: '9-black', name: 'Color', value: 'Black', available: true },
		],
		tags: ['merino', 'wool', 'luxury'],
		createdAt: new Date('2024-01-22'),
		updatedAt: new Date('2024-01-22'),
	},
	{
		id: '10',
		name: 'Athletic Running Shoes',
		price: 149.99,
		originalPrice: 179.99,
		rating: 4.5,
		reviewCount: 987,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Professional running shoes with advanced cushioning and support for optimal performance.',
		category: 'Clothing',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '10-8', name: 'Size', value: '8', available: true },
			{ id: '10-9', name: 'Size', value: '9', available: true },
			{ id: '10-10', name: 'Size', value: '10', available: true },
			{ id: '10-11', name: 'Size', value: '11', available: false },
		],
		tags: ['running', 'athletic', 'performance'],
		createdAt: new Date('2024-01-08'),
		updatedAt: new Date('2024-01-08'),
	},

	// Home & Kitchen Category
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
	{
		id: '11',
		name: 'Stainless Steel Cookware Set',
		price: 299.99,
		originalPrice: 399.99,
		rating: 4.7,
		reviewCount: 678,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Professional-grade stainless steel cookware set with non-stick coating and even heat distribution.',
		category: 'Home & Kitchen',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '11-10pc', name: 'Set Size', value: '10 Piece', available: true },
			{ id: '11-15pc', name: 'Set Size', value: '15 Piece', available: true },
		],
		tags: ['cookware', 'stainless-steel', 'professional'],
		createdAt: new Date('2024-01-14'),
		updatedAt: new Date('2024-01-14'),
	},
	{
		id: '12',
		name: 'Smart Coffee Maker',
		price: 199.99,
		rating: 4.6,
		reviewCount: 345,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'WiFi-enabled coffee maker with app control, programmable brewing, and thermal carafe.',
		category: 'Home & Kitchen',
		inStock: true,
		isNew: true,
		isOnSale: false,
		variants: [
			{ id: '12-black', name: 'Color', value: 'Black', available: true },
			{ id: '12-silver', name: 'Color', value: 'Silver', available: true },
		],
		tags: ['smart', 'coffee-maker', 'wifi'],
		createdAt: new Date('2024-01-28'),
		updatedAt: new Date('2024-01-28'),
	},
	{
		id: '13',
		name: 'Bamboo Cutting Board Set',
		price: 79.99,
		rating: 4.8,
		reviewCount: 234,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400'],
		description:
			'Eco-friendly bamboo cutting board set with antimicrobial properties and juice groove.',
		category: 'Home & Kitchen',
		inStock: true,
		isNew: false,
		isOnSale: false,
		variants: [
			{ id: '13-3pc', name: 'Set Size', value: '3 Piece', available: true },
			{ id: '13-5pc', name: 'Set Size', value: '5 Piece', available: true },
		],
		tags: ['bamboo', 'cutting-board', 'eco-friendly'],
		createdAt: new Date('2024-01-16'),
		updatedAt: new Date('2024-01-16'),
	},

	// Sports & Outdoors Category
	{
		id: '14',
		name: 'Professional Yoga Mat',
		price: 89.99,
		rating: 4.7,
		reviewCount: 567,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'High-density yoga mat with excellent grip and cushioning for comfortable practice.',
		category: 'Sports & Outdoors',
		inStock: true,
		isNew: false,
		isOnSale: false,
		variants: [
			{ id: '14-purple', name: 'Color', value: 'Purple', available: true },
			{ id: '14-blue', name: 'Color', value: 'Blue', available: true },
			{ id: '14-green', name: 'Color', value: 'Green', available: true },
		],
		tags: ['yoga', 'fitness', 'mat'],
		createdAt: new Date('2024-01-03'),
		updatedAt: new Date('2024-01-03'),
	},
	{
		id: '15',
		name: 'Camping Backpack 65L',
		price: 159.99,
		originalPrice: 199.99,
		rating: 4.5,
		reviewCount: 432,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Durable hiking backpack with multiple compartments, rain cover, and ergonomic design.',
		category: 'Sports & Outdoors',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{ id: '15-black', name: 'Color', value: 'Black', available: true },
			{ id: '15-green', name: 'Color', value: 'Green', available: true },
		],
		tags: ['camping', 'backpack', 'hiking'],
		createdAt: new Date('2024-01-07'),
		updatedAt: new Date('2024-01-07'),
	},
	{
		id: '16',
		name: 'Adjustable Dumbbells Set',
		price: 249.99,
		rating: 4.6,
		reviewCount: 789,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
		description:
			'Space-saving adjustable dumbbells from 5-50 lbs with quick-change mechanism.',
		category: 'Sports & Outdoors',
		inStock: true,
		isNew: true,
		isOnSale: false,
		variants: [
			{ id: '16-25lb', name: 'Max Weight', value: '25 lbs', available: true },
			{ id: '16-50lb', name: 'Max Weight', value: '50 lbs', available: true },
		],
		tags: ['dumbbells', 'adjustable', 'fitness'],
		createdAt: new Date('2024-01-30'),
		updatedAt: new Date('2024-01-30'),
	},
	{
		id: '17',
		name: 'Tennis Racket Pro Series',
		price: 199.99,
		originalPrice: 249.99,
		rating: 4.4,
		reviewCount: 321,
		image: '/api/placeholder/400/400',
		images: ['/api/placeholder/400/400'],
		description:
			'Professional tennis racket with graphite construction and oversized sweet spot.',
		category: 'Sports & Outdoors',
		inStock: true,
		isNew: false,
		isOnSale: true,
		variants: [
			{
				id: '17-oversize',
				name: 'Head Size',
				value: 'Oversize',
				available: true,
			},
			{
				id: '17-midsize',
				name: 'Head Size',
				value: 'Midsize',
				available: true,
			},
		],
		tags: ['tennis', 'racket', 'professional'],
		createdAt: new Date('2024-01-11'),
		updatedAt: new Date('2024-01-11'),
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

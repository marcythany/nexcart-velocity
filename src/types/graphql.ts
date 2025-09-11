// GraphQL Schema Types

export interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviewCount: number;
	image: string;
	images?: string[];
	description: string;
	category: string;
	inStock: boolean;
	isNew?: boolean;
	isOnSale?: boolean;
	variants?: ProductVariant[];
	tags?: string[];
	createdAt: string;
	updatedAt: string;
}

export interface ProductVariant {
	id: string;
	name: string;
	value: string;
	available: boolean;
	price?: number;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	description?: string;
	image?: string;
	parentId?: string;
	children?: Category[];
}

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: 'customer' | 'admin';
	createdAt: string;
}

export interface CartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	variant?: string;
}

export interface Cart {
	id: string;
	items: CartItem[];
	total: number;
	subtotal: number;
	tax: number;
	shipping: number;
	userId?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Order {
	id: string;
	userId: string;
	items: CartItem[];
	total: number;
	subtotal: number;
	tax: number;
	shipping: number;
	status: OrderStatus;
	shippingAddress: Address;
	billingAddress: Address;
	createdAt: string;
	updatedAt: string;
}

export type OrderStatus =
	| 'pending'
	| 'confirmed'
	| 'processing'
	| 'shipped'
	| 'delivered'
	| 'cancelled'
	| 'refunded';

export interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface Review {
	id: string;
	productId: string;
	userId: string;
	userName: string;
	rating: number;
	title: string;
	comment: string;
	createdAt: string;
	helpful: number;
}

export interface WishlistItem {
	id: string;
	productId: string;
	userId: string;
	addedAt: string;
}

// GraphQL Query Variables
export interface ProductsQueryVariables {
	filter?: ProductFilter;
	sort?: ProductSort;
	pagination?: PaginationInput;
}

export interface ProductFilter {
	category?: string;
	priceRange?: [number, number];
	rating?: number;
	inStock?: boolean;
	tags?: string[];
	search?: string;
}

export interface ProductSort {
	field: 'name' | 'price' | 'rating' | 'createdAt' | 'popularity';
	order: 'asc' | 'desc';
}

export interface PaginationInput {
	page: number;
	limit: number;
}

// GraphQL Mutation Variables
export interface AddToCartMutationVariables {
	input: AddToCartInput;
}

export interface AddToCartInput {
	productId: string;
	quantity: number;
	variant?: string;
}

export interface UpdateCartItemMutationVariables {
	input: UpdateCartItemInput;
}

export interface UpdateCartItemInput {
	itemId: string;
	quantity: number;
}

export interface CreateOrderMutationVariables {
	input: CreateOrderInput;
}

export interface CreateOrderInput {
	shippingAddress: Address;
	billingAddress: Address;
	paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
	type: 'credit_card' | 'paypal' | 'stripe';
	token?: string;
}

// GraphQL Response Types
export interface ProductsQueryResponse {
	products: {
		items: Product[];
		totalCount: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}

export interface ProductQueryResponse {
	product: Product;
}

export interface CartQueryResponse {
	cart: Cart;
}

export interface UserQueryResponse {
	user: User;
}

export interface OrdersQueryResponse {
	orders: Order[];
}

// Error Types
export interface GraphQLError {
	message: string;
	extensions?: {
		code?: string;
		exception?: {
			stacktrace?: string[];
		};
	};
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	MockCart,
	MockCartItem,
	MockOrder,
	MockReview,
	MockWishlistItem,
	storage,
} from '../db/mockData';

// Helper functions
const generateId = () =>
	`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const calculateCartTotals = (items: MockCartItem[]) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const tax = subtotal * 0.08; // 8% tax
	const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
	const total = subtotal + tax + shipping;

	return { subtotal, tax, shipping, total };
};

export const resolvers = {
	Query: {
		// Products
		products: (_: any, { filter, sort, pagination }: any) => {
			let products = [...storage.products];

			// Apply filters
			if (filter) {
				if (filter.category) {
					products = products.filter((p) => p.category === filter.category);
				}
				if (filter.priceMin !== undefined) {
					products = products.filter((p) => p.price >= filter.priceMin);
				}
				if (filter.priceMax !== undefined) {
					products = products.filter((p) => p.price <= filter.priceMax);
				}
				if (filter.inStock !== undefined) {
					products = products.filter((p) => p.inStock === filter.inStock);
				}
				if (filter.isNew !== undefined) {
					products = products.filter((p) => p.isNew === filter.isNew);
				}
				if (filter.isOnSale !== undefined) {
					products = products.filter((p) => p.isOnSale === filter.isOnSale);
				}
				if (filter.search) {
					const searchTerm = filter.search.toLowerCase();
					products = products.filter(
						(p) =>
							p.name.toLowerCase().includes(searchTerm) ||
							p.description.toLowerCase().includes(searchTerm) ||
							p.tags.some((tag: string) =>
								tag.toLowerCase().includes(searchTerm)
							)
					);
				}
				if (filter.tags && filter.tags.length > 0) {
					products = products.filter((p) =>
						filter.tags.some((tag: string) => p.tags.includes(tag))
					);
				}
			}

			// Apply sorting
			if (sort) {
				switch (sort) {
					case 'NAME_ASC':
						products.sort((a, b) => a.name.localeCompare(b.name));
						break;
					case 'NAME_DESC':
						products.sort((a, b) => b.name.localeCompare(a.name));
						break;
					case 'PRICE_ASC':
						products.sort((a, b) => a.price - b.price);
						break;
					case 'PRICE_DESC':
						products.sort((a, b) => b.price - a.price);
						break;
					case 'RATING_DESC':
						products.sort((a, b) => b.rating - a.rating);
						break;
					case 'NEWEST':
						products.sort(
							(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
						);
						break;
					case 'OLDEST':
						products.sort(
							(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
						);
						break;
				}
			}

			const totalCount = products.length;
			const page = pagination?.page || 1;
			const limit = pagination?.limit || 12;
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;

			const paginatedProducts = products.slice(startIndex, endIndex);

			return {
				items: paginatedProducts,
				totalCount,
				hasNextPage: endIndex < totalCount,
				hasPreviousPage: page > 1,
			};
		},

		product: (_: any, { id }: any) => {
			return storage.products.find((p) => p.id === id) || null;
		},

		// Categories
		categories: () => storage.categories,

		category: (_: any, { id }: any) => {
			return storage.categories.find((c) => c.id === id) || null;
		},

		// Cart
		cart: () => {
			if (storage.carts.length === 0) {
				const newCart: MockCart = {
					id: generateId(),
					items: [],
					total: 0,
					subtotal: 0,
					tax: 0,
					shipping: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				storage.carts.push(newCart);
				return newCart;
			}
			return storage.carts[0];
		},

		// Orders
		orders: (_: any, { pagination }: any) => {
			const orders = [...storage.orders];
			const totalCount = orders.length;
			const page = pagination?.page || 1;
			const limit = pagination?.limit || 10;
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;

			const paginatedOrders = orders.slice(startIndex, endIndex);

			return {
				items: paginatedOrders,
				totalCount,
				hasNextPage: endIndex < totalCount,
				hasPreviousPage: page > 1,
			};
		},

		order: (_: any, { id }: any) => {
			return storage.orders.find((o) => o.id === id) || null;
		},

		// User
		me: () => {
			return storage.users[0] || null;
		},

		// Reviews
		productReviews: (_: any, { productId, pagination }: any) => {
			const reviews = storage.reviews.filter((r) => r.productId === productId);
			const totalCount = reviews.length;
			const page = pagination?.page || 1;
			const limit = pagination?.limit || 10;
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;

			const paginatedReviews = reviews.slice(startIndex, endIndex);

			return {
				items: paginatedReviews,
				totalCount,
				hasNextPage: endIndex < totalCount,
				hasPreviousPage: page > 1,
			};
		},

		// Wishlist
		wishlist: () => storage.wishlists,
	},

	Mutation: {
		// Authentication
		register: (_: any, { input }: any) => {
			const existingUser = storage.users.find((u) => u.email === input.email);
			if (existingUser) {
				throw new Error('User already exists');
			}

			const newUser = {
				id: generateId(),
				email: input.email,
				password: input.password,
				name: input.name,
				role: 'CUSTOMER' as const,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			storage.users.push(newUser);

			return {
				user: newUser,
				token: `mock-jwt-token-${newUser.id}`,
			};
		},

		login: (_: any, { input }: any) => {
			const user = storage.users.find(
				(u) => u.email === input.email && u.password === input.password
			);
			if (!user) {
				throw new Error('Invalid credentials');
			}

			return {
				user,
				token: `mock-jwt-token-${user.id}`,
			};
		},

		logout: () => true,

		// Cart operations
		addToCart: (_: any, { input }: any) => {
			const product = storage.products.find((p) => p.id === input.productId);
			if (!product) {
				throw new Error('Product not found');
			}

			let cart = storage.carts[0];
			if (!cart) {
				cart = {
					id: generateId(),
					items: [],
					total: 0,
					subtotal: 0,
					tax: 0,
					shipping: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				storage.carts.push(cart);
			}

			const existingItem = cart.items.find(
				(item) =>
					item.productId === input.productId && item.variant === input.variant
			);

			if (existingItem) {
				existingItem.quantity += input.quantity;
			} else {
				const newItem: MockCartItem = {
					id: generateId(),
					productId: input.productId,
					name: product.name,
					price: product.price,
					quantity: input.quantity,
					image: product.image,
					variant: input.variant,
				};
				cart.items.push(newItem);
			}

			const totals = calculateCartTotals(cart.items);
			cart.subtotal = totals.subtotal;
			cart.tax = totals.tax;
			cart.shipping = totals.shipping;
			cart.total = totals.total;
			cart.updatedAt = new Date();

			return cart;
		},

		updateCartItem: (_: any, { input }: any) => {
			const cart = storage.carts[0];
			if (!cart) {
				throw new Error('Cart not found');
			}

			const item = cart.items.find((i) => i.id === input.itemId);
			if (!item) {
				throw new Error('Cart item not found');
			}

			if (input.quantity <= 0) {
				cart.items = cart.items.filter((i) => i.id !== input.itemId);
			} else {
				item.quantity = input.quantity;
			}

			const totals = calculateCartTotals(cart.items);
			cart.subtotal = totals.subtotal;
			cart.tax = totals.tax;
			cart.shipping = totals.shipping;
			cart.total = totals.total;
			cart.updatedAt = new Date();

			return cart;
		},

		removeFromCart: (_: any, { itemId }: any) => {
			const cart = storage.carts[0];
			if (!cart) {
				throw new Error('Cart not found');
			}

			cart.items = cart.items.filter((i) => i.id !== itemId);

			const totals = calculateCartTotals(cart.items);
			cart.subtotal = totals.subtotal;
			cart.tax = totals.tax;
			cart.shipping = totals.shipping;
			cart.total = totals.total;
			cart.updatedAt = new Date();

			return cart;
		},

		clearCart: () => {
			const cart = storage.carts[0];
			if (!cart) {
				throw new Error('Cart not found');
			}

			cart.items = [];
			cart.subtotal = 0;
			cart.tax = 0;
			cart.shipping = 0;
			cart.total = 0;
			cart.updatedAt = new Date();

			return cart;
		},

		// Orders
		createOrder: (_: any, { input }: any) => {
			const cart = storage.carts[0];
			if (!cart || cart.items.length === 0) {
				throw new Error('Cart is empty');
			}

			const order: MockOrder = {
				id: generateId(),
				userId: '1',
				items: cart.items.map((item) => ({
					id: generateId(),
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					image: item.image,
					variant: item.variant,
				})),
				total: cart.total,
				subtotal: cart.subtotal,
				tax: cart.tax,
				shipping: cart.shipping,
				status: 'PENDING',
				shippingAddress: input.shippingAddress,
				billingAddress: input.billingAddress,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			storage.orders.push(order);

			// Clear the cart after creating order
			cart.items = [];
			cart.subtotal = 0;
			cart.tax = 0;
			cart.shipping = 0;
			cart.total = 0;
			cart.updatedAt = new Date();

			return order;
		},

		updateOrderStatus: (_: any, { orderId, status }: any) => {
			const order = storage.orders.find((o) => o.id === orderId);
			if (!order) {
				throw new Error('Order not found');
			}

			order.status = status;
			order.updatedAt = new Date();

			return order;
		},

		// User operations
		updateUser: (_: any, { input }: any) => {
			const user = storage.users[0];
			if (!user) {
				throw new Error('User not found');
			}

			if (input.name) user.name = input.name;
			if (input.email) user.email = input.email;
			if (input.avatar) user.avatar = input.avatar;
			user.updatedAt = new Date();

			return user;
		},

		changePassword: (_: any, { input }: any) => {
			const user = storage.users[0];
			if (!user) {
				throw new Error('User not found');
			}

			if (user.password !== input.currentPassword) {
				throw new Error('Current password is incorrect');
			}

			user.password = input.newPassword;
			user.updatedAt = new Date();

			return true;
		},

		// Reviews
		createReview: (_: any, { input }: any) => {
			const product = storage.products.find((p) => p.id === input.productId);
			if (!product) {
				throw new Error('Product not found');
			}

			const user = storage.users[0];
			if (!user) {
				throw new Error('User not authenticated');
			}

			const review: MockReview = {
				id: generateId(),
				productId: input.productId,
				userId: user.id,
				userName: user.name,
				rating: input.rating,
				title: input.title,
				comment: input.comment,
				createdAt: new Date(),
				updatedAt: new Date(),
				helpful: 0,
			};

			storage.reviews.push(review);

			// Update product rating
			const productReviews = storage.reviews.filter(
				(r) => r.productId === input.productId
			);
			const averageRating =
				productReviews.reduce((sum, r) => sum + r.rating, 0) /
				productReviews.length;
			product.rating = Math.round(averageRating * 10) / 10;
			product.reviewCount = productReviews.length;

			return review;
		},

		updateReview: (_: any, { reviewId, input }: any) => {
			const review = storage.reviews.find((r) => r.id === reviewId);
			if (!review) {
				throw new Error('Review not found');
			}

			if (input.rating !== undefined) review.rating = input.rating;
			if (input.title) review.title = input.title;
			if (input.comment) review.comment = input.comment;
			review.updatedAt = new Date();

			return review;
		},

		// Wishlist
		addToWishlist: (_: any, { productId }: any) => {
			const product = storage.products.find((p) => p.id === productId);
			if (!product) {
				throw new Error('Product not found');
			}

			const user = storage.users[0];
			if (!user) {
				throw new Error('User not authenticated');
			}

			const existing = storage.wishlists.find(
				(w) => w.productId === productId && w.userId === user.id
			);
			if (existing) {
				throw new Error('Product already in wishlist');
			}

			const wishlistItem: MockWishlistItem = {
				id: generateId(),
				productId,
				userId: user.id,
				addedAt: new Date(),
			};

			storage.wishlists.push(wishlistItem);

			return {
				...wishlistItem,
				product,
			};
		},

		removeFromWishlist: (_: any, { productId }: any) => {
			const user = storage.users[0];
			if (!user) {
				throw new Error('User not authenticated');
			}

			const index = storage.wishlists.findIndex(
				(w) => w.productId === productId && w.userId === user.id
			);
			if (index === -1) {
				throw new Error('Product not in wishlist');
			}

			storage.wishlists.splice(index, 1);
			return true;
		},
	},
};

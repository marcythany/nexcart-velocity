import { gql } from 'graphql-tag';

export const typeDefs = gql`
	type Product {
		id: ID!
		name: String!
		price: Float!
		originalPrice: Float
		rating: Float!
		reviewCount: Int!
		image: String!
		images: [String!]!
		description: String!
		category: String!
		inStock: Boolean!
		isNew: Boolean
		isOnSale: Boolean
		variants: [ProductVariant!]!
		tags: [String!]!
		createdAt: DateTime!
		updatedAt: DateTime!
	}

	type ProductVariant {
		id: ID!
		name: String!
		value: String!
		available: Boolean!
		price: Float
	}

	type Cart {
		id: ID!
		userId: ID
		items: [CartItem!]!
		total: Float!
		subtotal: Float!
		tax: Float!
		shipping: Float!
		createdAt: DateTime!
		updatedAt: DateTime!
	}

	type CartItem {
		id: ID!
		productId: ID!
		name: String!
		price: Float!
		quantity: Int!
		image: String!
		variant: String
	}

	type Order {
		id: ID!
		userId: ID!
		items: [OrderItem!]!
		total: Float!
		subtotal: Float!
		tax: Float!
		shipping: Float!
		status: OrderStatus!
		shippingAddress: Address!
		billingAddress: Address!
		createdAt: DateTime!
		updatedAt: DateTime!
	}

	type OrderItem {
		id: ID!
		productId: ID!
		name: String!
		price: Float!
		quantity: Int!
		image: String!
		variant: String
	}

	type Address {
		street: String!
		city: String!
		state: String!
		zipCode: String!
		country: String!
	}

	type User {
		id: ID!
		email: String!
		name: String!
		avatar: String
		role: UserRole!
		createdAt: DateTime!
		updatedAt: DateTime!
	}

	type AuthPayload {
		user: User!
		token: String!
	}

	type Review {
		id: ID!
		productId: ID!
		userId: ID!
		userName: String!
		rating: Int!
		title: String!
		comment: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		helpful: Int!
	}

	type Category {
		id: ID!
		name: String!
		slug: String!
		description: String
		image: String
		parentId: ID
		children: [Category!]!
		createdAt: DateTime!
		updatedAt: DateTime!
	}

	type WishlistItem {
		id: ID!
		productId: ID!
		userId: ID!
		addedAt: DateTime!
		product: Product!
	}

	type ProductConnection {
		items: [Product!]!
		totalCount: Int!
		hasNextPage: Boolean!
		hasPreviousPage: Boolean!
	}

	type OrderConnection {
		items: [Order!]!
		totalCount: Int!
		hasNextPage: Boolean!
		hasPreviousPage: Boolean!
	}

	type ReviewConnection {
		items: [Review!]!
		totalCount: Int!
		hasNextPage: Boolean!
		hasPreviousPage: Boolean!
	}

	input ProductFilter {
		category: String
		priceMin: Float
		priceMax: Float
		inStock: Boolean
		isNew: Boolean
		isOnSale: Boolean
		search: String
		tags: [String!]
	}

	input PaginationInput {
		page: Int!
		limit: Int!
	}

	input AddToCartInput {
		productId: ID!
		quantity: Int!
		variant: String
	}

	input UpdateCartItemInput {
		itemId: ID!
		quantity: Int!
	}

	input CreateOrderInput {
		items: [OrderItemInput!]!
		shippingAddress: AddressInput!
		billingAddress: AddressInput!
		paymentMethod: String!
	}

	input OrderItemInput {
		productId: ID!
		name: String!
		price: Float!
		quantity: Int!
		image: String!
		variant: String
	}

	input AddressInput {
		street: String!
		city: String!
		state: String!
		zipCode: String!
		country: String!
	}

	input RegisterInput {
		email: String!
		password: String!
		name: String!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	input UpdateUserInput {
		name: String
		email: String
		avatar: String
	}

	input ChangePasswordInput {
		currentPassword: String!
		newPassword: String!
	}

	input CreateReviewInput {
		productId: ID!
		rating: Int!
		title: String!
		comment: String!
	}

	input UpdateReviewInput {
		rating: Int
		title: String
		comment: String
	}

	enum ProductSort {
		NAME_ASC
		NAME_DESC
		PRICE_ASC
		PRICE_DESC
		RATING_DESC
		NEWEST
		OLDEST
	}

	enum OrderStatus {
		PENDING
		PROCESSING
		SHIPPED
		DELIVERED
		CANCELLED
	}

	enum UserRole {
		CUSTOMER
		ADMIN
	}

	scalar DateTime

	type Query {
		products(
			filter: ProductFilter
			sort: ProductSort
			pagination: PaginationInput
		): ProductConnection!
		product(id: ID!): Product
		categories: [Category!]!
		category(id: ID!): Category
		cart: Cart
		orders(pagination: PaginationInput): OrderConnection!
		order(id: ID!): Order
		me: User
		productReviews(
			productId: ID!
			pagination: PaginationInput
		): ReviewConnection!
		wishlist: [WishlistItem!]!
	}

	type Mutation {
		register(input: RegisterInput!): AuthPayload!
		login(input: LoginInput!): AuthPayload!
		logout: Boolean!
		addToCart(input: AddToCartInput!): Cart!
		updateCartItem(input: UpdateCartItemInput!): Cart!
		removeFromCart(itemId: ID!): Cart!
		clearCart: Cart!
		createOrder(input: CreateOrderInput!): Order!
		updateOrderStatus(orderId: ID!, status: OrderStatus!): Order!
		updateUser(input: UpdateUserInput!): User!
		changePassword(input: ChangePasswordInput!): Boolean!
		createReview(input: CreateReviewInput!): Review!
		updateReview(reviewId: ID!, input: UpdateReviewInput!): Review!
		addToWishlist(productId: ID!): WishlistItem!
		removeFromWishlist(productId: ID!): Boolean!
	}
`;

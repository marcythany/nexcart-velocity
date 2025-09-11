import { gql } from '@apollo/client';

// Authentication Mutations
export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			user {
				id
				email
				name
				avatar
				role
				createdAt
			}
			token
		}
	}
`;

export const REGISTER = gql`
	mutation Register($input: RegisterInput!) {
		register(input: $input) {
			user {
				id
				email
				name
				avatar
				role
				createdAt
			}
			token
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

// Cart Mutations
export const ADD_TO_CART = gql`
	mutation AddToCart($input: AddToCartInput!) {
		addToCart(input: $input) {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
			updatedAt
		}
	}
`;

export const UPDATE_CART_ITEM = gql`
	mutation UpdateCartItem($input: UpdateCartItemInput!) {
		updateCartItem(input: $input) {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
			updatedAt
		}
	}
`;

export const REMOVE_FROM_CART = gql`
	mutation RemoveFromCart($itemId: ID!) {
		removeFromCart(itemId: $itemId) {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
			updatedAt
		}
	}
`;

export const CLEAR_CART = gql`
	mutation ClearCart {
		clearCart {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
			updatedAt
		}
	}
`;

// Order Mutations
export const CREATE_ORDER = gql`
	mutation CreateOrder($input: CreateOrderInput!) {
		createOrder(input: $input) {
			id
			userId
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
			status
			shippingAddress {
				street
				city
				state
				zipCode
				country
			}
			billingAddress {
				street
				city
				state
				zipCode
				country
			}
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_ORDER_STATUS = gql`
	mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
		updateOrderStatus(orderId: $orderId, status: $status) {
			id
			status
			updatedAt
		}
	}
`;

// Review Mutations
export const CREATE_REVIEW = gql`
	mutation CreateReview($input: CreateReviewInput!) {
		createReview(input: $input) {
			id
			productId
			userId
			userName
			rating
			title
			comment
			createdAt
			helpful
		}
	}
`;

export const UPDATE_REVIEW = gql`
	mutation UpdateReview($reviewId: ID!, $input: UpdateReviewInput!) {
		updateReview(reviewId: $reviewId, input: $input) {
			id
			rating
			title
			comment
			createdAt
		}
	}
`;

// Wishlist Mutations
export const ADD_TO_WISHLIST = gql`
	mutation AddToWishlist($productId: ID!) {
		addToWishlist(productId: $productId) {
			id
			productId
			userId
			addedAt
		}
	}
`;

export const REMOVE_FROM_WISHLIST = gql`
	mutation RemoveFromWishlist($productId: ID!) {
		removeFromWishlist(productId: $productId)
	}
`;

// User Mutations
export const UPDATE_USER_PROFILE = gql`
	mutation UpdateUserProfile($input: UpdateUserInput!) {
		updateUser(input: $input) {
			id
			email
			name
			avatar
			role
			createdAt
		}
	}
`;

export const CHANGE_PASSWORD = gql`
	mutation ChangePassword($input: ChangePasswordInput!) {
		changePassword(input: $input)
	}
`;

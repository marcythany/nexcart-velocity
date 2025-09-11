import { gql } from '@apollo/client';

// Product Queries
export const GET_PRODUCTS = gql`
	query GetProducts(
		$filter: ProductFilter
		$sort: ProductSort
		$pagination: PaginationInput
	) {
		products(filter: $filter, sort: $sort, pagination: $pagination) {
			items {
				id
				name
				price
				originalPrice
				rating
				reviewCount
				image
				images
				description
				category
				inStock
				isNew
				isOnSale
				variants {
					id
					name
					value
					available
					price
				}
				tags
				createdAt
				updatedAt
			}
			totalCount
			hasNextPage
			hasPreviousPage
		}
	}
`;

export const GET_PRODUCT = gql`
	query GetProduct($id: ID!) {
		product(id: $id) {
			id
			name
			price
			originalPrice
			rating
			reviewCount
			image
			images
			description
			category
			inStock
			isNew
			isOnSale
			variants {
				id
				name
				value
				available
				price
			}
			tags
			createdAt
			updatedAt
		}
	}
`;

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			id
			name
			slug
			description
			image
			parentId
			children {
				id
				name
				slug
			}
		}
	}
`;

// Cart Queries
export const GET_CART = gql`
	query GetCart {
		cart {
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
			createdAt
			updatedAt
		}
	}
`;

// User Queries
export const GET_CURRENT_USER = gql`
	query GetCurrentUser {
		me {
			id
			email
			name
			avatar
			role
			createdAt
		}
	}
`;

// Order Queries
export const GET_ORDERS = gql`
	query GetOrders($pagination: PaginationInput) {
		orders(pagination: $pagination) {
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

// Review Queries
export const GET_PRODUCT_REVIEWS = gql`
	query GetProductReviews($productId: ID!, $pagination: PaginationInput) {
		productReviews(productId: $productId, pagination: $pagination) {
			items {
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
			totalCount
			hasNextPage
			hasPreviousPage
		}
	}
`;

// Wishlist Queries
export const GET_WISHLIST = gql`
	query GetWishlist {
		wishlist {
			id
			productId
			userId
			addedAt
			product {
				id
				name
				price
				image
				inStock
			}
		}
	}
`;

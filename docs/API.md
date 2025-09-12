# API Documentation

## GraphQL Schema

### Types

#### Product

```graphql
type Product {
	id: ID!
	name: String!
	price: Float!
	originalPrice: Float
	rating: Float!
	reviewCount: Int!
	image: String!
	images: [String!]
	description: String!
	category: String!
	inStock: Boolean!
	isNew: Boolean
	isOnSale: Boolean
	variants: [ProductVariant!]
	tags: [String!]
	createdAt: DateTime!
	updatedAt: DateTime!
}
```

#### ProductVariant

```graphql
type ProductVariant {
	id: ID!
	name: String!
	value: String!
	available: Boolean!
	price: Float
}
```

#### Cart

```graphql
type Cart {
	id: ID!
	items: [CartItem!]!
	total: Float!
	subtotal: Float!
	tax: Float!
	shipping: Float!
	createdAt: DateTime!
	updatedAt: DateTime!
}
```

#### CartItem

```graphql
type CartItem {
	id: ID!
	productId: ID!
	name: String!
	price: Float!
	quantity: Int!
	image: String!
	variant: String
}
```

### Queries

#### Get Products

```graphql
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
```

#### Get Product

```graphql
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
```

#### Get Cart

```graphql
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
```

### Mutations

#### Add to Cart

```graphql
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
```

#### Update Cart Item

```graphql
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
```

#### Remove from Cart

```graphql
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
```

### Input Types

#### ProductFilter

```graphql
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
```

#### ProductSort

```graphql
enum ProductSort {
	NAME_ASC
	NAME_DESC
	PRICE_ASC
	PRICE_DESC
	RATING_DESC
	NEWEST
	OLDEST
}
```

#### PaginationInput

```graphql
input PaginationInput {
	page: Int!
	limit: Int!
}
```

#### AddToCartInput

```graphql
input AddToCartInput {
	productId: ID!
	quantity: Int!
	variant: String
}
```

#### UpdateCartItemInput

```graphql
input UpdateCartItemInput {
	itemId: ID!
	quantity: Int!
}
```

## Error Handling

All GraphQL operations include comprehensive error handling:

- **Network errors**: Automatic retry with exponential backoff
- **Authentication errors**: Token refresh and re-authentication
- **Validation errors**: User-friendly error messages
- **Server errors**: Fallback UI states and error boundaries

## Caching Strategy

Apollo Client implements a sophisticated caching strategy:

- **Cache-first** for static data (categories, product details)
- **Network-first** for dynamic data (search results, cart)
- **Cache-only** for optimistic updates
- **Background refetch** for stale data

## Real-time Updates

The application supports real-time updates through:

- **GraphQL Subscriptions** for live inventory updates
- **Push notifications** for order status changes
- **Background sync** for offline actions

## Rate Limiting

API endpoints implement rate limiting to prevent abuse:

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **Admin users**: 5000 requests per hour

## Authentication

JWT-based authentication with the following endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

## File Upload

Product images and user avatars support the following:

- **Formats**: JPEG, PNG, WebP, AVIF
- **Max size**: 5MB per file
- **Multiple files**: Up to 10 images per product
- **CDN delivery**: Automatic optimization and WebP conversion

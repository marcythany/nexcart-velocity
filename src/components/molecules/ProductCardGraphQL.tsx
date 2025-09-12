import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import ProductCard, { Product } from './ProductCard';

// GraphQL Queries and Mutations
const GET_PRODUCT = gql`
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
		}
	}
`;

const ADD_TO_CART = gql`
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
		}
	}
`;

const ADD_TO_WISHLIST = gql`
	mutation AddToWishlist($productId: ID!) {
		addToWishlist(productId: $productId) {
			id
			productId
			userId
			addedAt
		}
	}
`;

const REMOVE_FROM_WISHLIST = gql`
	mutation RemoveFromWishlist($productId: ID!) {
		removeFromWishlist(productId: $productId)
	}
`;

interface ProductCardGraphQLProps {
	productId: string;
	isInWishlist?: boolean;
	className?: string;
}

const ProductCardGraphQL: React.FC<ProductCardGraphQLProps> = ({
	productId,
	isInWishlist = false,
	className,
}) => {
	const { openModal, setCartOpen } = useUIStore();
	const { addItem } = useCartStore();

	// Fetch product data
	const { loading, error, data } = useQuery(GET_PRODUCT, {
		variables: { id: productId },
	});

	// Mutations
	const [addToCartMutation] = useMutation(ADD_TO_CART);
	const [addToWishlistMutation] = useMutation(ADD_TO_WISHLIST);
	const [removeFromWishlistMutation] = useMutation(REMOVE_FROM_WISHLIST);

	// Loading state
	if (loading) {
		return (
			<div className={`animate-pulse ${className}`}>
				<div className='bg-gray-300 aspect-square rounded-lg mb-4'></div>
				<div className='h-4 bg-gray-300 rounded mb-2'></div>
				<div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
				<div className='h-10 bg-gray-300 rounded'></div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div
				className={`text-center p-4 border border-red-200 rounded-lg ${className}`}
			>
				<p className='text-red-600 mb-2'>Failed to load product</p>
				<button
					onClick={() => window.location.reload()}
					className='text-sm text-blue-600 hover:underline'
				>
					Try again
				</button>
			</div>
		);
	}

	// No data
	if (!data?.product) {
		return (
			<div
				className={`text-center p-4 border border-gray-200 rounded-lg ${className}`}
			>
				<p className='text-gray-600'>Product not found</p>
			</div>
		);
	}

	const product: Product = {
		id: data.product.id,
		name: data.product.name,
		price: data.product.price,
		originalPrice: data.product.originalPrice,
		rating: data.product.rating,
		reviewCount: data.product.reviewCount,
		image: data.product.image,
		images: data.product.images,
		description: data.product.description,
		category: data.product.category,
		inStock: data.product.inStock,
		isNew: data.product.isNew,
		isOnSale: data.product.isOnSale,
		variants: data.product.variants?.map(
			(variant: {
				id: string;
				name: string;
				value: string;
				available: boolean;
			}) => ({
				id: variant.id,
				name: variant.name,
				value: variant.value,
				available: variant.available,
			})
		),
	};

	// Event handlers
	const handleAddToCart = async (productData: Product) => {
		try {
			const { data: cartData } = await addToCartMutation({
				variables: {
					input: {
						productId: productData.id,
						quantity: 1,
					},
				},
			});

			if (cartData?.addToCart) {
				// Update local cart store
				addItem({
					productId: productData.id,
					name: productData.name,
					price: productData.price,
					quantity: 1,
					image: productData.image,
				});

				// Show cart sidebar
				setCartOpen(true);
			}
		} catch (error) {
			console.error('Failed to add to cart:', error);
			// You could show a toast notification here
		}
	};

	const handleToggleWishlist = async (productId: string) => {
		try {
			if (isInWishlist) {
				await removeFromWishlistMutation({
					variables: { productId },
				});
			} else {
				await addToWishlistMutation({
					variables: { productId },
				});
			}
		} catch (error) {
			console.error('Failed to update wishlist:', error);
		}
	};

	const handleQuickView = (productData: Product) => {
		openModal('product-quick-view', { product: productData });
	};

	return (
		<ProductCard
			product={product}
			onAddToCart={handleAddToCart}
			onToggleWishlist={handleToggleWishlist}
			onQuickView={handleQuickView}
			isInWishlist={isInWishlist}
			className={className}
		/>
	);
};

export default ProductCardGraphQL;

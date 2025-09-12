import { gql, useQuery } from '@apollo/client';
import React from 'react';
import ProductCardGraphQL from '../molecules/ProductCardGraphQL';

// GraphQL Query for products
const GET_PRODUCTS = gql`
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
			}
			totalCount
			hasNextPage
			hasPreviousPage
		}
	}
`;

interface ProductGridProps {
	category?: string;
	search?: string;
	sort?:
		| 'NAME_ASC'
		| 'NAME_DESC'
		| 'PRICE_ASC'
		| 'PRICE_DESC'
		| 'RATING_DESC'
		| 'NEWEST'
		| 'OLDEST';
	limit?: number;
	className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
	category,
	search,
	sort = 'NEWEST',
	limit = 12,
	className = '',
}) => {
	const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
		variables: {
			filter: {
				category: category || undefined,
				search: search || undefined,
			},
			sort,
			pagination: {
				page: 1,
				limit,
			},
		},
	});

	// Loading state
	if (loading) {
		return (
			<div
				className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
			>
				{Array.from({ length: limit }).map((_, index) => (
					<div key={index} className='animate-pulse'>
						<div className='bg-gray-300 aspect-square rounded-lg mb-4'></div>
						<div className='h-4 bg-gray-300 rounded mb-2'></div>
						<div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
						<div className='h-10 bg-gray-300 rounded'></div>
					</div>
				))}
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className={`text-center py-12 ${className}`}>
				<div className='text-6xl mb-4'>😵</div>
				<h3 className='text-xl font-semibold mb-2'>Failed to load products</h3>
				<p className='text-gray-600 mb-4'>
					{error.message || 'Something went wrong while loading products.'}
				</p>
				<button
					onClick={() => window.location.reload()}
					className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
				>
					Try Again
				</button>
			</div>
		);
	}

	// No products
	if (!data?.products?.items || data.products.items.length === 0) {
		return (
			<div className={`text-center py-12 ${className}`}>
				<div className='text-6xl mb-4'>🛒</div>
				<h3 className='text-xl font-semibold mb-2'>No products found</h3>
				<p className='text-gray-600'>
					{search ?
						`No products match "${search}"`
					:	'No products available in this category.'}
				</p>
			</div>
		);
	}

	const { items, totalCount, hasNextPage } = data.products;

	return (
		<div className={className}>
			{/* Results header */}
			<div className='flex justify-between items-center mb-6'>
				<p className='text-gray-600'>
					Showing {items.length} of {totalCount} products
				</p>
				{hasNextPage && (
					<button
						onClick={() => {
							fetchMore({
								variables: {
									pagination: {
										page: Math.ceil(items.length / limit) + 1,
										limit,
									},
								},
								updateQuery: (prev, { fetchMoreResult }) => {
									if (!fetchMoreResult) return prev;
									return {
										...prev,
										products: {
											...prev.products,
											items: [
												...prev.products.items,
												...fetchMoreResult.products.items,
											],
											hasNextPage: fetchMoreResult.products.hasNextPage,
										},
									};
								},
							});
						}}
						className='px-4 py-2 text-blue-600 hover:text-blue-800 font-medium'
					>
						Load More
					</button>
				)}
			</div>

			{/* Product grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{items.map((product: { id: string }) => (
					<ProductCardGraphQL
						key={product.id}
						productId={product.id}
						className='w-full'
					/>
				))}
			</div>

			{/* Load more button at bottom */}
			{hasNextPage && (
				<div className='text-center mt-8'>
					<button
						onClick={() => {
							fetchMore({
								variables: {
									pagination: {
										page: Math.ceil(items.length / limit) + 1,
										limit,
									},
								},
								updateQuery: (prev, { fetchMoreResult }) => {
									if (!fetchMoreResult) return prev;
									return {
										...prev,
										products: {
											...prev,
											products: {
												...prev.products,
												items: [
													...prev.products.items,
													...fetchMoreResult.products.items,
												],
												hasNextPage: fetchMoreResult.products.hasNextPage,
											},
										},
									};
								},
							});
						}}
						className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
					>
						Load More Products
					</button>
				</div>
			)}
		</div>
	);
};

export default ProductGrid;

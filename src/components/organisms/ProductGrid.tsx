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
			{/* Filters and Results Header */}
			<div className='flex flex-col lg:flex-row gap-6 mb-6'>
				{/* Filters Sidebar */}
				<aside className='lg:w-64 space-y-6'>
					<div>
						<h3 className='font-semibold mb-3'>Price Range</h3>
						<div className='space-y-2'>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								Under $25
							</label>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								$25 - $50
							</label>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								$50 - $100
							</label>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								Over $100
							</label>
						</div>
					</div>

					<div>
						<h3 className='font-semibold mb-3'>Rating</h3>
						<div className='space-y-2'>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								4+ stars
							</label>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								3+ stars
							</label>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								2+ stars
							</label>
						</div>
					</div>

					<div>
						<h3 className='font-semibold mb-3'>Availability</h3>
						<div className='space-y-2'>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' defaultChecked />
								In Stock
							</label>
							<label className='flex items-center'>
								<input type='checkbox' className='mr-2' />
								On Sale
							</label>
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<div className='flex-1'>
					{/* Results header */}
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
						<p className='text-gray-600'>
							Showing {items.length} of {totalCount} products
						</p>
						<div className='flex items-center gap-4'>
							<select className='px-3 py-2 border border-gray-300 rounded-md text-sm'>
								<option>Sort by: Featured</option>
								<option>Price: Low to High</option>
								<option>Price: High to Low</option>
								<option>Rating</option>
								<option>Newest</option>
							</select>
							<div className='flex gap-2'>
								<button className='p-2 border border-gray-300 rounded-md hover:bg-gray-50'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M4 6h16M4 10h16M4 14h16M4 18h16'
										/>
									</svg>
								</button>
								<button className='p-2 border border-gray-300 rounded-md hover:bg-gray-50'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					{/* Product grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{items.map((product: { id: string }) => (
							<ProductCardGraphQL
								key={product.id}
								productId={product.id}
								className='w-full'
							/>
						))}
					</div>

					{/* Load more */}
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
								className='px-6 py-3 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover font-medium transition-colors'
							>
								Load More Products
							</button>
						</div>
					)}
				</div>
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

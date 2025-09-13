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
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ${className}`}
			>
				{Array.from({ length: limit }).map((_, index) => (
					<div
						key={index}
						className='animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
					>
						<div className='bg-gray-200 aspect-square'></div>
						<div className='p-4 space-y-3'>
							<div className='h-4 bg-gray-200 rounded'></div>
							<div className='h-4 bg-gray-200 rounded w-3/4'></div>
							<div className='flex items-center gap-1'>
								<div className='flex gap-1'>
									{[...Array(5)].map((_, i) => (
										<div key={i} className='w-3 h-3 bg-gray-200 rounded'></div>
									))}
								</div>
								<div className='h-3 bg-gray-200 rounded w-12'></div>
							</div>
							<div className='h-6 bg-gray-200 rounded w-20'></div>
							<div className='h-10 bg-gray-200 rounded'></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className={`text-center py-16 ${className}`}>
				<div className='text-6xl mb-6'>😵</div>
				<h3 className='text-2xl font-bold text-gray-900 mb-3'>
					Failed to load products
				</h3>
				<p className='text-gray-600 mb-6 max-w-md mx-auto'>
					{error.message || 'Something went wrong while loading products.'}
				</p>
				<button
					onClick={() => window.location.reload()}
					className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
				>
					Try Again
				</button>
			</div>
		);
	}

	// No products
	if (!data?.products?.items || data.products.items.length === 0) {
		return (
			<div className={`text-center py-16 ${className}`}>
				<div className='text-6xl mb-6'>🛒</div>
				<h3 className='text-2xl font-bold text-gray-900 mb-3'>
					No products found
				</h3>
				<p className='text-gray-600 max-w-md mx-auto'>
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
					{/* Price Range */}
					<div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
						<h3 className='font-semibold mb-4 text-gray-900 text-lg'>
							Price Range
						</h3>
						<div className='space-y-3'>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>Under $25</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>$25 - $50</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>$50 - $100</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>Over $100</span>
							</label>
						</div>
					</div>

					{/* Rating */}
					<div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
						<h3 className='font-semibold mb-4 text-gray-900 text-lg'>
							Customer Rating
						</h3>
						<div className='space-y-3'>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm flex items-center gap-1 text-gray-700'>
									★★★★★ <span className='text-gray-500 ml-1'>4+ stars</span>
								</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm flex items-center gap-1 text-gray-700'>
									★★★★☆ <span className='text-gray-500 ml-1'>3+ stars</span>
								</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm flex items-center gap-1 text-gray-700'>
									★★★☆☆ <span className='text-gray-500 ml-1'>2+ stars</span>
								</span>
							</label>
						</div>
					</div>

					{/* Availability */}
					<div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
						<h3 className='font-semibold mb-4 text-gray-900 text-lg'>
							Availability
						</h3>
						<div className='space-y-3'>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
									defaultChecked
								/>
								<span className='text-sm text-gray-700'>In Stock</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>On Sale</span>
							</label>
							<label className='flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors'>
								<input
									type='checkbox'
									className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>New Arrivals</span>
							</label>
						</div>
					</div>

					{/* Clear Filters */}
					<div className='pt-4'>
						<button className='w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md'>
							Clear All Filters
						</button>
					</div>
				</aside>

				{/* Main Content */}
				<div className='flex-1'>
					{/* Results header */}
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
						<p className='text-gray-600 font-medium'>
							Showing {items.length} of {totalCount} products
						</p>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<select
									value={sort}
									onChange={() => {
										// This would trigger a refetch with new sort
										// For now, just update the UI
									}}
									className='appearance-none px-4 py-2.5 pr-8 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-colors cursor-pointer shadow-sm'
								>
									<option value='NEWEST'>Newest First</option>
									<option value='NAME_ASC'>Name A-Z</option>
									<option value='NAME_DESC'>Name Z-A</option>
									<option value='PRICE_ASC'>Price: Low to High</option>
									<option value='PRICE_DESC'>Price: High to Low</option>
									<option value='RATING_DESC'>Highest Rated</option>
								</select>
								<div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
									<svg
										className='w-4 h-4 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								</div>
							</div>
							<div className='flex gap-2'>
								<button className='p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200'>
									<svg
										className='w-5 h-5 text-gray-600'
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
								<button className='p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200'>
									<svg
										className='w-5 h-5 text-gray-600'
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
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
						{items.map((product: { id: string }) => (
							<ProductCardGraphQL
								key={product.id}
								productId={product.id}
								className='w-full'
							/>
						))}
					</div>
				</div>
			</div>

			{/* Load more button at bottom */}
			{hasNextPage && (
				<div className='text-center mt-12'>
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
						className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
					>
						Load More Products
					</button>
				</div>
			)}
		</div>
	);
};

export default ProductGrid;

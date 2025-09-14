'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import Breadcrumb from '../../../components/molecules/Breadcrumb';
import ProductGrid from '../../../components/organisms/ProductGrid';

const categoryData = {
	electronics: {
		name: 'Electronics',
		description: 'Discover the latest in technology and gadgets',
		image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
		productCount: 1250,
	},
	clothing: {
		name: 'Clothing',
		description: 'Fashion and apparel for every style',
		image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
		productCount: 890,
	},
	'home-kitchen': {
		name: 'Home & Kitchen',
		description: 'Everything you need for your home',
		image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
		productCount: 654,
	},
	'sports-outdoors': {
		name: 'Sports & Outdoors',
		description: 'Gear up for your active lifestyle',
		image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png',
		productCount: 432,
	},
};

export default function CategoryPage() {
	const params = useParams();
	const slug = params.slug as string;
	const category = categoryData[slug as keyof typeof categoryData];

	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [sortBy, setSortBy] = useState('NEWEST');
	const [showFilters, setShowFilters] = useState(false);

	if (!category) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						Category Not Found
					</h1>
					<p className='text-gray-600 mb-8'>
						The category you&rsquo;re looking for doesn&rsquo;t exist.
					</p>
					<Link href='/'>
						<Button className='bg-blue-600 hover:bg-blue-700 text-white'>
							Back to Home
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
				className='relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden'
			>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
					<div className='text-white'>
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							<Link
								href='/'
								className='inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors'
							>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Back to Home
							</Link>
							<h1 className='text-3xl md:text-5xl font-bold mb-2'>
								{category.name}
							</h1>
							<p className='text-lg md:text-xl text-blue-100 mb-4'>
								{category.description}
							</p>
							<p className='text-blue-200'>
								{category.productCount} products available
							</p>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Breadcrumb */}
				<Breadcrumb className='mb-6' />

				{/* Controls */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'
				>
					<div className='flex items-center gap-4'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => setShowFilters(!showFilters)}
							className='flex items-center gap-2'
						>
							<Filter className='w-4 h-4' />
							Filters
						</Button>
						<div className='flex items-center gap-2'>
							<Button
								variant={viewMode === 'grid' ? 'primary' : 'outline'}
								size='sm'
								onClick={() => setViewMode('grid')}
							>
								<Grid className='w-4 h-4' />
							</Button>
							<Button
								variant={viewMode === 'list' ? 'primary' : 'outline'}
								size='sm'
								onClick={() => setViewMode('list')}
							>
								<List className='w-4 h-4' />
							</Button>
						</div>
					</div>

					<div className='flex items-center gap-4'>
						<label className='text-sm font-medium text-gray-700'>
							Sort by:
						</label>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
						>
							<option value='NEWEST'>Newest</option>
							<option value='PRICE_ASC'>Price: Low to High</option>
							<option value='PRICE_DESC'>Price: High to Low</option>
							<option value='RATING_DESC'>Highest Rated</option>
							<option value='NAME_ASC'>Name A-Z</option>
						</select>
					</div>
				</motion.div>

				{/* Filters Sidebar (Mobile) */}
				{showFilters && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 lg:hidden'
					>
						<h3 className='font-semibold text-gray-900 mb-4'>Filters</h3>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Price Range
								</label>
								<div className='space-y-2'>
									<label className='flex items-center'>
										<input
											type='checkbox'
											className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
										/>
										<span className='text-sm text-gray-700'>Under $25</span>
									</label>
									<label className='flex items-center'>
										<input
											type='checkbox'
											className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
										/>
										<span className='text-sm text-gray-700'>$25 - $50</span>
									</label>
									<label className='flex items-center'>
										<input
											type='checkbox'
											className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
										/>
										<span className='text-sm text-gray-700'>$50 - $100</span>
									</label>
									<label className='flex items-center'>
										<input
											type='checkbox'
											className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
										/>
										<span className='text-sm text-gray-700'>Over $100</span>
									</label>
								</div>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Availability
								</label>
								<div className='space-y-2'>
									<label className='flex items-center'>
										<input
											type='checkbox'
											className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
											defaultChecked
										/>
										<span className='text-sm text-gray-700'>In Stock</span>
									</label>
									<label className='flex items-center'>
										<input
											type='checkbox'
											className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
										/>
										<span className='text-sm text-gray-700'>On Sale</span>
									</label>
								</div>
							</div>
						</div>
					</motion.div>
				)}

				<div className='flex gap-8'>
					{/* Filters Sidebar (Desktop) */}
					<motion.aside
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						className='hidden lg:block w-64 flex-shrink-0'
					>
						<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6'>
							<h3 className='font-semibold text-gray-900 mb-4'>Filters</h3>
							<div className='space-y-6'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-3'>
										Price Range
									</label>
									<div className='space-y-3'>
										<label className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'>
											<input
												type='checkbox'
												className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
											/>
											<span className='text-sm text-gray-700'>Under $25</span>
										</label>
										<label className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'>
											<input
												type='checkbox'
												className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
											/>
											<span className='text-sm text-gray-700'>$25 - $50</span>
										</label>
										<label className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'>
											<input
												type='checkbox'
												className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
											/>
											<span className='text-sm text-gray-700'>$50 - $100</span>
										</label>
										<label className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'>
											<input
												type='checkbox'
												className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
											/>
											<span className='text-sm text-gray-700'>Over $100</span>
										</label>
									</div>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-3'>
										Availability
									</label>
									<div className='space-y-3'>
										<label className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'>
											<input
												type='checkbox'
												className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
												defaultChecked
											/>
											<span className='text-sm text-gray-700'>In Stock</span>
										</label>
										<label className='flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors'>
											<input
												type='checkbox'
												className='mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
											/>
											<span className='text-sm text-gray-700'>On Sale</span>
										</label>
									</div>
								</div>
								<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
									Apply Filters
								</Button>
							</div>
						</div>
					</motion.aside>

					{/* Products Grid */}
					<motion.main
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.6 }}
						className='flex-1'
					>
						<ProductGrid
							category={category.name}
							sort={
								sortBy as
									| 'NAME_ASC'
									| 'NAME_DESC'
									| 'PRICE_ASC'
									| 'PRICE_DESC'
									| 'RATING_DESC'
									| 'NEWEST'
									| 'OLDEST'
							}
							className={`grid gap-6 ${
								viewMode === 'grid' ?
									'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
								:	'grid-cols-1'
							}`}
						/>
					</motion.main>
				</div>
			</div>
		</div>
	);
}

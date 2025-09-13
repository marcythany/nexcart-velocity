'use client';

import { ArrowRight, RefreshCw, Shield, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/atoms/Button';
import ProductGrid from '../components/organisms/ProductGrid';
import { Card, CardContent } from '../components/ui/Card';

const categories = [
	{ name: 'Electronics', image: '/api/placeholder/300/200', count: 1250 },
	{ name: 'Clothing', image: '/api/placeholder/300/200', count: 890 },
	{ name: 'Home & Kitchen', image: '/api/placeholder/300/200', count: 654 },
	{ name: 'Sports & Outdoors', image: '/api/placeholder/300/200', count: 432 },
];

export default function HomePage() {
	return (
		<div className='min-h-screen'>
			{/* Hero Carousel Section */}
			<section className='relative overflow-hidden'>
				<div className='h-96 md:h-[500px] relative'>
					{/* Slide 1 */}
					<div className='absolute inset-0 bg-gradient-to-r from-primary to-primary-hover flex items-center'>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
							<div className='max-w-lg'>
								<h1 className='text-3xl md:text-5xl font-bold text-text-inverted mb-4'>
									Welcome to Nexcart Velocity
								</h1>
								<p className='text-lg md:text-xl text-text-inverted/90 mb-6'>
									Discover amazing products at unbeatable prices. Fast shipping,
									secure payments, and exceptional customer service.
								</p>
								<div className='flex flex-col sm:flex-row gap-3'>
									<Button
										size='lg'
										className='bg-text-inverted text-primary hover:bg-bg-alt'
									>
										Shop Now
										<ArrowRight className='ml-2' size={20} />
									</Button>
									<Button
										size='lg'
										variant='outline'
										className='border-text-inverted text-text-inverted hover:bg-text-inverted hover:text-primary'
									>
										Learn More
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Slide 2 */}
					<div className='absolute inset-0 bg-gradient-to-r from-success to-success-hover flex items-center translate-x-full'>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
							<div className='max-w-lg ml-auto text-right'>
								<h1 className='text-3xl md:text-5xl font-bold text-text-inverted mb-4'>
									New Arrivals Daily
								</h1>
								<p className='text-lg md:text-xl text-text-inverted/90 mb-6'>
									Be the first to shop our latest collection. Exclusive deals
									and trending products updated every day.
								</p>
								<Button
									size='lg'
									className='bg-text-inverted text-success hover:bg-bg-alt'
								>
									View New Arrivals
									<ArrowRight className='ml-2' size={20} />
								</Button>
							</div>
						</div>
					</div>

					{/* Slide 3 */}
					<div className='absolute inset-0 bg-gradient-to-r from-warning to-warning-hover flex items-center translate-x-full'>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
							<div className='max-w-lg'>
								<h1 className='text-3xl md:text-5xl font-bold text-text-primary mb-4'>
									Free Shipping on $50+
								</h1>
								<p className='text-lg md:text-xl text-text-primary/90 mb-6'>
									Shop now and enjoy free delivery on orders over $50. No codes
									required, no hidden fees.
								</p>
								<Button
									size='lg'
									className='bg-primary text-text-inverted hover:bg-primary-hover'
								>
									Start Shopping
									<ArrowRight className='ml-2' size={20} />
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Carousel Controls */}
				<div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
					<button className='w-3 h-3 rounded-full bg-text-inverted/50 hover:bg-text-inverted transition-colors'></button>
					<button className='w-3 h-3 rounded-full bg-text-inverted transition-colors'></button>
					<button className='w-3 h-3 rounded-full bg-text-inverted/50 hover:bg-text-inverted transition-colors'></button>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-16 bg-bg-alt'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='text-center'>
							<div className='bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Truck className='text-text-inverted' size={24} />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Free Shipping</h3>
							<p className='text-text-secondary'>
								Free shipping on orders over $50
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-success rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Shield className='text-text-inverted' size={24} />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Secure Payments</h3>
							<p className='text-text-secondary'>
								100% secure payment processing
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-warning rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<RefreshCw className='text-text-inverted' size={24} />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Easy Returns</h3>
							<p className='text-text-secondary'>30-day return policy</p>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold mb-4'>Shop by Category</h2>
						<p className='text-text-secondary max-w-2xl mx-auto'>
							Explore our wide range of categories and find exactly what
							you&rsquo;re looking for
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{categories.map((category) => (
							<Link
								key={category.name}
								href={`/category/${category.name.toLowerCase()}`}
							>
								<Card className='group cursor-pointer hover:shadow-lg transition-shadow'>
									<div className='aspect-[3/2] overflow-hidden rounded-t-lg relative'>
										<Image
											fill
											src={category.image}
											alt={category.name}
											className='object-cover group-hover:scale-105 transition-transform'
										/>
									</div>
									<CardContent className='p-4'>
										<h3 className='font-semibold mb-1'>{category.name}</h3>
										<p className='text-sm text-text-secondary'>
											{category.count} products
										</p>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section className='py-16 bg-bg-alt'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center mb-12'>
						<div>
							<h2 className='text-3xl font-bold mb-4'>Featured Products</h2>
							<p className='text-text-secondary'>
								Discover our most popular and highly-rated products
							</p>
						</div>
						<Link href='/products'>
							<Button variant='outline'>
								View All
								<ArrowRight className='ml-2' size={16} />
							</Button>
						</Link>
					</div>
					<ProductGrid
						sort='RATING_DESC'
						limit={4}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
					/>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className='py-16'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl font-bold mb-4'>Stay Updated</h2>
					<p className='text-text-secondary mb-8 max-w-2xl mx-auto'>
						Subscribe to our newsletter and be the first to know about new
						products, exclusive deals, and special offers.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
						<input
							type='email'
							placeholder='Enter your email'
							className='flex-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
						/>
						<Button>Subscribe</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

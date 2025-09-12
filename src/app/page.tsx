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
			{/* Hero Section */}
			<section className='bg-gradient-to-r from-primary to-primary-hover text-text-inverted py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold mb-6'>
							Welcome to Nexcart Velocity
						</h1>
						<p className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'>
							Discover amazing products at unbeatable prices. Fast shipping,
							secure payments, and exceptional customer service.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
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

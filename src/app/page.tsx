'use client';

import { ArrowRight, RefreshCw, Shield, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import ProductGrid from '../components/organisms/ProductGrid';
import { Card, CardContent } from '../components/ui/Card';

const categories = [
	{
		name: 'Electronics',
		image: '/api/placeholder?width=300&height=200&category=category',
		count: 1250,
	},
	{
		name: 'Clothing',
		image: '/api/placeholder?width=300&height=200&category=category',
		count: 890,
	},
	{
		name: 'Home & Kitchen',
		image: '/api/placeholder?width=300&height=200&category=category',
		count: 654,
	},
	{
		name: 'Sports & Outdoors',
		image: '/api/placeholder?width=300&height=200&category=category',
		count: 432,
	},
];

const carouselSlides = [
	{
		id: 1,
		title: 'Welcome to Nexcart Velocity',
		description:
			'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.',
		buttonText: 'Shop Now',
		buttonVariant: 'primary',
		gradient: 'from-blue-600 via-blue-700 to-blue-800',
		textColor: 'text-blue-100',
	},
	{
		id: 2,
		title: 'New Arrivals Daily',
		description:
			'Be the first to shop our latest collection. Exclusive deals and trending products updated every day.',
		buttonText: 'View New Arrivals',
		buttonVariant: 'primary',
		gradient: 'from-green-500 to-green-600',
		textColor: 'text-green-100',
	},
	{
		id: 3,
		title: 'Free Shipping on $50+',
		description:
			'Shop now and enjoy free delivery on orders over $50. No codes required, no hidden fees.',
		buttonText: 'Start Shopping',
		buttonVariant: 'primary',
		gradient: 'from-purple-600 to-purple-700',
		textColor: 'text-purple-100',
	},
];

export default function HomePage() {
	const [currentSlide, setCurrentSlide] = useState(0);

	// Auto-advance carousel every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const goToPrevSlide = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? carouselSlides.length - 1 : prev - 1
		);
	};

	const goToNextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
	};

	return (
		<main className='min-h-screen'>
			{/* Hero Carousel Section */}
			<section className='relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'>
				<div className='h-96 md:h-[500px] relative'>
					{/* Background Pattern */}
					<div className='absolute inset-0 opacity-10'>
						<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>
					</div>

					{/* Carousel Slides */}
					{carouselSlides.map((slide, index) => (
						<div
							key={slide.id}
							className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
								index === currentSlide ? 'translate-x-0' : 'translate-x-full'
							}`}
						>
							<div
								className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
							></div>
							<div className='relative h-full flex items-center'>
								<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
									<div className='max-w-lg'>
										<h1 className='text-3xl md:text-5xl font-bold text-white mb-4 leading-tight'>
											{slide.title}
										</h1>
										<p
											className={`text-lg md:text-xl ${slide.textColor} mb-8 leading-relaxed`}
										>
											{slide.description}
										</p>
										<div className='flex flex-col sm:flex-row gap-4'>
											<Button
												size='lg'
												className='bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'
											>
												{slide.buttonText}
												<ArrowRight className='ml-2' size={20} />
											</Button>
											<Button
												size='lg'
												variant='outline'
												className='border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-all duration-200'
											>
												Learn More
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}

					{/* Carousel Controls */}
					<div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3'>
						{carouselSlides.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full transition-colors duration-200 ${
									index === currentSlide ? 'bg-white' : (
										'bg-white/50 hover:bg-white'
									)
								}`}
								aria-label={`Go to slide ${index + 1}`}
							></button>
						))}
					</div>

					{/* Navigation Arrows */}
					<button
						onClick={goToPrevSlide}
						className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200'
						aria-label='Previous slide'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
					</button>
					<button
						onClick={goToNextSlide}
						className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200'
						aria-label='Next slide'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</button>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>
							Why Choose Nexcart?
						</h2>
						<p className='text-gray-600 max-w-2xl mx-auto'>
							We provide exceptional shopping experience with top-notch service
							and quality products
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='text-center group'>
							<div className='bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
								<Truck className='text-white' size={28} />
							</div>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>
								Free Shipping
							</h3>
							<p className='text-gray-600 leading-relaxed'>
								Free shipping on orders over $50 with fast delivery options
							</p>
						</div>
						<div className='text-center group'>
							<div className='bg-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
								<Shield className='text-white' size={28} />
							</div>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>
								Secure Payments
							</h3>
							<p className='text-gray-600 leading-relaxed'>
								100% secure payment processing with multiple payment options
							</p>
						</div>
						<div className='text-center group'>
							<div className='bg-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
								<RefreshCw className='text-white' size={28} />
							</div>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>
								Easy Returns
							</h3>
							<p className='text-gray-600 leading-relaxed'>
								30-day return policy with hassle-free exchange process
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>
							Shop by Category
						</h2>
						<p className='text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							Explore our wide range of categories and find exactly what
							you&rsquo;re looking for
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{categories.map((category) => (
							<Link
								key={category.name}
								href={`/category/${category.name.toLowerCase()}`}
							>
								<Card className='group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1'>
									<div className='aspect-[3/2] overflow-hidden rounded-t-lg relative'>
										<Image
											fill
											src={category.image}
											alt={category.name}
											className='object-cover group-hover:scale-110 transition-transform duration-500'
										/>
										<div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
									</div>
									<CardContent className='p-6'>
										<h3 className='font-bold text-gray-900 mb-2 text-lg'>
											{category.name}
										</h3>
										<p className='text-sm text-gray-600 font-medium'>
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
			<section className='py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center mb-16'>
						<div>
							<h2 className='text-3xl font-bold text-gray-900 mb-4'>
								Featured Products
							</h2>
							<p className='text-gray-600 text-lg leading-relaxed'>
								Discover our most popular and highly-rated products
							</p>
						</div>
						<Link href='/products'>
							<Button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200'>
								View All
								<ArrowRight className='ml-2' size={16} />
							</Button>
						</Link>
					</div>
					<ProductGrid
						sort='RATING_DESC'
						limit={4}
						showFilters={false}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
					/>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className='py-20 bg-gradient-to-r from-blue-600 to-purple-600'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl font-bold text-white mb-4'>Stay Updated</h2>
					<p className='text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed'>
						Subscribe to our newsletter and be the first to know about new
						products, exclusive deals, and special offers.
					</p>
					<form className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
						<label htmlFor='newsletter-email' className='sr-only'>
							Email address for newsletter
						</label>
						<input
							id='newsletter-email'
							type='email'
							placeholder='Enter your email address'
							className='flex-1 px-6 py-4 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500 shadow-lg'
							required
						/>
						<Button
							type='submit'
							className='bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'
						>
							Subscribe
						</Button>
					</form>
					<p className='text-blue-200 text-sm mt-4'>
						We respect your privacy. Unsubscribe at any time.
					</p>
				</div>
			</section>
		</main>
	);
}

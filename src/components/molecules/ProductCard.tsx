import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Button from '../atoms/Button';
import { Card } from '../ui/Card';

export interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviewCount: number;
	image: string;
	images?: string[];
	description: string;
	category: string;
	inStock: boolean;
	isNew?: boolean;
	isOnSale?: boolean;
	variants?: ProductVariant[];
}

export interface ProductVariant {
	id: string;
	name: string;
	value: string;
	available: boolean;
}

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
	onToggleWishlist: (productId: string) => void;
	onQuickView: (product: Product) => void;
	isInWishlist?: boolean;
	className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onAddToCart,
	onToggleWishlist,
	onQuickView,
	isInWishlist = false,
	className,
}) => {
	const discountPercentage =
		product.originalPrice ?
			Math.round(
				((product.originalPrice - product.price) / product.originalPrice) * 100
			)
		:	0;

	return (
		<motion.div
			className={`${className} product-card min-w-0`}
			data-testid='product-card'
			whileHover={{ y: -6, scale: 1.02 }}
			transition={{ type: 'spring', damping: 20, stiffness: 300 }}
		>
			<Card
				className='group overflow-hidden cursor-pointer bg-white border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full'
				padding='none'
			>
				{/* Product Image */}
				<div className='relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover transition-transform duration-500 group-hover:scale-110'
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
					/>

					{/* Badges */}
					<div className='absolute top-3 left-3 flex flex-col gap-2 z-10'>
						{product.isNew && (
							<motion.span
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className='badge badge-new bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm'
							>
								New
							</motion.span>
						)}
						{product.isOnSale && discountPercentage > 0 && (
							<motion.span
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.1 }}
								className='badge badge-sale bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm'
							>
								-{discountPercentage}%
							</motion.span>
						)}
						{!product.inStock && (
							<motion.span
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className='badge badge-out-of-stock bg-gray-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm'
							>
								Out of Stock
							</motion.span>
						)}
					</div>

					{/* Quick Actions */}
					<div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10'>
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
							<Button
								size='sm'
								variant='secondary'
								className='p-2.5 bg-white/95 hover:bg-white shadow-lg hover:shadow-xl rounded-full border border-gray-200 backdrop-blur-sm'
								onClick={(e: React.MouseEvent) => {
									e.stopPropagation();
									onToggleWishlist(product.id);
								}}
								aria-label={
									isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
								}
							>
								<Heart
									size={18}
									className={
										isInWishlist ? 'fill-current text-red-500' : 'text-gray-700'
									}
								/>
							</Button>
						</motion.div>
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
							<Button
								size='sm'
								variant='secondary'
								className='p-2.5 bg-white/95 hover:bg-white shadow-lg hover:shadow-xl rounded-full border border-gray-200 backdrop-blur-sm'
								onClick={(e: React.MouseEvent) => {
									e.stopPropagation();
									onQuickView(product);
								}}
								aria-label='Quick view'
							>
								<ShoppingCart size={18} className='text-gray-700' />
							</Button>
						</motion.div>
					</div>

					{/* Quick Add Overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-center pb-6'>
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.3 }}
						>
							<Button
								size='lg'
								className='bg-white hover:bg-gray-50 text-gray-900 shadow-2xl hover:shadow-3xl transform scale-95 group-hover:scale-100 transition-all duration-300 font-semibold px-8 py-3 rounded-full border-2 border-white/20'
								disabled={!product.inStock}
								onClick={(e: React.MouseEvent) => {
									e.stopPropagation();
									onAddToCart(product);
								}}
								aria-label={`Add ${product.name} to cart`}
							>
								<ShoppingCart size={20} className='mr-2' />
								{product.inStock ? 'Quick Add' : 'Out of Stock'}
							</Button>
						</motion.div>
					</div>
				</div>

				{/* Product Info */}
				<div className='p-5 bg-white flex flex-col'>
					<h3 className='font-bold text-gray-900 mb-3 line-clamp-2 text-lg leading-snug'>
						{product.name}
					</h3>

					{/* Rating */}
					<div className='flex items-center gap-2 mb-4'>
						<div className='flex gap-0.5'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={16}
									className={
										i < Math.floor(product.rating) ?
											'fill-amber-400 text-amber-400'
										:	'text-gray-200'
									}
								/>
							))}
						</div>
						<span className='text-sm text-gray-500 font-medium'>
							({product.reviewCount})
						</span>
					</div>

					{/* Price */}
					<div className='mb-5'>
						<div className='flex items-baseline gap-3 mb-2'>
							<span className='price font-bold text-2xl text-gray-900'>
								${product.price.toFixed(2)}
							</span>
							{product.originalPrice &&
								product.originalPrice > product.price && (
									<>
										<span className='price-discounted text-base text-gray-500 line-through'>
											${product.originalPrice.toFixed(2)}
										</span>
										<span className='text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full'>
											-{discountPercentage}%
										</span>
									</>
								)}
						</div>
						{product.originalPrice && product.originalPrice > product.price && (
							<p className='text-sm text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-lg inline-block'>
								Save ${(product.originalPrice - product.price).toFixed(2)}
							</p>
						)}
					</div>

					{/* Add to Cart Button */}
					<div className='mt-auto'>
						<Button
							className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-base ${
								product.inStock ?
									'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
								:	'bg-gray-200 text-gray-400 cursor-not-allowed'
							}`}
							disabled={!product.inStock}
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								onAddToCart(product);
							}}
						>
							{product.inStock ?
								<>
									<ShoppingCart size={18} className='mr-2' />
									Add to Cart
								</>
							:	'Out of Stock'}
						</Button>
					</div>
				</div>
			</Card>
		</motion.div>
	);
};

export default ProductCard;

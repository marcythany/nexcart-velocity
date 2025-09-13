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
			className={`${className} product-card hover-lift`}
			data-testid='product-card'
			whileHover={{ y: -4 }}
			transition={{ type: 'spring', damping: 15, stiffness: 300 }}
		>
			<Card
				className='group overflow-hidden cursor-pointer bg-white border border-gray-200 hover:shadow-lg transition-all duration-300'
				padding='none'
			>
				{/* Product Image */}
				<div className='relative aspect-square overflow-hidden bg-gray-100'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover transition-transform duration-300 group-hover:scale-105'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>

					{/* Badges */}
					<div className='absolute top-3 left-3 flex flex-col gap-2'>
						{product.isNew && (
							<span className='badge badge-new bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm'>
								New
							</span>
						)}
						{product.isOnSale && discountPercentage > 0 && (
							<span className='badge badge-sale bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm'>
								-{discountPercentage}%
							</span>
						)}
						{!product.inStock && (
							<span className='badge badge-out-of-stock bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm'>
								Out of Stock
							</span>
						)}
					</div>

					{/* Quick Actions */}
					<div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
						<Button
							size='sm'
							variant='secondary'
							className='p-2 bg-white/90 hover:bg-white shadow-md rounded-full'
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								onToggleWishlist(product.id);
							}}
							aria-label={
								isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
							}
						>
							<Heart
								size={16}
								className={
									isInWishlist ? 'fill-current text-red-500' : 'text-gray-600'
								}
							/>
						</Button>
						<Button
							size='sm'
							variant='secondary'
							className='p-2 bg-white/90 hover:bg-white shadow-md rounded-full'
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								onQuickView(product);
							}}
							aria-label='Quick view'
						>
							<ShoppingCart size={16} className='text-gray-600' />
						</Button>
					</div>

					{/* Quick Add Overlay */}
					<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
						<Button
							size='lg'
							className='bg-blue-600 hover:bg-blue-700 text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 font-medium px-6 py-3 rounded-full'
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
					</div>
				</div>

				{/* Product Info */}
				<div className='p-4 bg-white'>
					<h3 className='font-semibold text-gray-900 mb-2 line-clamp-2 text-lg leading-tight'>
						{product.name}
					</h3>

					{/* Rating */}
					<div className='flex items-center gap-1 mb-3'>
						<div className='flex'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={14}
									className={
										i < Math.floor(product.rating) ?
											'fill-yellow-400 text-yellow-400'
										:	'text-gray-300'
									}
								/>
							))}
						</div>
						<span className='text-sm text-gray-500 ml-1'>
							({product.reviewCount})
						</span>
					</div>

					{/* Price */}
					<div className='mb-4'>
						<div className='flex items-baseline gap-2'>
							<span className='price font-bold text-xl text-gray-900'>
								${product.price.toFixed(2)}
							</span>
							{product.originalPrice &&
								product.originalPrice > product.price && (
									<>
										<span className='price-discounted text-sm text-gray-500 line-through'>
											${product.originalPrice.toFixed(2)}
										</span>
										<span className='text-sm font-medium text-green-600'>
											({discountPercentage}% off)
										</span>
									</>
								)}
						</div>
						{product.originalPrice && product.originalPrice > product.price && (
							<p className='text-xs text-green-600 font-medium mt-1'>
								Save ${(product.originalPrice - product.price).toFixed(2)}
							</p>
						)}
					</div>

					{/* Add to Cart Button */}
					<Button
						className={`w-full font-medium py-2.5 rounded-lg transition-all duration-200 ${
							product.inStock ?
								'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
							:	'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
						disabled={!product.inStock}
						onClick={(e: React.MouseEvent) => {
							e.stopPropagation();
							onAddToCart(product);
						}}
					>
						{product.inStock ? 'Add to Cart' : 'Out of Stock'}
					</Button>
				</div>
			</Card>
		</motion.div>
	);
};

export default ProductCard;

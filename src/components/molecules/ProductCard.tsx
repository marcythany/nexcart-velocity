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
			className={className}
			data-testid='product-card'
			whileHover={{ y: -4 }}
			transition={{ type: 'spring', damping: 15, stiffness: 300 }}
		>
			<Card className='group overflow-hidden cursor-pointer' padding='none'>
				{/* Product Image */}
				<div className='relative aspect-square overflow-hidden bg-bg-alt'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover transition-transform duration-300 group-hover:scale-105'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>

					{/* Badges */}
					<div className='absolute top-2 left-2 flex flex-col gap-1'>
						{product.isNew && (
							<span className='bg-success text-text-inverted text-xs px-2 py-1 rounded'>
								New
							</span>
						)}
						{product.isOnSale && discountPercentage > 0 && (
							<span className='bg-error text-text-inverted text-xs px-2 py-1 rounded'>
								-{discountPercentage}%
							</span>
						)}
						{!product.inStock && (
							<span className='bg-text-secondary text-text-inverted text-xs px-2 py-1 rounded'>
								Out of Stock
							</span>
						)}
					</div>

					{/* Quick Actions */}
					<div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
						<Button
							size='sm'
							variant='secondary'
							className='p-2'
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
								className={isInWishlist ? 'fill-current text-error' : ''}
							/>
						</Button>
						<Button
							size='sm'
							variant='secondary'
							className='p-2'
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								onQuickView(product);
							}}
							aria-label='Quick view'
						>
							<ShoppingCart size={16} />
						</Button>
					</div>

					{/* Quick Add Overlay */}
					<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
						<Button
							size='lg'
							className='bg-primary hover:bg-primary-hover text-text-inverted shadow-lg transform scale-90 group-hover:scale-100 transition-transform'
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
				<div className='p-4'>
					<h3 className='font-semibold text-text-primary mb-1 line-clamp-2'>
						{product.name}
					</h3>

					{/* Rating */}
					<div className='flex items-center gap-1 mb-2'>
						<div className='flex'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={14}
									className={
										i < Math.floor(product.rating) ?
											'fill-warning text-warning'
										:	'text-text-secondary'
									}
								/>
							))}
						</div>
						<span className='text-sm text-text-secondary'>
							({product.reviewCount})
						</span>
					</div>

					{/* Price */}
					<div className='mb-3'>
						<div className='flex items-baseline gap-2'>
							<span className='font-bold text-xl text-text-primary'>
								${product.price.toFixed(2)}
							</span>
							{product.originalPrice &&
								product.originalPrice > product.price && (
									<>
										<span className='text-sm text-text-secondary line-through'>
											${product.originalPrice.toFixed(2)}
										</span>
										<span className='text-sm font-medium text-success'>
											({discountPercentage}% off)
										</span>
									</>
								)}
						</div>
						{product.originalPrice && product.originalPrice > product.price && (
							<p className='text-xs text-success font-medium mt-1'>
								Save ${(product.originalPrice - product.price).toFixed(2)}
							</p>
						)}
					</div>

					{/* Add to Cart Button */}
					<Button
						className='w-full'
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

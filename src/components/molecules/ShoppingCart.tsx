import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import Button from '../atoms/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export interface CartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	variant?: string;
}

interface ShoppingCartProps {
	items: CartItem[];
	onUpdateQuantity: (itemId: string, quantity: number) => void;
	onRemoveItem: (itemId: string) => void;
	onClearCart: () => void;
	className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
	items,
	onUpdateQuantity,
	onRemoveItem,
	onClearCart,
	className,
}) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const tax = subtotal * 0.08; // 8% tax
	const shipping = subtotal > 50 ? 0 : 9.99;
	const total = subtotal + tax + shipping;

	if (items.length === 0) {
		return (
			<Card className={className}>
				<CardContent className='text-center py-12'>
					<div className='text-6xl mb-4'>🛒</div>
					<h3 className='text-lg font-semibold mb-2'>Your cart is empty</h3>
					<p className='text-text-secondary mb-4'>
						Add some products to get started
					</p>
					<Button>Continue Shopping</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={className}>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<CardTitle>Shopping Cart ({items.length})</CardTitle>
					<Button
						variant='ghost'
						size='sm'
						onClick={onClearCart}
						className='text-error hover:text-error'
					>
						Clear Cart
					</Button>
				</div>
			</CardHeader>
			<CardContent className='space-y-4'>
				{/* Cart Items */}
				<div className='space-y-4'>
					{items.map((item) => (
						<div
							key={item.id}
							className='flex gap-4 p-4 border border-border rounded-lg'
						>
							{/* Product Image */}
							<div className='flex-shrink-0'>
								<img
									src={item.image}
									alt={item.name}
									className='w-16 h-16 object-cover rounded'
								/>
							</div>

							{/* Product Details */}
							<div className='flex-1 min-w-0'>
								<h4 className='font-medium text-text-primary truncate'>
									{item.name}
								</h4>
								{item.variant && (
									<p className='text-sm text-text-secondary'>
										Variant: {item.variant}
									</p>
								)}
								<p className='text-sm font-medium text-text-primary'>
									${item.price.toFixed(2)} each
								</p>
							</div>

							{/* Quantity Controls */}
							<div className='flex items-center gap-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
									disabled={item.quantity <= 1}
									className='p-1'
								>
									<Minus size={16} />
								</Button>
								<span className='w-8 text-center font-medium'>
									{item.quantity}
								</span>
								<Button
									variant='outline'
									size='sm'
									onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
									className='p-1'
								>
									<Plus size={16} />
								</Button>
							</div>

							{/* Item Total & Remove */}
							<div className='flex flex-col items-end gap-2'>
								<span className='font-medium'>
									${(item.price * item.quantity).toFixed(2)}
								</span>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => onRemoveItem(item.id)}
									className='text-error hover:text-error p-1'
								>
									<Trash2 size={16} />
								</Button>
							</div>
						</div>
					))}
				</div>

				{/* Order Summary */}
				<div className='border-t border-border pt-4 space-y-2'>
					<div className='flex justify-between'>
						<span>Subtotal:</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div className='flex justify-between'>
						<span>Tax:</span>
						<span>${tax.toFixed(2)}</span>
					</div>
					<div className='flex justify-between'>
						<span>Shipping:</span>
						<span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
					</div>
					<div className='flex justify-between font-bold text-lg border-t border-border pt-2'>
						<span>Total:</span>
						<span>${total.toFixed(2)}</span>
					</div>
				</div>

				{/* Checkout Button */}
				<Button className='w-full' size='lg'>
					Proceed to Checkout
				</Button>
			</CardContent>
		</Card>
	);
};

export default ShoppingCart;

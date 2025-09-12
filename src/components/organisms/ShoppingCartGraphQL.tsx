import { gql, useMutation, useQuery } from '@apollo/client';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import Button from '../atoms/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// GraphQL Queries and Mutations
const GET_CART = gql`
	query GetCart {
		cart {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
		}
	}
`;

const UPDATE_CART_ITEM = gql`
	mutation UpdateCartItem($input: UpdateCartItemInput!) {
		updateCartItem(input: $input) {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
		}
	}
`;

const REMOVE_FROM_CART = gql`
	mutation RemoveFromCart($itemId: ID!) {
		removeFromCart(itemId: $itemId) {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
		}
	}
`;

const CLEAR_CART = gql`
	mutation ClearCart {
		clearCart {
			id
			items {
				id
				productId
				name
				price
				quantity
				image
				variant
			}
			total
			subtotal
			tax
			shipping
		}
	}
`;

interface ShoppingCartGraphQLProps {
	className?: string;
}

const ShoppingCartGraphQL: React.FC<ShoppingCartGraphQLProps> = ({
	className,
}) => {
	const { loading, error, data, refetch } = useQuery(GET_CART);

	const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM);
	const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
	const [clearCartMutation] = useMutation(CLEAR_CART);

	// Loading state
	if (loading) {
		return (
			<Card className={className}>
				<CardHeader>
					<div className='animate-pulse h-6 bg-gray-300 rounded w-1/3'></div>
				</CardHeader>
				<CardContent className='space-y-4'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className='animate-pulse flex gap-4'>
							<div className='w-16 h-16 bg-gray-300 rounded'></div>
							<div className='flex-1 space-y-2'>
								<div className='h-4 bg-gray-300 rounded'></div>
								<div className='h-4 bg-gray-300 rounded w-3/4'></div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		);
	}

	// Error state
	if (error) {
		return (
			<Card className={className}>
				<CardContent className='text-center py-12'>
					<div className='text-6xl mb-4'>😵</div>
					<h3 className='text-lg font-semibold mb-2'>Failed to load cart</h3>
					<p className='text-gray-600 mb-4'>
						{error.message || 'Something went wrong while loading your cart.'}
					</p>
					<Button onClick={() => refetch()}>Try Again</Button>
				</CardContent>
			</Card>
		);
	}

	const cart = data?.cart;
	const items = cart?.items || [];

	// Empty cart
	if (!cart || items.length === 0) {
		return (
			<Card className={className}>
				<CardContent className='text-center py-12'>
					<div className='text-6xl mb-4'>🛒</div>
					<h3 className='text-lg font-semibold mb-2'>Your cart is empty</h3>
					<p className='text-gray-600 mb-4'>Add some products to get started</p>
					<Button>Continue Shopping</Button>
				</CardContent>
			</Card>
		);
	}

	// Event handlers
	const handleUpdateQuantity = async (itemId: string, quantity: number) => {
		try {
			await updateCartItemMutation({
				variables: {
					input: {
						itemId,
						quantity,
					},
				},
				refetchQueries: [{ query: GET_CART }],
			});
		} catch (error) {
			console.error('Failed to update cart item:', error);
		}
	};

	const handleRemoveItem = async (itemId: string) => {
		try {
			await removeFromCartMutation({
				variables: { itemId },
				refetchQueries: [{ query: GET_CART }],
			});
		} catch (error) {
			console.error('Failed to remove cart item:', error);
		}
	};

	const handleClearCart = async () => {
		try {
			await clearCartMutation({
				refetchQueries: [{ query: GET_CART }],
			});
		} catch (error) {
			console.error('Failed to clear cart:', error);
		}
	};

	return (
		<Card className={className}>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<CardTitle>Shopping Cart ({items.length})</CardTitle>
					<Button
						variant='ghost'
						size='sm'
						onClick={handleClearCart}
						className='text-red-600 hover:text-red-800'
					>
						Clear Cart
					</Button>
				</div>
			</CardHeader>
			<CardContent className='space-y-4'>
				{/* Cart Items */}
				<div className='space-y-4'>
					{items.map(
						(item: {
							id: string;
							productId: string;
							name: string;
							price: number;
							quantity: number;
							image: string;
							variant?: string;
						}) => (
							<div
								key={item.id}
								className='flex gap-4 p-4 border border-gray-200 rounded-lg'
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
									<h4 className='font-medium text-gray-900 truncate'>
										{item.name}
									</h4>
									{item.variant && (
										<p className='text-sm text-gray-600'>
											Variant: {item.variant}
										</p>
									)}
									<p className='text-sm font-medium text-gray-900'>
										${item.price.toFixed(2)} each
									</p>
								</div>

								{/* Quantity Controls */}
								<div className='flex items-center gap-2'>
									<Button
										variant='outline'
										size='sm'
										onClick={() =>
											handleUpdateQuantity(item.id, item.quantity - 1)
										}
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
										onClick={() =>
											handleUpdateQuantity(item.id, item.quantity + 1)
										}
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
										onClick={() => handleRemoveItem(item.id)}
										className='text-red-600 hover:text-red-800 p-1'
									>
										<Trash2 size={16} />
									</Button>
								</div>
							</div>
						)
					)}
				</div>

				{/* Order Summary */}
				<div className='border-t border-gray-200 pt-4 space-y-2'>
					<div className='flex justify-between'>
						<span>Subtotal:</span>
						<span>${cart.subtotal?.toFixed(2) || '0.00'}</span>
					</div>
					<div className='flex justify-between'>
						<span>Tax:</span>
						<span>${cart.tax?.toFixed(2) || '0.00'}</span>
					</div>
					<div className='flex justify-between'>
						<span>Shipping:</span>
						<span>
							{cart.shipping === 0 ? 'Free' : `$${cart.shipping?.toFixed(2)}`}
						</span>
					</div>
					<div className='flex justify-between font-bold text-lg border-t border-gray-200 pt-2'>
						<span>Total:</span>
						<span>${cart.total?.toFixed(2) || '0.00'}</span>
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

export default ShoppingCartGraphQL;

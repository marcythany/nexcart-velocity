'use client';

import Button from '@/components/atoms/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderConfirmationPage() {
	const params = useParams();
	const orderId = params.id as string;

	// In a real app, you'd fetch the order details from the API
	const mockOrder = {
		id: orderId,
		items: [
			{ name: 'Product 1', quantity: 2, price: 25.99 },
			{ name: 'Product 2', quantity: 1, price: 49.99 },
		],
		total: 101.97,
		shippingAddress: {
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
			zipCode: '10001',
			country: 'United States',
		},
	};

	return (
		<main className='min-h-screen bg-gray-50 py-8'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Success Message */}
				<div className='text-center mb-8'>
					<div className='text-6xl mb-4'>✅</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Order Confirmed!
					</h1>
					<p className='text-gray-600'>
						Thank you for your purchase. Your order has been successfully
						placed.
					</p>
				</div>

				{/* Order Details */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Order Summary */}
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div className='flex justify-between'>
									<span className='font-medium'>Order Number:</span>
									<span>#{orderId}</span>
								</div>
								<div className='flex justify-between'>
									<span className='font-medium'>Date:</span>
									<span>{new Date().toLocaleDateString()}</span>
								</div>
								<div className='flex justify-between'>
									<span className='font-medium'>Status:</span>
									<span className='text-green-600'>Processing</span>
								</div>
							</div>

							<hr className='my-4' />

							<div className='space-y-2'>
								<h4 className='font-medium mb-2'>Items Ordered:</h4>
								{mockOrder.items.map((item, index) => (
									<div key={index} className='flex justify-between text-sm'>
										<span>
											{item.name} x {item.quantity}
										</span>
										<span>${(item.price * item.quantity).toFixed(2)}</span>
									</div>
								))}
								<hr className='my-2' />
								<div className='flex justify-between font-bold'>
									<span>Total:</span>
									<span>${mockOrder.total.toFixed(2)}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Shipping Information */}
					<Card>
						<CardHeader>
							<CardTitle>Shipping Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-2'>
								<p>{mockOrder.shippingAddress.street}</p>
								<p>
									{mockOrder.shippingAddress.city},{' '}
									{mockOrder.shippingAddress.state}{' '}
									{mockOrder.shippingAddress.zipCode}
								</p>
								<p>{mockOrder.shippingAddress.country}</p>
							</div>

							<hr className='my-4' />

							<div className='space-y-2'>
								<h4 className='font-medium mb-2'>Shipping Updates</h4>
								<p className='text-sm text-gray-600'>
									You will receive an email confirmation with tracking
									information once your order ships.
								</p>
								<p className='text-sm text-gray-600'>
									Estimated delivery: 3-5 business days
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Actions */}
				<div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
					<Link href='/'>
						<Button variant='outline'>Continue Shopping</Button>
					</Link>
					<Link href='/account/orders'>
						<Button>View Order History</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}

'use client';

import Button from '@/components/atoms/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddressForm from '../molecules/AddressForm';
import PaymentForm from '../molecules/PaymentForm';
import { CartItem } from '../molecules/ShoppingCart';

interface CheckoutFormProps {
	items: CartItem[];
	totalPrice: number;
}

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

interface PaymentData {
	paymentMethod: string;
}

interface CheckoutData {
	shippingAddress: Address;
	paymentMethod: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ items, totalPrice }) => {
	const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
	const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({});
	const [isProcessing, setIsProcessing] = useState(false);
	const router = useRouter();
	const { clearCart } = useCartStore();

	const steps = [
		{ id: 'shipping', title: 'Shipping Address' },
		{ id: 'payment', title: 'Payment' },
		{ id: 'review', title: 'Review Order' },
	];

	const handleNext = () => {
		if (currentStep === 'shipping') setCurrentStep('payment');
		else if (currentStep === 'payment') setCurrentStep('review');
	};

	const handleBack = () => {
		if (currentStep === 'payment') setCurrentStep('shipping');
		else if (currentStep === 'review') setCurrentStep('payment');
	};

	const handleSubmit = async () => {
		if (!checkoutData.shippingAddress || !checkoutData.paymentMethod) {
			alert(
				'Please complete all required information before placing the order.'
			);
			return;
		}

		setIsProcessing(true);
		try {
			// Simulate order creation
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Clear cart and redirect to confirmation
			clearCart();
			router.push('/order/123'); // Mock order ID
		} catch (error) {
			console.error('Checkout failed:', error);
		} finally {
			setIsProcessing(false);
		}
	};

	const updateCheckoutData = (data: Partial<CheckoutData>) => {
		setCheckoutData((prev) => ({ ...prev, ...data }));
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
			{/* Main Content */}
			<div className='lg:col-span-2'>
				{/* Progress Indicator */}
				<div className='mb-8'>
					<div className='flex items-center justify-between'>
						{steps.map((step, index) => (
							<div key={step.id} className='flex items-center'>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
										steps.findIndex((s) => s.id === currentStep) >= index ?
											'bg-blue-600 text-white'
										:	'bg-gray-200 text-gray-600'
									}`}
								>
									{index + 1}
								</div>
								<span className='ml-2 text-sm font-medium'>{step.title}</span>
								{index < steps.length - 1 && (
									<div className='w-12 h-px bg-gray-300 mx-4' />
								)}
							</div>
						))}
					</div>
				</div>

				{/* Step Content */}
				<Card>
					<CardHeader>
						<CardTitle>
							{steps.find((s) => s.id === currentStep)?.title}
						</CardTitle>
					</CardHeader>
					<CardContent>
						{currentStep === 'shipping' && (
							<AddressForm
								type='shipping'
								onSubmit={(address: Address) => {
									updateCheckoutData({ shippingAddress: address });
									handleNext();
								}}
							/>
						)}
						{currentStep === 'payment' && (
							<PaymentForm
								onSubmit={(paymentData: PaymentData) => {
									updateCheckoutData(paymentData);
									handleNext();
								}}
							/>
						)}
						{currentStep === 'review' && (
							<div className='space-y-6'>
								{/* Order Summary */}
								<div>
									<h3 className='text-lg font-medium mb-4'>Order Summary</h3>
									<div className='space-y-2'>
										{items.map((item) => (
											<div key={item.id} className='flex justify-between'>
												<span>
													{item.name} x {item.quantity}
												</span>
												<span>${(item.price * item.quantity).toFixed(2)}</span>
											</div>
										))}
										<div className='border-t pt-2 mt-4'>
											<div className='flex justify-between font-bold'>
												<span>Total</span>
												<span>${totalPrice.toFixed(2)}</span>
											</div>
										</div>
									</div>
								</div>

								{/* Addresses */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div>
										<h4 className='font-medium mb-2'>
											Shipping & Billing Address
										</h4>
										<div className='text-sm text-gray-600'>
											{checkoutData.shippingAddress && (
												<>
													<p>{checkoutData.shippingAddress.street}</p>
													<p>
														{checkoutData.shippingAddress.city},{' '}
														{checkoutData.shippingAddress.state}{' '}
														{checkoutData.shippingAddress.zipCode}
													</p>
													<p>{checkoutData.shippingAddress.country}</p>
												</>
											)}
										</div>
									</div>
									<div>
										<h4 className='font-medium mb-2'>Payment Method</h4>
										<div className='text-sm text-gray-600'>
											{checkoutData.paymentMethod && (
												<p>{checkoutData.paymentMethod}</p>
											)}
										</div>
									</div>
								</div>

								{/* Submit Button */}
								<Button
									onClick={handleSubmit}
									disabled={isProcessing}
									className='w-full'
									size='lg'
								>
									{isProcessing ? 'Processing...' : 'Place Order'}
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Navigation */}
				<div className='flex justify-between mt-6'>
					{currentStep !== 'shipping' && (
						<Button variant='outline' onClick={handleBack}>
							Back
						</Button>
					)}
				</div>
			</div>

			{/* Sidebar */}
			<div className='lg:col-span-1'>
				<Card>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							{items.map((item) => (
								<div key={item.id} className='flex justify-between text-sm'>
									<span>
										{item.name} x {item.quantity}
									</span>
									<span>${(item.price * item.quantity).toFixed(2)}</span>
								</div>
							))}
							<div className='border-t pt-2 mt-4'>
								<div className='flex justify-between font-bold'>
									<span>Total</span>
									<span>${totalPrice.toFixed(2)}</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CheckoutForm;

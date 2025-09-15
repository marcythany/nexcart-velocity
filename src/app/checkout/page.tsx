'use client';

import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CheckoutForm from '../../components/organisms/CheckoutForm';

export default function CheckoutPage() {
	const { items, totalPrice } = useCartStore();
	const router = useRouter();

	// Redirect to home if cart is empty
	useEffect(() => {
		if (items.length === 0) {
			router.push('/');
		}
	}, [items, router]);

	if (items.length === 0) {
		return null; // Prevent flash of empty checkout
	}

	return (
		<main className='min-h-screen bg-gray-50 py-8'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Checkout</h1>
					<p className='text-gray-600'>Complete your purchase securely</p>
				</div>

				<CheckoutForm items={items} totalPrice={totalPrice} />
			</div>
		</main>
	);
}

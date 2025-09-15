'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';

interface PaymentData {
	paymentMethod: string;
}

interface PaymentFormProps {
	onSubmit: (paymentData: PaymentData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
	const [paymentMethod, setPaymentMethod] = useState('credit-card');
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvv, setCvv] = useState('');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validateForm = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (paymentMethod === 'credit-card') {
			if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
			if (!expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
			if (!cvv.trim()) newErrors.cvv = 'CVV is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit({ paymentMethod });
		}
	};

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || '';
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(' ');
		} else {
			return v;
		}
	};

	const formatExpiryDate = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		if (v.length >= 2) {
			return v.substring(0, 2) + '/' + v.substring(2, 4);
		}
		return v;
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			{/* Payment Method Selection */}
			<div>
				<label className='block text-sm font-medium mb-3'>Payment Method</label>
				<div className='space-y-2'>
					<label className='flex items-center'>
						<input
							type='radio'
							value='credit-card'
							checked={paymentMethod === 'credit-card'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mr-3'
						/>
						Credit Card
					</label>
					<label className='flex items-center'>
						<input
							type='radio'
							value='paypal'
							checked={paymentMethod === 'paypal'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mr-3'
						/>
						PayPal
					</label>
					<label className='flex items-center'>
						<input
							type='radio'
							value='apple-pay'
							checked={paymentMethod === 'apple-pay'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mr-3'
						/>
						Apple Pay
					</label>
				</div>
			</div>

			{/* Credit Card Form */}
			{paymentMethod === 'credit-card' && (
				<div className='space-y-4'>
					<div>
						<label
							htmlFor='card-number'
							className='block text-sm font-medium mb-1'
						>
							Card Number
						</label>
						<Input
							id='card-number'
							value={cardNumber}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setCardNumber(formatCardNumber(e.target.value))
							}
							placeholder='1234 5678 9012 3456'
							maxLength={19}
							className={errors.cardNumber ? 'border-red-500' : ''}
						/>
						{errors.cardNumber && (
							<p className='text-red-500 text-sm mt-1'>{errors.cardNumber}</p>
						)}
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label
								htmlFor='expiry-date'
								className='block text-sm font-medium mb-1'
							>
								Expiry Date
							</label>
							<Input
								id='expiry-date'
								value={expiryDate}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setExpiryDate(formatExpiryDate(e.target.value))
								}
								placeholder='MM/YY'
								maxLength={5}
								className={errors.expiryDate ? 'border-red-500' : ''}
							/>
							{errors.expiryDate && (
								<p className='text-red-500 text-sm mt-1'>{errors.expiryDate}</p>
							)}
						</div>

						<div>
							<label htmlFor='cvv' className='block text-sm font-medium mb-1'>
								CVV
							</label>
							<Input
								id='cvv'
								value={cvv}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setCvv(e.target.value.replace(/[^0-9]/g, ''))
								}
								placeholder='123'
								maxLength={4}
								className={errors.cvv ? 'border-red-500' : ''}
							/>
							{errors.cvv && (
								<p className='text-red-500 text-sm mt-1'>{errors.cvv}</p>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Alternative Payment Methods */}
			{paymentMethod === 'paypal' && (
				<div className='text-center p-6 border border-gray-200 rounded-lg'>
					<p className='text-gray-600 mb-4'>
						You will be redirected to PayPal to complete your payment.
					</p>
					<div className='text-2xl'>🅿️</div>
				</div>
			)}

			{paymentMethod === 'apple-pay' && (
				<div className='text-center p-6 border border-gray-200 rounded-lg'>
					<p className='text-gray-600 mb-4'>
						Complete your purchase with Apple Pay.
					</p>
					<div className='text-2xl'>🍎</div>
				</div>
			)}

			<Button type='submit' className='w-full'>
				Continue to Review
			</Button>
		</form>
	);
};

export default PaymentForm;

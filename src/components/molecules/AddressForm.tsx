'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';

interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

interface AddressFormProps {
	type: 'shipping' | 'billing';
	onSubmit: (address: Address) => void;
	initialData?: Partial<Address>;
}

const AddressForm: React.FC<AddressFormProps> = ({
	type,
	onSubmit,
	initialData,
}) => {
	const [formData, setFormData] = useState<Address>({
		street: initialData?.street || '',
		city: initialData?.city || '',
		state: initialData?.state || '',
		zipCode: initialData?.zipCode || '',
		country: initialData?.country || '',
	});

	const [errors, setErrors] = useState<Partial<Address>>({});

	const validateForm = (): boolean => {
		const newErrors: Partial<Address> = {};

		if (!formData.street.trim())
			newErrors.street = 'Street address is required';
		if (!formData.city.trim()) newErrors.city = 'City is required';
		if (!formData.state.trim()) newErrors.state = 'State is required';
		if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
		if (!formData.country.trim()) newErrors.country = 'Country is required';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	const handleChange = (field: keyof Address, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label
					htmlFor={`${type}-street`}
					className='block text-sm font-medium mb-1'
				>
					Street Address
				</label>
				<Input
					id={`${type}-street`}
					value={formData.street}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('street', e.target.value)
					}
					placeholder='123 Main St'
					className={errors.street ? 'border-red-500' : ''}
				/>
				{errors.street && (
					<p className='text-red-500 text-sm mt-1'>{errors.street}</p>
				)}
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label
						htmlFor={`${type}-city`}
						className='block text-sm font-medium mb-1'
					>
						City
					</label>
					<Input
						id={`${type}-city`}
						value={formData.city}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('city', e.target.value)
						}
						placeholder='New York'
						className={errors.city ? 'border-red-500' : ''}
					/>
					{errors.city && (
						<p className='text-red-500 text-sm mt-1'>{errors.city}</p>
					)}
				</div>

				<div>
					<label
						htmlFor={`${type}-state`}
						className='block text-sm font-medium mb-1'
					>
						State
					</label>
					<Input
						id={`${type}-state`}
						value={formData.state}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('state', e.target.value)
						}
						placeholder='NY'
						className={errors.state ? 'border-red-500' : ''}
					/>
					{errors.state && (
						<p className='text-red-500 text-sm mt-1'>{errors.state}</p>
					)}
				</div>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label
						htmlFor={`${type}-zipCode`}
						className='block text-sm font-medium mb-1'
					>
						ZIP Code
					</label>
					<Input
						id={`${type}-zipCode`}
						value={formData.zipCode}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('zipCode', e.target.value)
						}
						placeholder='10001'
						className={errors.zipCode ? 'border-red-500' : ''}
					/>
					{errors.zipCode && (
						<p className='text-red-500 text-sm mt-1'>{errors.zipCode}</p>
					)}
				</div>

				<div>
					<label
						htmlFor={`${type}-country`}
						className='block text-sm font-medium mb-1'
					>
						Country
					</label>
					<Input
						id={`${type}-country`}
						value={formData.country}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('country', e.target.value)
						}
						placeholder='United States'
						className={errors.country ? 'border-red-500' : ''}
					/>
					{errors.country && (
						<p className='text-red-500 text-sm mt-1'>{errors.country}</p>
					)}
				</div>
			</div>

			<Button type='submit' className='w-full'>
				Continue to {type === 'shipping' ? 'Payment' : 'Review'}
			</Button>
		</form>
	);
};

export default AddressForm;

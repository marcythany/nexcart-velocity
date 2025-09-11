import clsx from 'clsx';
import React from 'react';

type InputVariant = 'default' | 'error' | 'success';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	variant?: InputVariant;
	size?: InputSize;
	label?: string;
	helperText?: string;
	error?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = 'default',
			size = 'md',
			className,
			label,
			helperText,
			error,
			startIcon,
			endIcon,
			id,
			...props
		},
		ref
	) => {
		const generatedId = React.useId();
		const inputId = id || generatedId;
		const hasError = error || variant === 'error';

		return (
			<div className='space-y-1'>
				{label && (
					<label
						htmlFor={inputId}
						className='block text-sm font-medium text-text-primary'
					>
						{label}
					</label>
				)}
				<div className='relative'>
					{startIcon && (
						<div className='absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary'>
							{startIcon}
						</div>
					)}
					<input
						ref={ref}
						id={inputId}
						className={clsx(
							'w-full rounded-md border bg-bg-input px-3 py-2 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 transition-colors',
							{
								// Variants
								'border-border focus:border-primary focus:ring-primary/20':
									variant === 'default' && !hasError,
								'border-error focus:border-error focus:ring-error/20': hasError,
								'border-success focus:border-success focus:ring-success/20':
									variant === 'success',

								// Sizes
								'text-sm': size === 'sm',
								'text-base': size === 'md',
								'text-lg': size === 'lg',

								// Icon padding
								'pl-10': startIcon,
								'pr-10': endIcon,
							},
							className
						)}
						aria-invalid={hasError ? 'true' : 'false'}
						aria-describedby={
							error ? `${inputId}-error`
							: helperText ?
								`${inputId}-helper`
							:	undefined
						}
						{...props}
					/>
					{endIcon && (
						<div className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary'>
							{endIcon}
						</div>
					)}
				</div>
				{error && (
					<p
						id={`${inputId}-error`}
						className='text-sm text-error'
						role='alert'
					>
						{error}
					</p>
				)}
				{helperText && !error && (
					<p id={`${inputId}-helper`} className='text-sm text-text-secondary'>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
export default Input;

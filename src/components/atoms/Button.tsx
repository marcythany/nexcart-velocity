import clsx from 'clsx';
import { Loader2, type LucideIcon } from 'lucide-react';
import React from 'react';

type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'text'
	| 'tactile';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	icon?: LucideIcon;
	iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			className,
			children,
			isLoading,
			icon: Icon,
			iconPosition = 'left',
			...props
		},
		ref
	) => {
		const renderIcon = () => {
			if (isLoading) {
				return <Loader2 className='animate-spin' aria-hidden='true' />;
			}
			return Icon ? <Icon aria-hidden='true' /> : null;
		};

		const iconElement = renderIcon();

		return (
			<button
				ref={ref}
				className={clsx(
					'btn focus-ring transition-transform duration-300 ease-snappy',
					{
						// Primary variant (solid color)
						'bg-primary text-text-inverted hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0':
							variant === 'primary',

						// Secondary variant
						'bg-secondary text-text-inverted': variant === 'secondary',

						// Outline variant
						'border border-border bg-transparent hover:bg-bg-alt':
							variant === 'outline',

						// Ghost variant
						'bg-transparent hover:bg-bg-alt': variant === 'ghost',

						// Text variant
						'bg-transparent hover:underline': variant === 'text',

						// New tactile variant with depth
						'bg-bg-card border border-border shadow-tactile hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-tactile':
							variant === 'tactile',

						// Sizes
						'text-sm px-3 py-1.5': size === 'sm',
						'px-4 py-2': size === 'md',
						'text-lg px-5 py-2.5': size === 'lg',

						// Icon positioning
						'flex-row-reverse': iconPosition === 'right',
					},
					className
				)}
				aria-busy={isLoading}
				{...props}
			>
				{iconElement && (
					<span
						className={clsx('inline-flex', {
							'mr-2': children && iconPosition === 'left',
							'ml-2': children && iconPosition === 'right',
						})}
					>
						{iconElement}
					</span>
				)}
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
export default Button;

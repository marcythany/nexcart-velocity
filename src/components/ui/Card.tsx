import clsx from 'clsx';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'elevated' | 'outlined';
	padding?: 'none' | 'sm' | 'md' | 'lg';
	children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	(
		{ variant = 'default', padding = 'md', className, children, ...props },
		ref
	) => {
		return (
			<div
				ref={ref}
				className={clsx(
					'rounded-lg bg-bg-card transition-shadow',
					{
						// Variants
						'shadow-sm': variant === 'default',
						'shadow-lg': variant === 'elevated',
						'border border-border shadow-sm': variant === 'outlined',

						// Padding
						'p-0': padding === 'none',
						'p-3': padding === 'sm',
						'p-4': padding === 'md',
						'p-6': padding === 'lg',
					},
					className
				)}
				{...props}
			>
				{children}
			</div>
		);
	}
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, children, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx('flex flex-col space-y-1.5 p-6', className)}
			{...props}
		>
			{children}
		</div>
	)
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	children: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
	({ className, children, ...props }, ref) => (
		<h3
			ref={ref}
			className={clsx(
				'text-2xl font-semibold leading-none tracking-tight',
				className
			)}
			{...props}
		>
			{children}
		</h3>
	)
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
}

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	CardDescriptionProps
>(({ className, children, ...props }, ref) => (
	<p
		ref={ref}
		className={clsx('text-sm text-text-secondary', className)}
		{...props}
	>
		{children}
	</p>
));

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ className, children, ...props }, ref) => (
		<div ref={ref} className={clsx('p-6 pt-0', className)} {...props}>
			{children}
		</div>
	)
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, children, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx('flex items-center p-6 pt-0', className)}
			{...props}
		>
			{children}
		</div>
	)
);

CardFooter.displayName = 'CardFooter';

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
export default Card;

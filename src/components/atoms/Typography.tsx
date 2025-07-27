import clsx from 'clsx';
import React from 'react';

interface TypographyProps {
	variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
	className?: string;
	children: React.ReactNode;
	as?: React.ElementType;
}

export const Typography = ({
	variant = 'body',
	className,
	children,
	as: Component = 'p',
	...props
}: TypographyProps) => {
	const baseClasses = 'text-balance max-w-prose';

	const variantClasses = {
		h1: 'text-3xl md:text-4xl font-display font-bold',
		h2: 'text-2xl md:text-3xl font-display font-bold',
		h3: 'text-xl md:text-2xl font-bold',
		body: 'text-base leading-normal',
		caption: 'text-sm text-text-muted',
	};

	return (
		<Component
			className={clsx(baseClasses, variantClasses[variant], className)}
			{...props}
		>
			{children}
		</Component>
	);
};

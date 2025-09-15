'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbProps {
	items?: BreadcrumbItem[];
	className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
	const pathname = usePathname();

	// Auto-generate breadcrumbs from pathname if not provided
	const generateBreadcrumbs = (): BreadcrumbItem[] => {
		if (items) return items;

		const pathSegments = pathname.split('/').filter(Boolean);
		const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

		let currentPath = '';

		// Handle category pages specially - skip the "category" segment
		if (pathSegments.length >= 2 && pathSegments[0] === 'category') {
			const categorySlug = pathSegments[1];
			const categoryName = categorySlug
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');

			breadcrumbs.push({
				label: categoryName,
				href: `/category/${categorySlug}`,
			});
		} else {
			// Default behavior for other pages
			pathSegments.forEach((segment, index) => {
				currentPath += `/${segment}`;
				const label = segment
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');

				breadcrumbs.push({
					label,
					href: currentPath,
				});
			});
		}

		return breadcrumbs;
	};

	const breadcrumbs = generateBreadcrumbs();

	return (
		<motion.nav
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
			aria-label='Breadcrumb'
		>
			{breadcrumbs.map((item, index) => (
				<div key={item.href} className='flex items-center'>
					{index === 0 ?
						<Link
							href={item.href}
							className='flex items-center hover:text-blue-600 transition-colors duration-200'
						>
							<Home className='w-4 h-4 mr-1' />
							<span className='sr-only'>{item.label}</span>
						</Link>
					:	<Link
							href={item.href}
							className='hover:text-blue-600 transition-colors duration-200'
						>
							{item.label}
						</Link>
					}

					{index < breadcrumbs.length - 1 && (
						<ChevronRight className='w-4 h-4 mx-2 text-gray-400' />
					)}
				</div>
			))}
		</motion.nav>
	);
};

export default Breadcrumb;

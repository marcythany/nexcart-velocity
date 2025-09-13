import { Heart, Home, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Button from '../atoms/Button';

interface MobileBottomNavProps {
	cartItemCount: number;
	wishlistItemCount: number;
	onCartClick: () => void;
	onWishlistClick: () => void;
	onSearchClick: () => void;
	onUserMenuClick: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
	cartItemCount,
	wishlistItemCount,
	onCartClick,
	onWishlistClick,
	onSearchClick,
	onUserMenuClick,
}) => {
	const pathname = usePathname();

	const navItems = [
		{
			href: '/',
			icon: Home,
			label: 'Home',
			active: pathname === '/',
			badge: 0,
		},
		{
			href: '/products',
			icon: Search,
			label: 'Search',
			active: pathname === '/products',
			onClick: onSearchClick,
			badge: 0,
		},
		{
			href: '/wishlist',
			icon: Heart,
			label: 'Wishlist',
			active: pathname === '/wishlist',
			badge: wishlistItemCount,
			onClick: onWishlistClick,
		},
		{
			href: '/cart',
			icon: ShoppingCart,
			label: 'Cart',
			active: pathname === '/cart',
			badge: cartItemCount,
			onClick: onCartClick,
		},
		{
			href: '/account',
			icon: User,
			label: 'Account',
			active: pathname === '/account',
			onClick: onUserMenuClick,
			badge: 0,
		},
	];

	return (
		<div className='md:hidden fixed bottom-0 left-0 right-0 bg-bg-card border-t border-border z-40'>
			<div className='flex items-center justify-around py-2 px-4'>
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = item.active;

					return (
						<div key={item.href} className='flex-1'>
							{item.onClick ?
								<Button
									variant='ghost'
									size='sm'
									className={`flex flex-col items-center gap-1 p-2 w-full relative ${
										isActive ? 'text-primary' : 'text-text-secondary'
									}`}
									onClick={item.onClick}
								>
									<div className='relative'>
										<Icon size={20} />
										{item.badge > 0 && (
											<span className='absolute -top-1 -right-1 bg-error text-text-inverted text-xs rounded-full w-4 h-4 flex items-center justify-center'>
												{item.badge > 9 ? '9+' : item.badge}
											</span>
										)}
									</div>
									<span className='text-xs'>{item.label}</span>
								</Button>
							:	<Link href={item.href} className='block'>
									<Button
										variant='ghost'
										size='sm'
										className={`flex flex-col items-center gap-1 p-2 w-full relative ${
											isActive ? 'text-primary' : 'text-text-secondary'
										}`}
									>
										<div className='relative'>
											<Icon size={20} />
											{item.badge > 0 && (
												<span className='absolute -top-1 -right-1 bg-error text-text-inverted text-xs rounded-full w-4 h-4 flex items-center justify-center'>
													{item.badge > 9 ? '9+' : item.badge}
												</span>
											)}
										</div>
										<span className='text-xs'>{item.label}</span>
									</Button>
								</Link>
							}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MobileBottomNav;

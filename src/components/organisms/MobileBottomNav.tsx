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
			label: 'Browse',
			active: pathname === '/products' || pathname.startsWith('/category'),
			onClick: onSearchClick,
			badge: 0,
		},
		{
			href: '/wishlist',
			icon: Heart,
			label: 'Saved',
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
			label: 'Profile',
			active: pathname === '/account',
			onClick: onUserMenuClick,
			badge: 0,
		},
	];

	return (
		<div className='md:hidden fixed bottom-0 left-0 right-0 bg-bg-card/95 backdrop-blur-lg border-t border-border z-40 safe-area-bottom'>
			<div className='flex items-center justify-around py-1 px-2 max-w-md mx-auto'>
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = item.active;

					return (
						<div key={item.href} className='flex-1'>
							{item.onClick ?
								<Button
									variant='ghost'
									size='sm'
									className={`flex flex-col items-center gap-1 p-3 w-full relative rounded-xl transition-all duration-200 ${
										isActive ?
											'text-primary bg-primary/10 scale-105'
										:	'text-text-secondary hover:text-primary hover:bg-primary/5 active:scale-95'
									}`}
									onClick={item.onClick}
									aria-label={`${item.label}${item.badge > 0 ? ` (${item.badge} items)` : ''}`}
								>
									<div className='relative'>
										<Icon
											size={22}
											className={isActive ? 'drop-shadow-sm' : ''}
										/>
										{item.badge > 0 && (
											<span className='absolute -top-1 -right-1 bg-error text-text-inverted text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse'>
												{item.badge > 99 ? '99+' : item.badge}
											</span>
										)}
									</div>
									<span
										className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}
									>
										{item.label}
									</span>
								</Button>
							:	<Link href={item.href} className='block'>
									<Button
										variant='ghost'
										size='sm'
										className={`flex flex-col items-center gap-1 p-3 w-full relative rounded-xl transition-all duration-200 ${
											isActive ?
												'text-primary bg-primary/10 scale-105'
											:	'text-text-secondary hover:text-primary hover:bg-primary/5 active:scale-95'
										}`}
										aria-label={`${item.label}${item.badge > 0 ? ` (${item.badge} items)` : ''}`}
									>
										<div className='relative'>
											<Icon
												size={22}
												className={isActive ? 'drop-shadow-sm' : ''}
											/>
											{item.badge > 0 && (
												<span className='absolute -top-1 -right-1 bg-error text-text-inverted text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse'>
													{item.badge > 99 ? '99+' : item.badge}
												</span>
											)}
										</div>
										<span
											className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}
										>
											{item.label}
										</span>
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

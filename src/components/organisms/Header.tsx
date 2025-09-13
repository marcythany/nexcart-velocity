import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Button from '../atoms/Button';
import Input from '../ui/Input';

interface HeaderProps {
	cartItemCount: number;
	wishlistItemCount: number;
	onCartClick: () => void;
	onWishlistClick: () => void;
	onSearch: (query: string) => void;
	onUserMenuClick: () => void;
	isLoggedIn?: boolean;
	userName?: string;
}

const Header: React.FC<HeaderProps> = ({
	cartItemCount,
	wishlistItemCount,
	onCartClick,
	onWishlistClick,
	onSearch,
	onUserMenuClick,
	isLoggedIn = false,
	userName,
}) => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchQuery);
	};

	return (
		<header className='bg-bg-card border-b border-border sticky top-0 z-30'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<div className='flex items-center'>
						<h1 className='text-2xl font-bold text-primary'>Nexcart</h1>
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='/'
							className='text-text-primary hover:text-primary transition-colors'
						>
							Home
						</Link>
						<Link
							href='/products'
							className='text-text-primary hover:text-primary transition-colors'
						>
							Products
						</Link>
						<Link
							href='/categories'
							className='text-text-primary hover:text-primary transition-colors'
						>
							Categories
						</Link>
						<Link
							href='/about'
							className='text-text-primary hover:text-primary transition-colors'
						>
							About
						</Link>
					</nav>

					{/* Search Bar */}
					<div className='hidden md:flex flex-1 max-w-lg mx-8'>
						<form onSubmit={handleSearchSubmit} className='w-full'>
							<div className='relative group'>
								<Input
									type='search'
									placeholder='Search for products, brands and more...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pr-12 pl-4 py-2 border-2 border-border rounded-full focus:border-primary focus:ring-0 transition-all duration-200 bg-bg-card'
								/>
								<Button
									type='submit'
									variant='ghost'
									size='sm'
									className='absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-primary/10 transition-colors'
									aria-label='Search'
								>
									<Search size={18} />
								</Button>
							</div>
						</form>
					</div>

					{/* User Actions */}
					<div className='flex items-center space-x-2'>
						{/* Search Button (Mobile) */}
						<Button
							variant='ghost'
							size='sm'
							className='md:hidden p-2'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<Search size={20} />
						</Button>

						{/* Wishlist */}
						<Button
							variant='ghost'
							size='sm'
							className='relative p-2'
							onClick={onWishlistClick}
							aria-label={`Wishlist (${wishlistItemCount} items)`}
						>
							<Heart size={20} />
							{wishlistItemCount > 0 && (
								<span className='absolute -top-1 -right-1 bg-error text-text-inverted text-xs rounded-full w-5 h-5 flex items-center justify-center'>
									{wishlistItemCount}
								</span>
							)}
						</Button>

						{/* Cart */}
						<Button
							variant='ghost'
							size='sm'
							className='relative p-2'
							data-testid='cart-button'
							onClick={onCartClick}
							aria-label={`Shopping cart (${cartItemCount} items)`}
						>
							<ShoppingCart size={20} />
							{cartItemCount > 0 && (
								<span
									className='absolute -top-1 -right-1 bg-primary text-text-inverted text-xs rounded-full w-5 h-5 flex items-center justify-center'
									data-testid='cart-badge'
								>
									{cartItemCount}
								</span>
							)}
						</Button>

						{/* User Menu */}
						<Button
							variant='ghost'
							size='sm'
							className='p-2'
							onClick={onUserMenuClick}
							aria-label={
								isLoggedIn ? `Account menu for ${userName}` : 'Sign in'
							}
						>
							<User size={20} />
						</Button>

						{/* Mobile Menu Button */}
						<Button
							variant='ghost'
							size='sm'
							className='md:hidden p-2'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<Menu size={20} />
						</Button>
					</div>
				</div>

				{/* Mobile Search Bar */}
				{isMobileMenuOpen && (
					<div className='md:hidden py-4 px-4 border-t border-border bg-bg-alt/50'>
						<form onSubmit={handleSearchSubmit}>
							<div className='relative group'>
								<Input
									type='search'
									placeholder='Search for products, brands and more...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pr-12 pl-4 py-3 border-2 border-border rounded-full focus:border-primary focus:ring-0 transition-all duration-200 bg-bg-card text-base'
								/>
								<Button
									type='submit'
									variant='ghost'
									size='sm'
									className='absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-primary/10 transition-colors'
									aria-label='Search'
								>
									<Search size={18} />
								</Button>
							</div>
						</form>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

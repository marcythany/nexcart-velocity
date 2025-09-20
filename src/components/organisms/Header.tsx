'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
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
}

const Header: React.FC<HeaderProps> = ({
	cartItemCount,
	wishlistItemCount,
	onCartClick,
	onWishlistClick,
	onSearch,
}) => {
	const { data: session } = useSession();
	const [searchQuery, setSearchQuery] = React.useState('');
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchQuery);
	};

	const navVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0 },
	};

	const mobileMenuVariants = {
		closed: {
			opacity: 0,
			height: 0,
		},
		open: {
			opacity: 1,
			height: 'auto',
		},
	};

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className='bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<motion.div
						className='flex items-center'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link href='/' className='flex items-center space-x-2'>
							<motion.div
								className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.5 }}
							>
								<span className='text-white font-bold text-lg'>N</span>
							</motion.div>
							<h1 className='text-2xl font-bold text-gray-900'>Nexcart</h1>
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<motion.nav
						variants={navVariants}
						initial='hidden'
						animate='visible'
						className='hidden md:flex items-center space-x-8'
					>
						{[
							{ href: '/', label: 'Home' },
							{ href: '/products', label: 'Products' },
							{ href: '/categories', label: 'Categories' },
							{ href: '/about', label: 'About' },
						].map((item) => (
							<motion.div key={item.href} variants={itemVariants}>
								<Link
									href={item.href}
									className='text-gray-700 hover:text-blue-600 transition-colors font-medium relative group'
								>
									{item.label}
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
								</Link>
							</motion.div>
						))}
					</motion.nav>

					{/* Search Bar */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.3 }}
						className='hidden md:flex flex-1 max-w-lg mx-8'
					>
						<form onSubmit={handleSearchSubmit} className='w-full'>
							<div className='relative group'>
								<Input
									type='search'
									placeholder='Search for products, brands and more...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pr-12 pl-4 py-3 border border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white shadow-sm'
								/>
								<Button
									type='submit'
									variant='ghost'
									size='sm'
									className='absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-blue-50 transition-colors'
									aria-label='Search'
								>
									<Search size={18} className='text-gray-600' />
								</Button>
							</div>
						</form>
					</motion.div>

					{/* User Actions */}
					<motion.div
						variants={navVariants}
						initial='hidden'
						animate='visible'
						className='flex items-center space-x-2'
					>
						{/* Search Button (Mobile) */}
						<motion.div variants={itemVariants}>
							<Button
								variant='ghost'
								size='sm'
								className='md:hidden p-2 hover:bg-gray-100 rounded-full'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								<Search size={20} className='text-gray-600' />
							</Button>
						</motion.div>

						{/* Wishlist */}
						<motion.div variants={itemVariants} whileHover={{ scale: 1.1 }}>
							<Button
								variant='ghost'
								size='sm'
								className='relative p-2 hover:bg-gray-100 rounded-full'
								onClick={onWishlistClick}
								aria-label={`Wishlist (${wishlistItemCount} items)`}
							>
								<Heart size={20} className='text-gray-600' />
								<AnimatePresence>
									{wishlistItemCount > 0 && (
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
											className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'
										>
											{wishlistItemCount}
										</motion.span>
									)}
								</AnimatePresence>
							</Button>
						</motion.div>

						{/* Cart */}
						<motion.div variants={itemVariants} whileHover={{ scale: 1.1 }}>
							<Button
								variant='ghost'
								size='sm'
								className='relative p-2 hover:bg-gray-100 rounded-full'
								data-testid='cart-button'
								onClick={onCartClick}
								aria-label={`Shopping cart (${cartItemCount} items)`}
							>
								<ShoppingCart size={20} className='text-gray-600' />
								<AnimatePresence>
									{cartItemCount > 0 && (
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
											className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'
											data-testid='cart-badge'
										>
											{cartItemCount}
										</motion.span>
									)}
								</AnimatePresence>
							</Button>
						</motion.div>

						{/* User Menu */}
						<motion.div variants={itemVariants} className="flex items-center space-x-2">
              {session ? (
                <>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {session.user?.name}
                  </span>
									<Button
										variant='ghost'
										size='sm'
										className='p-2 hover:bg-gray-100 rounded-full'
										onClick={() => signOut()}
										aria-label="Sign out"
									>
										<X size={20} className='text-gray-600' />
									</Button>
                </>
              ) : (
                <>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => signIn()}
                    aria-label="Sign in"
                  >
                    Login
                  </Button>
                  <Link href="/signup">
                    <Button
                      variant='solid'
                      size='sm'
                      aria-label="Sign up"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

						{/* Mobile Menu Button */}
						<motion.div variants={itemVariants}>
							<Button
								variant='ghost'
								size='sm'
								className='md:hidden p-2 hover:bg-gray-100 rounded-full'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								<AnimatePresence mode='wait'>
									{isMobileMenuOpen ?
										<motion.div
											key='close'
											initial={{ rotate: -90, opacity: 0 }}
											animate={{ rotate: 0, opacity: 1 }}
											exit={{ rotate: 90, opacity: 0 }}
											transition={{ duration: 0.2 }}
										>
											<X size={20} className='text-gray-600' />
										</motion.div>
									:	<motion.div
											key='menu'
											initial={{ rotate: 90, opacity: 0 }}
											animate={{ rotate: 0, opacity: 1 }}
											exit={{ rotate: -90, opacity: 0 }}
											transition={{ duration: 0.2 }}
										>
											<Menu size={20} className='text-gray-600' />
										</motion.div>
									}
								</AnimatePresence>
							</Button>
						</motion.div>
					</motion.div>
				</div>

				{/* Mobile Search Bar */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							variants={mobileMenuVariants}
							initial='closed'
							animate='open'
							exit='closed'
							className='md:hidden py-4 px-4 border-t border-gray-200 bg-gray-50 overflow-hidden'
						>
							<form onSubmit={handleSearchSubmit}>
								<div className='relative group'>
									<Input
										type='search'
										placeholder='Search for products, brands and more...'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='pr-12 pl-4 py-3 border border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white text-base shadow-sm'
									/>
									<Button
										type='submit'
										variant='ghost'
										size='sm'
										className='absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-blue-50 transition-colors'
										aria-label='Search'
									>
										<Search size={18} className='text-gray-600' />
									</Button>
								</div>
							</form>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
};

export default Header;

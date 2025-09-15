import { useCartStore } from '@/stores/cartStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import React from 'react';
import ShoppingCart from './ShoppingCart';

interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
	const { items, updateQuantity, removeItem, clearCart } = useCartStore(
		(state) => ({
			items: state.items,
			updateQuantity: state.updateQuantity,
			removeItem: state.removeItem,
			clearCart: state.clearCart,
		})
	);
	// Close sidebar when clicking outside
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// Prevent body scroll when sidebar is open
	React.useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
						onClick={handleBackdropClick}
					/>

					{/* Sidebar */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className='fixed top-0 right-0 h-full w-full max-w-md bg-bg-card shadow-xl z-50 flex flex-col'
					>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-border'>
							<div className='flex items-center gap-2'>
								<ShoppingBag size={24} />
								<h2 className='text-lg font-semibold'>Shopping Cart</h2>
								{items.length > 0 && (
									<span className='bg-primary text-text-inverted text-xs px-2 py-1 rounded-full'>
										{items.length}
									</span>
								)}
							</div>
							<button
								onClick={onClose}
								className='p-2 hover:bg-bg-alt rounded-md transition-colors'
								aria-label='Close cart'
							>
								<X size={20} />
							</button>
						</div>

						{/* Cart Content */}
						<div className='flex-1 overflow-auto p-6'>
							<ShoppingCart
								items={items}
								onUpdateQuantity={updateQuantity}
								onRemoveItem={removeItem}
								onClearCart={clearCart}
								className='border-none shadow-none'
							/>
						</div>

						{/* Footer with close button for mobile */}
						<div className='p-6 border-t border-border md:hidden'>
							<button
								onClick={onClose}
								className='w-full bg-primary text-text-inverted py-3 px-4 rounded-md font-medium hover:bg-primary-hover transition-colors'
							>
								Continue Shopping
							</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default CartSidebar;

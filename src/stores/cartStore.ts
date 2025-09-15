import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	variant?: string;
}

interface CartState {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;

	// Actions
	addItem: (item: Omit<CartItem, 'id'>) => void;
	removeItem: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
	getItemCount: () => number;
	getTotalPrice: () => number;
	updateTotals: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			totalItems: 0,
			totalPrice: 0,

			addItem: (item) => {
				const { items } = get();
				const existingItem = items.find(
					(cartItem) =>
						cartItem.productId === item.productId &&
						cartItem.variant === item.variant
				);

				if (existingItem) {
					// Update quantity if item already exists
					get().updateQuantity(
						existingItem.id,
						existingItem.quantity + item.quantity
					);
				} else {
					// Add new item
					const newItem: CartItem = {
						...item,
						id: `${item.productId}-${item.variant || 'default'}-${Date.now()}`,
					};
					set((state) => ({
						items: [...state.items, newItem],
					}));
				}

				// Update totals
				get().updateTotals();
			},

			removeItem: (itemId) => {
				set((state) => ({
					items: state.items.filter((item) => item.id !== itemId),
				}));
				get().updateTotals();
			},

			updateQuantity: (itemId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(itemId);
					return;
				}

				set((state) => ({
					items: state.items.map((item) =>
						item.id === itemId ? { ...item, quantity } : item
					),
				}));
				get().updateTotals();
			},

			clearCart: () => {
				set({
					items: [],
					totalItems: 0,
					totalPrice: 0,
				});
			},

			getItemCount: () => {
				const { items } = get();
				return items.reduce((total, item) => total + item.quantity, 0);
			},

			getTotalPrice: () => {
				const { items } = get();
				return items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},

			// Helper function to update totals
			updateTotals: () => {
				const { items } = get();
				const totalItems = items.reduce(
					(total, item) => total + item.quantity,
					0
				);
				const totalPrice = items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
				set({ totalItems, totalPrice });
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				items: state.items,
				totalItems: state.totalItems,
				totalPrice: state.totalPrice,
			}),
		}
	)
);

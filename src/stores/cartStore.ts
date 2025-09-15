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
	promoCode: string | null;
	discount: number;

	// Actions
	addItem: (item: Omit<CartItem, 'id'>) => void;
	removeItem: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	applyPromoCode: (code: string) => void;
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
			promoCode: null,
			discount: 0,

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

			applyPromoCode: (code) => {
				// In a real app, you'd validate the code against a backend service
				if (code.toUpperCase() === 'NEXCART10') {
					set({ promoCode: code, discount: 0.1 }); // 10% discount
				} else {
					set({ promoCode: code, discount: 0 }); // Invalid code
				}
				get().updateTotals();
			},

			clearCart: () => {
				set({
					items: [],
					totalItems: 0,
					totalPrice: 0,
					promoCode: null,
					discount: 0,
				});
			},

			getItemCount: () => {
				const { items } = get();
				return items.reduce((total, item) => total + item.quantity, 0);
			},

			getTotalPrice: () => {
				const { items, discount } = get();
				const subtotal = items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
				return subtotal * (1 - discount);
			},

			// Helper function to update totals
			updateTotals: () => {
				const { items, discount } = get();
				const totalItems = items.reduce(
					(total, item) => total + item.quantity,
					0
				);
				const subtotal = items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
				const totalPrice = subtotal * (1 - discount);
				set({ totalItems, totalPrice });
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				items: state.items,
				totalItems: state.totalItems,
				totalPrice: state.totalPrice,
				promoCode: state.promoCode,
				discount: state.discount,
			}),
		}
	)
);

import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cartStore';

describe('Cart Store', () => {
	beforeEach(() => {
		// Reset the store before each test
		useCartStore.getState().clearCart();
	});

	it('should initialize with empty cart', () => {
		const { items, totalItems, totalPrice } = useCartStore.getState();

		expect(items).toEqual([]);
		expect(totalItems).toBe(0);
		expect(totalPrice).toBe(0);
	});

	it('should add item to cart', () => {
		const { addItem } = useCartStore.getState();

		const newItem = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
			variant: 'Small',
		};

		addItem(newItem);

		const { items, totalItems, totalPrice } = useCartStore.getState();

		expect(items).toHaveLength(1);
		expect(items[0]).toMatchObject({
			...newItem,
			id: expect.any(String),
		});
		expect(totalItems).toBe(1);
		expect(totalPrice).toBe(10.99);
	});

	it('should update quantity when adding existing item', () => {
		const { addItem } = useCartStore.getState();

		const item = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
		};

		addItem(item);
		addItem(item);

		const { items, totalItems, totalPrice } = useCartStore.getState();

		expect(items).toHaveLength(1);
		expect(items[0].quantity).toBe(2);
		expect(totalItems).toBe(2);
		expect(totalPrice).toBe(21.98);
	});

	it('should remove item from cart', () => {
		const { addItem, removeItem } = useCartStore.getState();

		const item = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
		};

		addItem(item);
		const { items } = useCartStore.getState();
		const itemId = items[0].id;

		removeItem(itemId);

		const {
			items: updatedItems,
			totalItems,
			totalPrice,
		} = useCartStore.getState();

		expect(updatedItems).toEqual([]);
		expect(totalItems).toBe(0);
		expect(totalPrice).toBe(0);
	});

	it('should update item quantity', () => {
		const { addItem, updateQuantity } = useCartStore.getState();

		const item = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
		};

		addItem(item);
		const { items } = useCartStore.getState();
		const itemId = items[0].id;

		updateQuantity(itemId, 3);

		const {
			items: updatedItems,
			totalItems,
			totalPrice,
		} = useCartStore.getState();

		expect(updatedItems[0].quantity).toBe(3);
		expect(totalItems).toBe(3);
		expect(totalPrice).toBe(32.97);
	});

	it('should remove item when quantity is set to 0', () => {
		const { addItem, updateQuantity } = useCartStore.getState();

		const item = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
		};

		addItem(item);
		const { items } = useCartStore.getState();
		const itemId = items[0].id;

		updateQuantity(itemId, 0);

		const { items: updatedItems } = useCartStore.getState();

		expect(updatedItems).toEqual([]);
	});

	it('should clear cart', () => {
		const { addItem, clearCart } = useCartStore.getState();

		const item1 = {
			productId: '1',
			name: 'Product 1',
			price: 10.99,
			quantity: 1,
			image: '/test1.jpg',
		};

		const item2 = {
			productId: '2',
			name: 'Product 2',
			price: 15.99,
			quantity: 2,
			image: '/test2.jpg',
		};

		addItem(item1);
		addItem(item2);

		clearCart();

		const { items, totalItems, totalPrice } = useCartStore.getState();

		expect(items).toEqual([]);
		expect(totalItems).toBe(0);
		expect(totalPrice).toBe(0);
	});

	it('should calculate totals correctly with multiple items', () => {
		const { addItem } = useCartStore.getState();

		const item1 = {
			productId: '1',
			name: 'Product 1',
			price: 10.99,
			quantity: 2,
			image: '/test1.jpg',
		};

		const item2 = {
			productId: '2',
			name: 'Product 2',
			price: 15.99,
			quantity: 1,
			image: '/test2.jpg',
		};

		addItem(item1);
		addItem(item2);

		const { totalItems, totalPrice } = useCartStore.getState();

		expect(totalItems).toBe(3);
		expect(totalPrice).toBe(37.97); // (10.99 * 2) + (15.99 * 1)
	});

	it('should handle different variants as separate items', () => {
		const { addItem } = useCartStore.getState();

		const item1 = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
			variant: 'Small',
		};

		const item2 = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 1,
			image: '/test.jpg',
			variant: 'Large',
		};

		addItem(item1);
		addItem(item2);

		const { items, totalItems } = useCartStore.getState();

		expect(items).toHaveLength(2);
		expect(totalItems).toBe(2);
	});

	it('should get item count', () => {
		const { addItem, getItemCount } = useCartStore.getState();

		expect(getItemCount()).toBe(0);

		const item = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 3,
			image: '/test.jpg',
		};

		addItem(item);

		expect(getItemCount()).toBe(3);
	});

	it('should get total price', () => {
		const { addItem, getTotalPrice } = useCartStore.getState();

		expect(getTotalPrice()).toBe(0);

		const item = {
			productId: '1',
			name: 'Test Product',
			price: 10.99,
			quantity: 2,
			image: '/test.jpg',
		};

		addItem(item);

		expect(getTotalPrice()).toBe(21.98);
	});
});

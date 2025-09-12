import { expect, test } from '@playwright/test';

test.describe('Shopping Cart', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the homepage
		await page.goto('/');
	});

	test('should add product to cart', async ({ page }) => {
		// Find and click on a product card
		const productCard = page.locator('[data-testid="product-card"]').first();
		await expect(productCard).toBeVisible();

		// Click the "Add to Cart" button
		const addToCartButton = productCard.locator('button', {
			hasText: 'Add to Cart',
		});
		await addToCartButton.click();

		// Check that cart badge shows 1 item
		const cartBadge = page.locator('[data-testid="cart-badge"]');
		await expect(cartBadge).toHaveText('1');
	});

	test('should open cart sidebar when cart button is clicked', async ({
		page,
	}) => {
		// Click the cart button in header
		const cartButton = page.locator('[data-testid="cart-button"]');
		await cartButton.click();

		// Check that cart sidebar is visible
		const cartSidebar = page.locator('[data-testid="cart-sidebar"]');
		await expect(cartSidebar).toBeVisible();
	});

	test('should update cart item quantity', async ({ page }) => {
		// Add item to cart first
		const productCard = page.locator('[data-testid="product-card"]').first();
		const addToCartButton = productCard.locator('button', {
			hasText: 'Add to Cart',
		});
		await addToCartButton.click();

		// Open cart sidebar
		const cartButton = page.locator('[data-testid="cart-button"]');
		await cartButton.click();

		// Find quantity controls
		const quantityIncrease = page.locator('[data-testid="quantity-increase"]');
		await quantityIncrease.click();

		// Check that quantity is now 2
		const quantityDisplay = page.locator('[data-testid="quantity-display"]');
		await expect(quantityDisplay).toHaveText('2');
	});

	test('should remove item from cart', async ({ page }) => {
		// Add item to cart first
		const productCard = page.locator('[data-testid="product-card"]').first();
		const addToCartButton = productCard.locator('button', {
			hasText: 'Add to Cart',
		});
		await addToCartButton.click();

		// Open cart sidebar
		const cartButton = page.locator('[data-testid="cart-button"]');
		await cartButton.click();

		// Click remove button
		const removeButton = page.locator('[data-testid="remove-item"]');
		await removeButton.click();

		// Check that cart is empty
		const emptyCartMessage = page.locator('[data-testid="empty-cart"]');
		await expect(emptyCartMessage).toBeVisible();

		// Check that cart badge is hidden or shows 0
		const cartBadge = page.locator('[data-testid="cart-badge"]');
		await expect(cartBadge).toHaveText('0');
	});

	test('should persist cart across page reloads', async ({ page }) => {
		// Add item to cart
		const productCard = page.locator('[data-testid="product-card"]').first();
		const addToCartButton = productCard.locator('button', {
			hasText: 'Add to Cart',
		});
		await addToCartButton.click();

		// Reload the page
		await page.reload();

		// Check that cart still has the item
		const cartBadge = page.locator('[data-testid="cart-badge"]');
		await expect(cartBadge).toHaveText('1');
	});

	test('should show correct total price', async ({ page }) => {
		// Add multiple items to cart
		const productCards = page.locator('[data-testid="product-card"]');

		// Add first product
		const firstAddButton = productCards
			.first()
			.locator('button', { hasText: 'Add to Cart' });
		await firstAddButton.click();

		// Add second product (if available)
		const secondProduct = productCards.nth(1);
		if (await secondProduct.isVisible()) {
			const secondAddButton = secondProduct.locator('button', {
				hasText: 'Add to Cart',
			});
			await secondAddButton.click();
		}

		// Open cart and check total
		const cartButton = page.locator('[data-testid="cart-button"]');
		await cartButton.click();

		const totalPrice = page.locator('[data-testid="cart-total"]');
		await expect(totalPrice).toBeVisible();

		// Total should be greater than 0
		const totalText = await totalPrice.textContent();
		const totalValue = parseFloat(totalText?.replace('$', '') || '0');
		expect(totalValue).toBeGreaterThan(0);
	});

	test('should handle cart with many items', async ({ page }) => {
		// Add multiple items (simulate by clicking multiple times or different products)
		const productCards = page.locator('[data-testid="product-card"]');

		// Add up to 5 different products
		const count = Math.min(await productCards.count(), 5);
		for (let i = 0; i < count; i++) {
			const addButton = productCards
				.nth(i)
				.locator('button', { hasText: 'Add to Cart' });
			await addButton.click();
		}

		// Check cart badge shows correct count
		const cartBadge = page.locator('[data-testid="cart-badge"]');
		await expect(cartBadge).toHaveText(count.toString());

		// Open cart and verify all items are there
		const cartButton = page.locator('[data-testid="cart-button"]');
		await cartButton.click();

		const cartItems = page.locator('[data-testid="cart-item"]');
		await expect(cartItems).toHaveCount(count);
	});
});

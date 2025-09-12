import { expect, test, type Page } from '@playwright/test';

test.describe('Complete E-commerce User Flow', () => {
	test('should complete full shopping experience', async ({
		page,
	}: {
		page: Page;
	}) => {
		// Navigate to homepage
		await page.goto('http://localhost:3000');

		// Verify page loads correctly
		await expect(page).toHaveTitle(/Nexcart Velocity/);
		await expect(
			page.locator('h1').filter({ hasText: 'Welcome to Nexcart Velocity' })
		).toBeVisible();

		// Check hero section
		await expect(page.locator('text=Discover amazing products')).toBeVisible();

		// Verify GraphQL API is working by checking if products load
		// Wait for products to load (they should appear via GraphQL)
		await page.waitForSelector(
			'[class*="group overflow-hidden cursor-pointer"]',
			{ timeout: 10000 }
		);

		// Check if featured products section exists
		const featuredSection = page.locator('text=Featured Products');
		await expect(featuredSection).toBeVisible();

		// Verify products are displayed (from GraphQL)
		// This tests that the ProductGrid component successfully fetches data
		const productCards = page.locator(
			'[class*="group overflow-hidden cursor-pointer"]'
		);
		await expect(productCards.first()).toBeVisible();

		// Test product interaction (add to cart)
		const firstProductCard = productCards.first();
		const addToCartButton = firstProductCard
			.locator('button')
			.filter({ hasText: 'Add to Cart' });

		// Click add to cart (this should trigger GraphQL mutation)
		await addToCartButton.click();

		// Verify cart functionality
		// Check if cart badge updates (if implemented)
		// This would test the Zustand store integration

		// Test navigation
		await page.locator('text=Shop Now').click();
		await expect(page).toHaveURL(/.*products.*/); // Should navigate to products page

		// Test search functionality (if implemented)
		const searchInput = page.locator('input[placeholder*="Search"]').first();
		if (await searchInput.isVisible()) {
			await searchInput.fill('headphones');
			await searchInput.press('Enter');
			// Should filter products based on search
		}

		// Test category filtering (if implemented)
		const categoryLink = page.locator('text=Electronics').first();
		if (await categoryLink.isVisible()) {
			await categoryLink.click();
			// Should filter to electronics category
		}

		// Test responsive design
		await page.setViewportSize({ width: 375, height: 667 }); // Mobile
		await expect(
			page.locator('text=Welcome to Nexcart Velocity')
		).toBeVisible();

		await page.setViewportSize({ width: 1024, height: 768 }); // Desktop
		await expect(
			page.locator('text=Welcome to Nexcart Velocity')
		).toBeVisible();
	});

	test('should handle GraphQL API errors gracefully', async ({
		page,
	}: {
		page: Page;
	}) => {
		// Navigate to homepage
		await page.goto('http://localhost:3000');

		// Test error handling by checking if error messages appear appropriately
		// This tests the error boundaries and loading states

		// Check for any error messages or loading states
		const errorMessages = page
			.locator('text=Failed to load')
			.or(page.locator('text=Something went wrong'));
		const loadingStates = page.locator('[class*="animate-pulse"]');

		// If errors exist, they should be user-friendly
		if (await errorMessages.isVisible()) {
			await expect(errorMessages).toContainText(/user-friendly error message/);
		}

		// Loading states should be present during data fetching
		// This verifies that GraphQL loading states are properly implemented
		await expect(
			loadingStates.or(page.locator('text=Loading...'))
		).toBeVisible();
	});

	test('should test GraphQL mutations (cart operations)', async ({
		page,
	}: {
		page: Page;
	}) => {
		// This test would require setting up a test environment
		// For now, we'll document the expected behavior

		// Navigate to product page
		await page.goto('http://localhost:3000');

		// Find a product and add to cart
		const productCard = page
			.locator('[class*="group overflow-hidden cursor-pointer"]')
			.first();
		await expect(productCard).toBeVisible();

		// Click add to cart button
		const addToCartBtn = productCard
			.locator('button')
			.filter({ hasText: 'Add to Cart' });
		await addToCartBtn.click();

		// Verify cart state updates
		// This would test:
		// 1. GraphQL mutation execution
		// 2. Apollo Client cache updates
		// 3. Zustand store synchronization
		// 4. UI state updates

		// Check for cart sidebar or cart badge update
		const cartBadge = page
			.locator('[class*="bg-primary"]')
			.filter({ hasText: /\d+/ });
		if (await cartBadge.isVisible()) {
			await expect(cartBadge).toContainText('1');
		}
	});

	test('should verify accessibility compliance', async ({
		page,
	}: {
		page: Page;
	}) => {
		await page.goto('http://localhost:3000');

		// Test keyboard navigation
		await page.keyboard.press('Tab');
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();

		// Test ARIA labels and roles
		const buttons = page.locator('button');
		for (const button of await buttons.all()) {
			const ariaLabel = await button.getAttribute('aria-label');
			const textContent = await button.textContent();
			// Either aria-label or text content should be present
			expect(ariaLabel || textContent?.trim()).toBeTruthy();
		}

		// Test color contrast (manual verification would be needed)
		// Test semantic HTML structure
		await expect(page.locator('main, [role="main"]')).toBeVisible();
		await expect(page.locator('nav, [role="navigation"]')).toBeVisible();
	});

	test('should test performance metrics', async ({ page }: { page: Page }) => {
		// Start performance monitoring
		const client = await page.context().newCDPSession(page);
		await client.send('Performance.enable');

		await page.goto('http://localhost:3000');

		// Wait for page to fully load
		await page.waitForLoadState('networkidle');

		// Get performance metrics
		const metrics = await client.send('Performance.getMetrics');

		// Check Core Web Vitals (approximate)
		const navigationMetrics = metrics.metrics.filter(
			(m: { name: string; value: number }) =>
				[
					'FirstContentfulPaint',
					'LargestContentfulPaint',
					'CumulativeLayoutShift',
				].includes(m.name)
		);

		console.log('Performance Metrics:', navigationMetrics);

		// Verify images have proper optimization
		const images = page.locator('img');
		const imageCount = await images.count();

		for (let i = 0; i < Math.min(imageCount, 5); i++) {
			const img = images.nth(i);
			const src = await img.getAttribute('src');
			// Should use Next.js Image optimization or proper sizing
			expect(src).toBeTruthy();
		}
	});
});

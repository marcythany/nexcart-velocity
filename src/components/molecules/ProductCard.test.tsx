import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductCard, { type Product } from './ProductCard';

const mockProduct: Product = {
	id: '1',
	name: 'Test Product',
	price: 99.99,
	originalPrice: 129.99,
	rating: 4.5,
	reviewCount: 42,
	image: '/test-image.jpg',
	description: 'A test product description',
	category: 'Test Category',
	inStock: true,
	isNew: true,
	isOnSale: true,
};

describe('ProductCard', () => {
	const defaultProps = {
		product: mockProduct,
		onAddToCart: vi.fn(),
		onToggleWishlist: vi.fn(),
		onQuickView: vi.fn(),
	};

	it('renders product information correctly', () => {
		render(<ProductCard {...defaultProps} />);

		expect(screen.getByText('Test Product')).toBeInTheDocument();
		expect(screen.getByText('$99.99')).toBeInTheDocument();
		expect(screen.getByText('$129.99')).toBeInTheDocument();
		expect(screen.getByText('(42)')).toBeInTheDocument();
		expect(screen.getByText('Test Category')).toBeInTheDocument();
	});

	it('displays badges correctly', () => {
		render(<ProductCard {...defaultProps} />);

		expect(screen.getByText('New')).toBeInTheDocument();
		expect(screen.getByText('-23%')).toBeInTheDocument();
	});

	it('shows correct star rating', () => {
		render(<ProductCard {...defaultProps} />);

		// Should have 4 filled stars and 1 empty star for rating 4.5
		const stars = screen.getAllByTestId('star');
		expect(stars).toHaveLength(5);

		// First 4 stars should be filled
		for (let i = 0; i < 4; i++) {
			expect(stars[i]).toHaveClass('fill-warning', 'text-warning');
		}
		// Last star should be empty
		expect(stars[4]).toHaveClass('text-text-secondary');
	});

	it('handles add to cart click', () => {
		const onAddToCart = vi.fn();
		render(<ProductCard {...defaultProps} onAddToCart={onAddToCart} />);

		const addToCartButton = screen.getByRole('button', {
			name: /add to cart/i,
		});
		fireEvent.click(addToCartButton);

		expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
	});

	it('handles wishlist toggle', () => {
		const onToggleWishlist = vi.fn();
		render(
			<ProductCard {...defaultProps} onToggleWishlist={onToggleWishlist} />
		);

		fireEvent.click(
			screen.getByRole('button', {
				name: /add to wishlist/i,
			})
		);

		expect(onToggleWishlist).toHaveBeenCalledWith('1');
	});

	it('handles quick view', () => {
		const onQuickView = vi.fn();
		render(<ProductCard {...defaultProps} onQuickView={onQuickView} />);

		const quickViewButton = screen.getByRole('button', { name: /quick view/i });
		fireEvent.click(quickViewButton);

		expect(onQuickView).toHaveBeenCalledWith(mockProduct);
	});

	it('shows wishlist filled when in wishlist', () => {
		render(<ProductCard {...defaultProps} isInWishlist={true} />);

		screen.getByRole('button', {
			name: /remove from wishlist/i,
		});
		const heartIcon = screen.getByTestId('heart-icon');

		expect(heartIcon).toHaveClass('fill-current', 'text-error');
	});

	it('shows out of stock when product is not in stock', () => {
		const outOfStockProduct = { ...mockProduct, inStock: false };
		render(<ProductCard {...defaultProps} product={outOfStockProduct} />);

		expect(screen.getByText('Out of Stock')).toBeInTheDocument();

		const addToCartButton = screen.getByRole('button', {
			name: /out of stock/i,
		});
		expect(addToCartButton).toBeDisabled();
	});

	it('does not show discount when no original price', () => {
		const noDiscountProduct = { ...mockProduct, originalPrice: undefined };
		render(<ProductCard {...defaultProps} product={noDiscountProduct} />);

		expect(screen.queryByText('$129.99')).not.toBeInTheDocument();
		expect(screen.queryByText(/-23%/)).not.toBeInTheDocument();
	});

	it('applies custom className', () => {
		render(<ProductCard {...defaultProps} className='custom-class' />);

		const card = screen
			.getByRole('img', { name: /test product/i })
			.closest('.card');
		expect(card).toHaveClass('custom-class');
	});

	it('renders product image with correct attributes', () => {
		render(<ProductCard {...defaultProps} />);

		const image = screen.getByRole('img', { name: /test product/i });
		expect(image).toHaveAttribute('src', '/test-image.jpg');
		expect(image).toHaveAttribute('alt', 'Test Product');
		expect(image).toHaveAttribute('loading', 'lazy');
	});

	it('shows correct price formatting', () => {
		const expensiveProduct = { ...mockProduct, price: 1234.56 };
		render(<ProductCard {...defaultProps} product={expensiveProduct} />);

		expect(screen.getByText('$1,234.56')).toBeInTheDocument();
	});

	it('handles long product names', () => {
		const longNameProduct = {
			...mockProduct,
			name: 'Very Long Product Name That Should Be Truncated In The UI Display',
		};
		render(<ProductCard {...defaultProps} product={longNameProduct} />);

		const title = screen.getByText(/Very Long Product Name/);
		expect(title).toHaveClass('line-clamp-2');
	});
});

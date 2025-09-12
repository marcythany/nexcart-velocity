import { fireEvent, render, screen } from '@testing-library/react';
import { Heart } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('btn');
	});

	it('renders with different variants', () => {
		const { rerender } = render(<Button variant='primary'>Primary</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-primary');

		rerender(<Button variant='secondary'>Secondary</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-secondary');

		rerender(<Button variant='outline'>Outline</Button>);
		expect(screen.getByRole('button')).toHaveClass(
			'border-border',
			'bg-transparent'
		);

		rerender(<Button variant='ghost'>Ghost</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-transparent');

		rerender(<Button variant='text'>Text</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-transparent');

		rerender(<Button variant='tactile'>Tactile</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-bg-card');
	});

	it('renders with different sizes', () => {
		const { rerender } = render(<Button size='sm'>Small</Button>);
		expect(screen.getByRole('button')).toHaveClass('text-sm', 'px-3', 'py-1.5');

		rerender(<Button size='md'>Medium</Button>);
		expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2');

		rerender(<Button size='lg'>Large</Button>);
		expect(screen.getByRole('button')).toHaveClass('text-lg', 'px-5', 'py-2.5');
	});

	it('handles click events', () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('shows loading state', () => {
		render(<Button isLoading>Loading</Button>);
		const button = screen.getByRole('button', { name: /loading/i });

		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(button).toBeDisabled();
		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
	});

	it('renders with icon', () => {
		render(<Button icon={Heart}>With Icon</Button>);
		const button = screen.getByRole('button');

		expect(button).toContainElement(screen.getByTestId('heart-icon'));
		expect(screen.getByText('With Icon')).toBeInTheDocument();
	});

	it('renders icon only', () => {
		render(<Button icon={Heart} aria-label='Like' />);
		const button = screen.getByRole('button', { name: /like/i });

		expect(button).toContainElement(screen.getByTestId('heart-icon'));
		expect(button).not.toHaveTextContent(/.+/);
	});

	it('renders with icon on right', () => {
		render(
			<Button icon={Heart} iconPosition='right'>
				Icon Right
			</Button>
		);
		const button = screen.getByRole('button');

		// Icon should be after text
		const icon = screen.getByTestId('heart-icon');
		const text = screen.getByText('Icon Right');

		expect(button).toContainElement(icon);
		expect(button).toContainElement(text);
		expect(icon).toHaveClass('ml-2'); // Right position class
	});

	it('is disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole('button');

		expect(button).toBeDisabled();
		expect(button).toHaveClass('opacity-60', 'cursor-not-allowed');
	});

	it('applies custom className', () => {
		render(<Button className='custom-class'>Custom</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('btn', 'custom-class');
	});

	it('forwards other props to button element', () => {
		render(
			<Button type='submit' data-testid='submit-btn'>
				Submit
			</Button>
		);
		const button = screen.getByTestId('submit-btn');

		expect(button).toHaveAttribute('type', 'submit');
	});

	it('has proper accessibility attributes', () => {
		render(<Button aria-label='Custom label'>Button</Button>);
		const button = screen.getByRole('button', { name: /custom label/i });

		expect(button).toHaveAttribute('aria-label', 'Custom label');
	});
});

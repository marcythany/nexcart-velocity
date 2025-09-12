// Accessibility utilities and helpers
export class AccessibilityManager {
	private focusTraps: Set<HTMLElement> = new Set();
	private liveRegions: Map<string, HTMLElement> = new Map();

	// Focus management
	setFocus(element: HTMLElement): void {
		if (element && typeof element.focus === 'function') {
			element.focus();
			// Scroll into view if needed
			element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	// Focus trap for modals and dialogs
	trapFocus(container: HTMLElement): () => void {
		if (this.focusTraps.has(container)) {
			return () => {}; // Already trapped
		}

		this.focusTraps.add(container);

		const focusableElements = this.getFocusableElements(container);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Tab') {
				if (event.shiftKey) {
					// Shift + Tab
					if (document.activeElement === firstElement) {
						event.preventDefault();
						this.setFocus(lastElement);
					}
				} else {
					// Tab
					if (document.activeElement === lastElement) {
						event.preventDefault();
						this.setFocus(firstElement);
					}
				}
			}

			if (event.key === 'Escape') {
				// Find and trigger close handler
				const closeButton = container.querySelector(
					'[data-close]'
				) as HTMLElement;
				if (closeButton) {
					closeButton.click();
				}
			}
		};

		container.addEventListener('keydown', handleKeyDown);

		// Focus first element
		if (firstElement) {
			this.setFocus(firstElement);
		}

		// Return cleanup function
		return () => {
			container.removeEventListener('keydown', handleKeyDown);
			this.focusTraps.delete(container);
		};
	}

	private getFocusableElements(container: HTMLElement): HTMLElement[] {
		const focusableSelectors = [
			'a[href]',
			'button:not([disabled])',
			'textarea:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable="true"]',
		];

		return Array.from(
			container.querySelectorAll(focusableSelectors.join(', '))
		) as HTMLElement[];
	}

	// Live region for screen reader announcements
	createLiveRegion(
		id: string,
		priority: 'polite' | 'assertive' = 'polite'
	): HTMLElement {
		if (this.liveRegions.has(id)) {
			return this.liveRegions.get(id)!;
		}

		const liveRegion = document.createElement('div');
		liveRegion.id = id;
		liveRegion.setAttribute('aria-live', priority);
		liveRegion.setAttribute('aria-atomic', 'true');
		liveRegion.style.position = 'absolute';
		liveRegion.style.left = '-10000px';
		liveRegion.style.width = '1px';
		liveRegion.style.height = '1px';
		liveRegion.style.overflow = 'hidden';

		document.body.appendChild(liveRegion);
		this.liveRegions.set(id, liveRegion);

		return liveRegion;
	}

	announce(
		message: string,
		id: string = 'default',
		priority: 'polite' | 'assertive' = 'polite'
	): void {
		const liveRegion = this.createLiveRegion(id, priority);
		liveRegion.textContent = message;

		// Clear after announcement
		setTimeout(() => {
			liveRegion.textContent = '';
		}, 1000);
	}

	// Skip links
	createSkipLink(
		targetId: string,
		text: string = 'Skip to main content'
	): HTMLAnchorElement {
		const skipLink = document.createElement('a');
		skipLink.href = `#${targetId}`;
		skipLink.textContent = text;
		skipLink.className = 'skip-link';
		skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
      border-radius: 4px;
    `;

		// Show on focus
		skipLink.addEventListener('focus', () => {
			skipLink.style.top = '6px';
		});

		skipLink.addEventListener('blur', () => {
			skipLink.style.top = '-40px';
		});

		return skipLink;
	}

	// High contrast mode detection
	isHighContrastMode(): boolean {
		const testElement = document.createElement('div');
		testElement.style.cssText = `
      position: absolute;
      left: -9999px;
      background: rgb(31, 41, 55);
      color: rgb(156, 163, 175);
    `;
		document.body.appendChild(testElement);

		const computedStyle = window.getComputedStyle(testElement);
		const isHighContrast =
			computedStyle.backgroundColor === computedStyle.color ||
			(computedStyle.backgroundColor === 'rgb(31, 41, 55)' &&
				computedStyle.color === 'rgb(156, 163, 175)');

		document.body.removeChild(testElement);
		return isHighContrast;
	}

	// Reduced motion detection
	prefersReducedMotion(): boolean {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	// Color scheme preference
	prefersDarkMode(): boolean {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	// Cleanup
	destroy(): void {
		this.focusTraps.clear();
		this.liveRegions.forEach((region) => {
			if (region.parentNode) {
				region.parentNode.removeChild(region);
			}
		});
		this.liveRegions.clear();
	}
}

// Create singleton instance
export const a11yManager = new AccessibilityManager();

// Utility functions for accessibility
export const a11yUtils = {
	// Generate unique IDs
	generateId(prefix: string = 'a11y'): string {
		return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
	},

	// Check if element is visible to screen readers
	isVisibleToScreenReader(element: HTMLElement): boolean {
		const style = window.getComputedStyle(element);
		return (
			style.display !== 'none' &&
			style.visibility !== 'hidden' &&
			element.getAttribute('aria-hidden') !== 'true'
		);
	},

	// Get accessible name for element
	getAccessibleName(element: HTMLElement): string {
		// Check aria-label
		const ariaLabel = element.getAttribute('aria-label');
		if (ariaLabel) return ariaLabel;

		// Check aria-labelledby
		const labelledBy = element.getAttribute('aria-labelledby');
		if (labelledBy) {
			const labelElement = document.getElementById(labelledBy);
			if (labelElement) return labelElement.textContent || '';
		}

		// Check associated label
		if (element.id) {
			const label = document.querySelector(`label[for="${element.id}"]`);
			if (label) return label.textContent || '';
		}

		// Fallback to text content or alt text
		return element.textContent || element.getAttribute('alt') || '';
	},

	// Validate ARIA attributes
	validateAriaAttributes(element: HTMLElement): string[] {
		const errors: string[] = [];

		// Check required ARIA attributes
		const role = element.getAttribute('role');
		if (role) {
			switch (role) {
				case 'button':
					if (
						!element.getAttribute('aria-pressed') &&
						!element.getAttribute('aria-expanded')
					) {
						// Optional for buttons
					}
					break;
				case 'checkbox':
				case 'radio':
					if (!element.hasAttribute('aria-checked')) {
						errors.push('Missing aria-checked for checkbox/radio role');
					}
					break;
				case 'tab':
					if (!element.hasAttribute('aria-selected')) {
						errors.push('Missing aria-selected for tab role');
					}
					break;
			}
		}

		return errors;
	},

	// Keyboard navigation helpers
	isNavigationKey(key: string): boolean {
		return [
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
			'Home',
			'End',
			'PageUp',
			'PageDown',
		].includes(key);
	},

	isActivationKey(key: string): boolean {
		return ['Enter', ' '].includes(key);
	},
};

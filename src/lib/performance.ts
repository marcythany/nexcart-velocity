/* eslint-disable @typescript-eslint/no-explicit-any */
// Performance monitoring and optimization utilities
export class PerformanceMonitor {
	private metrics: Map<string, number> = new Map();
	private observers: PerformanceObserver[] = [];

	constructor() {
		this.initObservers();
	}

	private initObservers(): void {
		// Observe Largest Contentful Paint (LCP)
		if ('PerformanceObserver' in window) {
			try {
				const lcpObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lastEntry = entries[entries.length - 1];
					this.metrics.set('LCP', lastEntry.startTime);
					console.log('LCP:', lastEntry.startTime);
				});
				lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
				this.observers.push(lcpObserver);

				// Observe First Input Delay (FID)
				const fidObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					entries.forEach((entry) => {
						this.metrics.set(
							'FID',
							(entry as any).processingStart - entry.startTime
						);

						console.log(
							'FID:',
							(entry as any).processingStart - entry.startTime
						);
					});
				});
				fidObserver.observe({ entryTypes: ['first-input'] });
				this.observers.push(fidObserver);

				// Observe Cumulative Layout Shift (CLS)
				const clsObserver = new PerformanceObserver((list) => {
					let clsValue = 0;
					const entries = list.getEntries();
					entries.forEach((entry) => {
						if (!(entry as any).hadRecentInput) {
							clsValue += (entry as any).value;
						}
					});
					this.metrics.set('CLS', clsValue);
					console.log('CLS:', clsValue);
				});
				clsObserver.observe({ entryTypes: ['layout-shift'] });
				this.observers.push(clsObserver);
			} catch (error) {
				console.warn('Performance Observer not supported:', error);
			}
		}
	}

	// Measure custom performance metrics
	startMark(name: string): void {
		if ('performance' in window && performance.mark) {
			performance.mark(`${name}-start`);
		}
	}

	endMark(name: string): number {
		if ('performance' in window && performance.mark && performance.measure) {
			try {
				performance.mark(`${name}-end`);
				performance.measure(name, `${name}-start`, `${name}-end`);
				const measure = performance.getEntriesByName(name)[0];
				const duration = measure.duration;
				this.metrics.set(name, duration);
				return duration;
			} catch (error) {
				console.warn('Performance measure failed:', error);
				return 0;
			}
		}
		return 0;
	}

	// Get Core Web Vitals
	getCoreWebVitals(): {
		LCP?: number;
		FID?: number;
		CLS?: number;
	} {
		return {
			LCP: this.metrics.get('LCP'),
			FID: this.metrics.get('FID'),
			CLS: this.metrics.get('CLS'),
		};
	}

	// Get all metrics
	getAllMetrics(): Record<string, number> {
		return Object.fromEntries(this.metrics);
	}

	// Report metrics to analytics
	reportMetrics(): void {
		const metrics = this.getAllMetrics();

		// Send to analytics service (implement based on your analytics provider)
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', 'web_vitals', {
				event_category: 'Web Vitals',
				event_label: 'Performance Metrics',
				value: JSON.stringify(metrics),
			});
		}

		console.log('Performance Metrics:', metrics);
	}

	// Cleanup observers
	destroy(): void {
		this.observers.forEach((observer) => observer.disconnect());
		this.observers = [];
	}
}

// Create singleton instance
export const perfMonitor = new PerformanceMonitor();

// Utility functions for performance optimization
export const performanceUtils = {
	// Debounce function for performance
	debounce<T extends (...args: any[]) => any>(
		func: T,
		wait: number
	): (...args: Parameters<T>) => void {
		let timeout: NodeJS.Timeout;
		return (...args: Parameters<T>) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	},

	// Throttle function for performance
	throttle<T extends (...args: any[]) => any>(
		func: T,
		limit: number
	): (...args: Parameters<T>) => void {
		let inThrottle: boolean;
		return (...args: Parameters<T>) => {
			if (!inThrottle) {
				func(...args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	},

	// Lazy load images
	lazyLoadImage(img: HTMLImageElement): void {
		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const lazyImage = entry.target as HTMLImageElement;
					lazyImage.src = lazyImage.dataset.src || '';
					lazyImage.classList.remove('lazy');
					imageObserver.unobserve(lazyImage);
				}
			});
		});
		imageObserver.observe(img);
	},

	// Preload critical resources
	preloadResource(href: string, as: string): void {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = as;
		link.href = href;
		document.head.appendChild(link);
	},

	// Check if user prefers reduced motion
	prefersReducedMotion(): boolean {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	},

	// Get device memory (if available)
	getDeviceMemory(): number | undefined {
		return (navigator as any).deviceMemory;
	},

	// Get network information
	getNetworkInfo(): {
		effectiveType?: string;
		downlink?: number;
		rtt?: number;
	} {
		const connection = (navigator as any).connection;
		if (connection) {
			return {
				effectiveType: connection.effectiveType,
				downlink: connection.downlink,
				rtt: connection.rtt,
			};
		}
		return {};
	},
};

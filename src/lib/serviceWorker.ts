/* eslint-disable @typescript-eslint/no-explicit-any */
// Service Worker registration and management
export class ServiceWorkerManager {
	private registration: ServiceWorkerRegistration | null = null;
	private updateAvailable = false;
	private updateCallbacks: (() => void)[] = [];

	async register(): Promise<void> {
		if (!('serviceWorker' in navigator)) {
			console.log('Service Worker not supported');
			return;
		}

		try {
			this.registration = await navigator.serviceWorker.register('/sw.js', {
				scope: '/',
			});

			console.log('Service Worker registered:', this.registration);

			// Handle updates
			this.registration.addEventListener('updatefound', () => {
				const newWorker = this.registration?.installing;
				if (newWorker) {
					newWorker.addEventListener('statechange', () => {
						if (
							newWorker.state === 'installed' &&
							navigator.serviceWorker.controller
						) {
							this.updateAvailable = true;
							this.notifyUpdateCallbacks();
						}
					});
				}
			});

			// Handle controller change (new SW activated)
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				console.log('Service Worker updated');
				window.location.reload();
			});
		} catch (error) {
			console.error('Service Worker registration failed:', error);
		}
	}

	async unregister(): Promise<void> {
		if (this.registration) {
			await this.registration.unregister();
			this.registration = null;
			console.log('Service Worker unregistered');
		}
	}

	update(): void {
		if (this.registration?.waiting) {
			this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
		}
	}

	onUpdate(callback: () => void): void {
		this.updateCallbacks.push(callback);
		if (this.updateAvailable) {
			callback();
		}
	}

	private notifyUpdateCallbacks(): void {
		this.updateCallbacks.forEach((callback) => callback());
	}

	// Send messages to service worker
	async sendMessage(message: any): Promise<any> {
		if (!this.registration?.active) {
			throw new Error('Service Worker not active');
		}

		return new Promise((resolve, reject) => {
			const messageChannel = new MessageChannel();

			messageChannel.port1.onmessage = (event) => {
				if (event.data.error) {
					reject(event.data.error);
				} else {
					resolve(event.data);
				}
			};

			this.registration!.active!.postMessage(message, [messageChannel.port2]);
		});
	}

	// Check if service worker is controlling the page
	isControlling(): boolean {
		return !!navigator.serviceWorker.controller;
	}

	// Get service worker state
	getState(): string {
		if (!this.registration) return 'not-registered';

		const worker =
			this.registration.active ||
			this.registration.waiting ||
			this.registration.installing;
		return worker?.state || 'unknown';
	}
}

// Create singleton instance
export const swManager = new ServiceWorkerManager();

// Auto-register on page load (client-side only)
if (typeof window !== 'undefined') {
	window.addEventListener('load', () => {
		swManager.register();
	});
}

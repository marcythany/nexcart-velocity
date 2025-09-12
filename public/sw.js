// Service Worker for Nexcart Velocity
const CACHE_NAME = 'nexcart-velocity-v1';
const STATIC_CACHE = 'nexcart-static-v1';
const DYNAMIC_CACHE = 'nexcart-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
	'/',
	'/favicon.ico',
	'/manifest.json',
	// Add other static assets as needed
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
	console.log('Service Worker: Installing...');
	event.waitUntil(
		caches.open(STATIC_CACHE).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
		})
	);
	self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	console.log('Service Worker: Activating...');
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter(
						(cacheName) =>
							cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
					)
					.map((cacheName) => caches.delete(cacheName))
			);
		})
	);
	self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== 'GET') return;

	// Skip Chrome extension requests
	if (url.protocol === 'chrome-extension:') return;

	// Handle API requests
	if (url.pathname.startsWith('/api/')) {
		event.respondWith(handleApiRequest(request));
		return;
	}

	// Handle image requests
	if (request.destination === 'image') {
		event.respondWith(handleImageRequest(request));
		return;
	}

	// Handle other requests
	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(request)
				.then((response) => {
					// Don't cache non-successful responses
					if (!response.ok) return response;

					// Clone the response for caching
					const responseClone = response.clone();

					caches.open(DYNAMIC_CACHE).then((cache) => {
						cache.put(request, responseClone);
					});

					return response;
				})
				.catch(() => {
					// Return offline fallback for navigation requests
					if (request.mode === 'navigate') {
						return (
							caches.match('/offline.html') ||
							new Response('Offline', { status: 503 })
						);
					}
				});
		})
	);
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
	try {
		const response = await fetch(request);

		// Cache successful responses
		if (response.ok) {
			const cache = await caches.open(DYNAMIC_CACHE);
			cache.put(request, response.clone());
		}

		return response;
	} catch (error) {
		// Try to serve from cache if network fails
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		// Return error response
		return new Response(JSON.stringify({ error: 'Network error' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
	const cachedResponse = await caches.match(request);

	if (cachedResponse) {
		return cachedResponse;
	}

	try {
		const response = await fetch(request);

		if (response.ok) {
			const cache = await caches.open(DYNAMIC_CACHE);
			cache.put(request, response.clone());
		}

		return response;
	} catch (error) {
		// Return a placeholder image for failed image requests
		return new Response('', { status: 404 });
	}
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		event.waitUntil(doBackgroundSync());
	}
});

async function doBackgroundSync() {
	// Implement background sync logic here
	console.log('Background sync triggered');
}

// Push notifications
self.addEventListener('push', (event) => {
	if (event.data) {
		const data = event.data.json();

		const options = {
			body: data.body,
			icon: '/icon-192x192.png',
			badge: '/badge-72x72.png',
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: data.primaryKey,
			},
		};

		event.waitUntil(self.registration.showNotification(data.title, options));
	}
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});

// Periodic background fetch (if supported)
self.addEventListener('periodicsync', (event) => {
	if (event.tag === 'content-sync') {
		event.waitUntil(syncContent());
	}
});

async function syncContent() {
	// Implement periodic content sync
	console.log('Periodic content sync');
}

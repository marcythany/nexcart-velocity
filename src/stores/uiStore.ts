import { create } from 'zustand';

interface ModalState {
	id: string;
	isOpen: boolean;
	data?: Record<string, unknown>;
}

interface NotificationState {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	duration?: number;
}

interface UIState {
	// Modal states
	modals: ModalState[];

	// Loading states
	isLoading: boolean;
	loadingMessage?: string;

	// Notifications
	notifications: NotificationState[];

	// Theme
	theme: 'light' | 'dark' | 'system';

	// Sidebar/Cart states
	isCartOpen: boolean;
	isMobileMenuOpen: boolean;

	// Actions
	openModal: (id: string, data?: Record<string, unknown>) => void;
	closeModal: (id: string) => void;
	closeAllModals: () => void;

	setLoading: (loading: boolean, message?: string) => void;

	addNotification: (notification: Omit<NotificationState, 'id'>) => void;
	removeNotification: (id: string) => void;
	clearNotifications: () => void;

	setTheme: (theme: 'light' | 'dark' | 'system') => void;

	toggleCart: () => void;
	setCartOpen: (open: boolean) => void;

	toggleMobileMenu: () => void;
	setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
	modals: [],
	isLoading: false,
	notifications: [],
	theme: 'system',
	isCartOpen: false,
	isMobileMenuOpen: false,

	openModal: (id, data) => {
		set((state) => ({
			modals: [
				...state.modals.filter((modal) => modal.id !== id),
				{ id, isOpen: true, data },
			],
		}));
	},

	closeModal: (id) => {
		set((state) => ({
			modals: state.modals.map((modal) =>
				modal.id === id ? { ...modal, isOpen: false } : modal
			),
		}));
	},

	closeAllModals: () => {
		set((state) => ({
			modals: state.modals.map((modal) => ({ ...modal, isOpen: false })),
		}));
	},

	setLoading: (loading, message) => {
		set({ isLoading: loading, loadingMessage: message });
	},

	addNotification: (notification) => {
		const id = `notification-${Date.now()}-${Math.random()}`;
		const newNotification: NotificationState = {
			...notification,
			id,
		};

		set((state) => ({
			notifications: [...state.notifications, newNotification],
		}));

		// Auto-remove notification after duration
		if (newNotification.duration !== 0) {
			setTimeout(() => {
				get().removeNotification(id);
			}, newNotification.duration || 5000);
		}
	},

	removeNotification: (id) => {
		set((state) => ({
			notifications: state.notifications.filter((n) => n.id !== id),
		}));
	},

	clearNotifications: () => {
		set({ notifications: [] });
	},

	setTheme: (theme) => {
		set({ theme });

		// Apply theme to document
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else if (theme === 'light') {
			root.classList.remove('dark');
		} else {
			// System theme
			const prefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			if (prefersDark) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		}
	},

	toggleCart: () => {
		set((state) => ({ isCartOpen: !state.isCartOpen }));
	},

	setCartOpen: (open) => {
		set({ isCartOpen: open });
	},

	toggleMobileMenu: () => {
		set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
	},

	setMobileMenuOpen: (open) => {
		set({ isMobileMenuOpen: open });
	},
}));

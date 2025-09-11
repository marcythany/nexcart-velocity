import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: 'customer' | 'admin';
}

interface UserState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	preferences: UserPreferences;

	// Actions
	login: (user: User) => void;
	logout: () => void;
	updateProfile: (updates: Partial<User>) => void;
	updatePreferences: (preferences: Partial<UserPreferences>) => void;
	setLoading: (loading: boolean) => void;
}

interface UserPreferences {
	theme: 'light' | 'dark' | 'system';
	currency: string;
	language: string;
	notifications: {
		email: boolean;
		push: boolean;
		sms: boolean;
	};
}

const defaultPreferences: UserPreferences = {
	theme: 'system',
	currency: 'USD',
	language: 'en',
	notifications: {
		email: true,
		push: true,
		sms: false,
	},
};

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			preferences: defaultPreferences,

			login: (user) => {
				set({
					user,
					isAuthenticated: true,
					isLoading: false,
				});
			},

			logout: () => {
				set({
					user: null,
					isAuthenticated: false,
					isLoading: false,
				});
			},

			updateProfile: (updates) => {
				const { user } = get();
				if (user) {
					set({
						user: { ...user, ...updates },
					});
				}
			},

			updatePreferences: (newPreferences) => {
				set((state) => ({
					preferences: { ...state.preferences, ...newPreferences },
				}));
			},

			setLoading: (loading) => {
				set({ isLoading: loading });
			},
		}),
		{
			name: 'user-storage',
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				preferences: state.preferences,
			}),
		}
	)
);

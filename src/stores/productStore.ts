import { create } from 'zustand';

export interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviewCount: number;
	image: string;
	images?: string[];
	description: string;
	category: string;
	inStock: boolean;
	isNew?: boolean;
	isOnSale?: boolean;
	variants?: ProductVariant[];
	tags?: string[];
}

export interface ProductVariant {
	id: string;
	name: string;
	value: string;
	available: boolean;
}

export interface ProductFilters {
	category?: string;
	priceRange?: [number, number];
	rating?: number;
	inStock?: boolean;
	tags?: string[];
	sortBy?: 'name' | 'price' | 'rating' | 'newest';
	sortOrder?: 'asc' | 'desc';
}

interface ProductState {
	products: Product[];
	filteredProducts: Product[];
	filters: ProductFilters;
	searchQuery: string;
	isLoading: boolean;
	error: string | null;

	// Actions
	setProducts: (products: Product[]) => void;
	setFilters: (filters: Partial<ProductFilters>) => void;
	setSearchQuery: (query: string) => void;
	clearFilters: () => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	getFilteredProducts: () => Product[];
	applyFilters: () => void;
}

const defaultFilters: ProductFilters = {
	sortBy: 'name',
	sortOrder: 'asc',
};

export const useProductStore = create<ProductState>((set, get) => ({
	products: [],
	filteredProducts: [],
	filters: defaultFilters,
	searchQuery: '',
	isLoading: false,
	error: null,

	setProducts: (products) => {
		set({ products });
		get().applyFilters();
	},

	setFilters: (newFilters) => {
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
		}));
		get().applyFilters();
	},

	setSearchQuery: (query) => {
		set({ searchQuery: query });
		get().applyFilters();
	},

	clearFilters: () => {
		set({
			filters: defaultFilters,
			searchQuery: '',
		});
		get().applyFilters();
	},

	setLoading: (loading) => {
		set({ isLoading: loading });
	},

	setError: (error) => {
		set({ error });
	},

	getFilteredProducts: () => {
		return get().filteredProducts;
	},

	// Helper function to apply filters and search
	applyFilters: () => {
		const { products, filters, searchQuery } = get();

		let filtered = [...products];

		// Apply search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query) ||
					product.category.toLowerCase().includes(query) ||
					product.tags?.some((tag) => tag.toLowerCase().includes(query))
			);
		}

		// Apply category filter
		if (filters.category) {
			filtered = filtered.filter(
				(product) => product.category === filters.category
			);
		}

		// Apply price range filter
		if (filters.priceRange) {
			const [min, max] = filters.priceRange;
			filtered = filtered.filter(
				(product) => product.price >= min && product.price <= max
			);
		}

		// Apply rating filter
		if (filters.rating) {
			filtered = filtered.filter(
				(product) => product.rating >= filters.rating!
			);
		}

		// Apply stock filter
		if (filters.inStock !== undefined) {
			filtered = filtered.filter(
				(product) => product.inStock === filters.inStock
			);
		}

		// Apply tags filter
		if (filters.tags && filters.tags.length > 0) {
			filtered = filtered.filter((product) =>
				filters.tags!.some((tag) => product.tags?.includes(tag))
			);
		}

		// Apply sorting
		if (filters.sortBy) {
			filtered.sort((a, b) => {
				let aValue: string | number;
				let bValue: string | number;

				switch (filters.sortBy) {
					case 'name':
						aValue = a.name.toLowerCase();
						bValue = b.name.toLowerCase();
						break;
					case 'price':
						aValue = a.price;
						bValue = b.price;
						break;
					case 'rating':
						aValue = a.rating;
						bValue = b.rating;
						break;
					case 'newest':
						aValue = a.isNew ? 1 : 0;
						bValue = b.isNew ? 1 : 0;
						break;
					default:
						return 0;
				}

				if (filters.sortOrder === 'desc') {
					return (
						aValue > bValue ? -1
						: aValue < bValue ? 1
						: 0
					);
				}
				return (
					aValue < bValue ? -1
					: aValue > bValue ? 1
					: 0
				);
			});
		}

		set({ filteredProducts: filtered });
	},
}));

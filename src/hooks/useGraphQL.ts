import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {
	ADD_TO_CART,
	ADD_TO_WISHLIST,
	CHANGE_PASSWORD,
	CLEAR_CART,
	CREATE_ORDER,
	CREATE_REVIEW,
	LOGIN,
	LOGOUT,
	REGISTER,
	REMOVE_FROM_CART,
	REMOVE_FROM_WISHLIST,
	UPDATE_CART_ITEM,
	UPDATE_ORDER_STATUS,
	UPDATE_REVIEW,
	UPDATE_USER_PROFILE,
} from '../lib/graphql/mutations';
import {
	GET_CART,
	GET_CATEGORIES,
	GET_CURRENT_USER,
	GET_ORDERS,
	GET_PRODUCT,
	GET_PRODUCT_REVIEWS,
	GET_PRODUCTS,
	GET_WISHLIST,
} from '../lib/graphql/queries';
import type {
	PaginationInput,
	ProductFilter,
	ProductSort,
	ProductsQueryVariables,
} from '../types/graphql';

// Product Hooks
export const useProducts = (variables?: ProductsQueryVariables) => {
	return useQuery(GET_PRODUCTS, {
		variables,
		fetchPolicy: 'cache-first',
	});
};

export const useProduct = (id: string) => {
	return useQuery(GET_PRODUCT, {
		variables: { id },
		fetchPolicy: 'cache-first',
	});
};

export const useLazyProducts = () => {
	return useLazyQuery(GET_PRODUCTS);
};

export const useCategories = () => {
	return useQuery(GET_CATEGORIES, {
		fetchPolicy: 'cache-first',
	});
};

// Cart Hooks
export const useCart = () => {
	return useQuery(GET_CART, {
		fetchPolicy: 'cache-first',
	});
};

export const useAddToCart = () => {
	return useMutation(ADD_TO_CART, {
		refetchQueries: [{ query: GET_CART }],
	});
};

export const useUpdateCartItem = () => {
	return useMutation(UPDATE_CART_ITEM, {
		refetchQueries: [{ query: GET_CART }],
	});
};

export const useRemoveFromCart = () => {
	return useMutation(REMOVE_FROM_CART, {
		refetchQueries: [{ query: GET_CART }],
	});
};

export const useClearCart = () => {
	return useMutation(CLEAR_CART, {
		refetchQueries: [{ query: GET_CART }],
	});
};

// User Hooks
export const useCurrentUser = () => {
	return useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-first',
	});
};

export const useLogin = () => {
	return useMutation(LOGIN);
};

export const useRegister = () => {
	return useMutation(REGISTER);
};

export const useLogout = () => {
	return useMutation(LOGOUT);
};

export const useUpdateUserProfile = () => {
	return useMutation(UPDATE_USER_PROFILE, {
		refetchQueries: [{ query: GET_CURRENT_USER }],
	});
};

export const useChangePassword = () => {
	return useMutation(CHANGE_PASSWORD);
};

// Order Hooks
export const useOrders = (variables?: { pagination?: PaginationInput }) => {
	return useQuery(GET_ORDERS, {
		variables,
		fetchPolicy: 'cache-first',
	});
};

export const useCreateOrder = () => {
	return useMutation(CREATE_ORDER, {
		refetchQueries: [{ query: GET_CART }, { query: GET_ORDERS }],
	});
};

export const useUpdateOrderStatus = () => {
	return useMutation(UPDATE_ORDER_STATUS);
};

// Review Hooks
export const useProductReviews = (
	productId: string,
	variables?: { pagination?: PaginationInput }
) => {
	return useQuery(GET_PRODUCT_REVIEWS, {
		variables: { productId, ...variables },
		fetchPolicy: 'cache-first',
	});
};

export const useCreateReview = () => {
	return useMutation(CREATE_REVIEW);
};

export const useUpdateReview = () => {
	return useMutation(UPDATE_REVIEW);
};

// Wishlist Hooks
export const useWishlist = () => {
	return useQuery(GET_WISHLIST, {
		fetchPolicy: 'cache-first',
	});
};

export const useAddToWishlist = () => {
	return useMutation(ADD_TO_WISHLIST, {
		refetchQueries: [{ query: GET_WISHLIST }],
	});
};

export const useRemoveFromWishlist = () => {
	return useMutation(REMOVE_FROM_WISHLIST, {
		refetchQueries: [{ query: GET_WISHLIST }],
	});
};

// Utility Hooks
export const useProductFilters = () => {
	const [filters, setFilters] = React.useState<ProductFilter>({});
	const [sort, setSort] = React.useState<ProductSort>({
		field: 'name',
		order: 'asc',
	});
	const [pagination, setPagination] = React.useState<PaginationInput>({
		page: 1,
		limit: 20,
	});

	const updateFilters = (newFilters: Partial<ProductFilter>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
		setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
	};

	const updateSort = (newSort: Partial<ProductSort>) => {
		setSort((prev) => ({ ...prev, ...newSort }));
	};

	const updatePagination = (newPagination: Partial<PaginationInput>) => {
		setPagination((prev) => ({ ...prev, ...newPagination }));
	};

	return {
		filters,
		sort,
		pagination,
		updateFilters,
		updateSort,
		updatePagination,
	};
};

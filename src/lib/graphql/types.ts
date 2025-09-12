/* eslint-disable @typescript-eslint/no-explicit-any */
// Simplified GraphQL types for the resolvers
// In production, use graphql-code-generator to auto-generate these

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	DateTime: Date;
};

// Core types for resolvers
export type Resolvers<ContextType = any> = {
	Query?: QueryResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
};

export type QueryResolvers<ContextType = any> = {
	products?: (parent: any, args: any, context: ContextType, info: any) => any;
	product?: (parent: any, args: any, context: ContextType, info: any) => any;
	categories?: (parent: any, args: any, context: ContextType, info: any) => any;
	category?: (parent: any, args: any, context: ContextType, info: any) => any;
	cart?: (parent: any, args: any, context: ContextType, info: any) => any;
	orders?: (parent: any, args: any, context: ContextType, info: any) => any;
	order?: (parent: any, args: any, context: ContextType, info: any) => any;
	me?: (parent: any, args: any, context: ContextType, info: any) => any;
	productReviews?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	wishlist?: (parent: any, args: any, context: ContextType, info: any) => any;
};

export type MutationResolvers<ContextType = any> = {
	register?: (parent: any, args: any, context: ContextType, info: any) => any;
	login?: (parent: any, args: any, context: ContextType, info: any) => any;
	logout?: (parent: any, args: any, context: ContextType, info: any) => any;
	addToCart?: (parent: any, args: any, context: ContextType, info: any) => any;
	updateCartItem?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	removeFromCart?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	clearCart?: (parent: any, args: any, context: ContextType, info: any) => any;
	createOrder?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	updateOrderStatus?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	updateUser?: (parent: any, args: any, context: ContextType, info: any) => any;
	changePassword?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	createReview?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	updateReview?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	addToWishlist?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
	removeFromWishlist?: (
		parent: any,
		args: any,
		context: ContextType,
		info: any
	) => any;
};

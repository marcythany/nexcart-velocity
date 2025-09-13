import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
	uri:
		process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:3000/api/graphql',
});

// Create auth link for adding authorization headers
const authLink = setContext((_, { headers }) => {
	// Get token from localStorage or your auth store
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

// Create Apollo Client function for SSR
export function createApolloClient(initialState?: NormalizedCacheObject) {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined', // Enable SSR mode on server
		link: authLink.concat(httpLink),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// Custom merge function for products pagination
						products: {
							keyArgs: ['filter', 'sort'],
							merge(
								existing = {
									items: [],
									totalCount: 0,
									hasNextPage: false,
									hasPreviousPage: false,
								},
								incoming,
								{ args }
							) {
								// For pagination, merge the items
								if (args?.pagination?.page && args.pagination.page > 1) {
									return {
										...incoming,
										items: [...existing.items, ...incoming.items],
									};
								}
								// For first page or new query, replace
								return incoming;
							},
						},
						// Cart cache updates
						cart: {
							merge(_existing, incoming) {
								return incoming;
							},
						},
						// Wishlist cache updates
						wishlist: {
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							merge(_existing = [], incoming) {
								return incoming;
							},
						},
					},
				},
				// Product type policies
				Product: {
					fields: {
						// Cache product rating updates
						rating: {
							merge(_existing, incoming) {
								return incoming;
							},
						},
						reviewCount: {
							merge(_existing, incoming) {
								return incoming;
							},
						},
					},
				},
			},
		}).restore(initialState || {}),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'cache-first',
				errorPolicy: 'ignore',
			},
			query: {
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			},
			mutate: {
				errorPolicy: 'all',
			},
		},
	});
}

// Global Apollo Client instance for client-side
let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export function getApolloClient(initialState?: NormalizedCacheObject) {
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') {
		return createApolloClient(initialState);
	}

	// Create the Apollo Client once in the client
	if (!globalApolloClient) {
		globalApolloClient = createApolloClient(initialState);
	}

	return globalApolloClient;
}

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
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

// Create Apollo Client
export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					// Define custom cache policies for better performance
					products: {
						keyArgs: ['filter', 'sort'],
						merge(existing = [], incoming) {
							return [...existing, ...incoming];
						},
					},
				},
			},
		},
	}),
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

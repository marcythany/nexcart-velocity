'use client';

import {
	ApolloProvider as BaseApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';
import { getApolloClient } from '../../lib/apollo';

interface ApolloProviderProps {
	children: React.ReactNode;
	initialState?: NormalizedCacheObject;
}

export default function ApolloProvider({
	children,
	initialState,
}: ApolloProviderProps) {
	const client = useMemo(() => getApolloClient(initialState), [initialState]);

	return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

import { resolvers } from '@/lib/graphql/resolvers';
import { typeDefs } from '@/lib/graphql/schema';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

// Create Apollo Server instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
	// Enable introspection for development
	introspection: process.env.NODE_ENV !== 'production',
	// Enable playground for development
	...(process.env.NODE_ENV !== 'production' && {
		plugins: [],
	}),
});

// Create the handler for Next.js API routes
const handler = startServerAndCreateNextHandler(server, {
	context: async (req) => {
		// You can add authentication context here
		// For example, extract user from JWT token
		return {
			req,
			// user: await getUserFromToken(req.headers.authorization),
		};
	},
});

export async function GET(request: Request) {
	return handler(request);
}

export async function POST(request: Request) {
	return handler(request);
}

export async function GET() {
	const debugInfo = {
		timestamp: new Date().toISOString(),
		node_env: process.env.NODE_ENV,
		next_runtime: process.env.NEXT_RUNTIME,
		vercel_env: process.env.VERCEL_ENV,
		vercel_url: process.env.VERCEL_URL,
		graphql_uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
		cwd: process.cwd(),
		files: {
			'src/app/api/graphql/route.ts': 'exists',
			'src/lib/graphql/schema.ts': 'exists',
			'src/lib/graphql/resolvers.ts': 'exists',
		},
	};

	return Response.json(debugInfo);
}

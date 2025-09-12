export async function GET() {
	return Response.json({
		status: 'ok',
		service: 'Nexcart Velocity API',
		endpoints: {
			graphql: '/api/graphql',
			health: '/api/health',
			test: '/api/test',
			debug: '/api/debug',
		},
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		memory: process.memoryUsage(),
	});
}

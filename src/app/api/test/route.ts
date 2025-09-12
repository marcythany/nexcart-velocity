export async function GET() {
	return Response.json({
		message: 'API routes are working!',
		timestamp: new Date().toISOString(),
		endpoint: '/api/test',
	});
}

export async function POST(request: Request) {
	const body = await request.json();
	return Response.json({
		message: 'POST request received',
		data: body,
		timestamp: new Date().toISOString(),
	});
}

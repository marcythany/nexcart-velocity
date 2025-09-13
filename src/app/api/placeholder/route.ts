import { NextRequest, NextResponse } from 'next/server';

// Placeholder image service that redirects to external services
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const width = searchParams.get('width') || '400';
	const height = searchParams.get('height') || '400';
	const category = searchParams.get('category') || 'product';

	// Use different placeholder services based on category
	let placeholderUrl: string;

	if (category === 'product') {
		// Use productplaceholder.com for product images
		placeholderUrl = `https://productplaceholder.com/${width}x${height}`;
	} else {
		// Use Shopify placeholder for other images
		placeholderUrl = `https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-${width}x${height}.png`;
	}

	try {
		// Redirect to the external placeholder service
		return NextResponse.redirect(placeholderUrl, { status: 302 });
	} catch (error) {
		// Fallback to a simple colored rectangle if external service fails
		return new NextResponse(
			`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
				<rect width="100%" height="100%" fill="#f3f4f6"/>
				<text x="50%" y="50%" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
					${width}x${height}
				</text>
			</svg>`,
			{
				headers: {
					'Content-Type': 'image/svg+xml',
					'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
				},
			}
		);
	}
}

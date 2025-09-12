import ApolloProvider from '@/components/atoms/ApolloProvider';
import MotionProvider from '@/components/atoms/MotionProvider';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manropeFont = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: {
		default: 'NexCart Velocity - Modern E-commerce Platform',
		template: '%s | NexCart Velocity',
	},
	description:
		'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service with our modern e-commerce platform.',
	keywords: [
		'ecommerce',
		'shopping',
		'online store',
		'fast delivery',
		'secure payments',
	],
	authors: [{ name: 'NexCart Team' }],
	creator: 'NexCart Velocity',
	publisher: 'NexCart Velocity',
	metadataBase: new URL('https://nexcart-velocity.com'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://nexcart-velocity.com',
		title: 'NexCart Velocity - Modern E-commerce Platform',
		description:
			'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.',
		siteName: 'NexCart Velocity',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'NexCart Velocity - Modern E-commerce Platform',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'NexCart Velocity - Modern E-commerce Platform',
		description:
			'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.',
		images: ['/og-image.jpg'],
		creator: '@nexcartvelocity',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-site-verification-code',
		yandex: 'your-yandex-verification-code',
		yahoo: 'your-yahoo-verification-code',
	},
	category: 'ecommerce',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#9ca3af' },
		{ media: '(prefers-color-scheme: dark)', color: '#374151' },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${manropeFont.variable} textured-bg`}>
			<head>
				{/* Preconnect to external domains for performance */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>

				{/* Favicon and app icons */}
				<link rel='icon' href='/favicon.ico' sizes='any' />
				<link rel='icon' href='/icon.svg' type='image/svg+xml' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<link rel='manifest' href='/manifest.json' />

				{/* Canonical URL will be set by pages */}
			</head>
			<body>
				{/* Skip to main content link for accessibility */}
				<a
					href='#main-content'
					className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-text-inverted px-4 py-2 rounded-md z-50'
				>
					Skip to main content
				</a>

				<ApolloProvider>
					<MotionProvider>{children}</MotionProvider>
				</ApolloProvider>

				{/* Screen reader announcements */}
				<div
					id='sr-announcements'
					aria-live='polite'
					aria-atomic='true'
					className='sr-only'
				/>

				{/* Structured data for SEO */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'NexCart Velocity',
							url: 'https://nexcart-velocity.com',
							logo: 'https://nexcart-velocity.com/logo.png',
							description: 'A blazing fast e-commerce platform',
							sameAs: [
								'https://twitter.com/nexcartvelocity',
								'https://facebook.com/nexcartvelocity',
							],
						}),
					}}
				/>
			</body>
		</html>
	);
}

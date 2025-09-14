import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	bundlePagesRouterDependencies: true,
	serverExternalPackages: [
		'@storybook/types',
		'playwright',
		'cypress',
		'sharp',
	],
	typescript: {
		ignoreBuildErrors: false,
	},
	experimental: {
		optimizePackageImports: ['lucide-react', 'motion'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'fakestoreapi.com',
				port: '',
				pathname: '/img/**',
			},
		],
	},
};

export default nextConfig;

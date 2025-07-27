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
};

export default nextConfig;

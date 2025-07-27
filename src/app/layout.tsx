import MotionProvider from '@/components/atoms/MotionProvider';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manropeFont = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'NexCart Velocity',
	description: 'A blazing fast e-commerce platform',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${manropeFont.variable} textured-bg`}>
			<body>
				<MotionProvider>{children}</MotionProvider>
			</body>
		</html>
	);
}

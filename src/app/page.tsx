'use client';

import {
	Bolt,
	BrainCircuit,
	LayoutTemplate,
	PenSquare,
	Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

const FEATURES = [
	{
		icon: <PenSquare size={48} strokeWidth={1.5} className='text-primary' />,
		title: 'Customizable Storefronts',
		description:
			'Create stunning storefronts without coding using our drag-and-drop builder.',
	},
	{
		icon: <Zap size={48} strokeWidth={1.5} className='text-primary' />,
		title: 'Lightning Fast Checkout',
		description:
			'Optimized checkout flow that converts 35% better than traditional solutions.',
	},
	{
		icon: <BrainCircuit size={48} strokeWidth={1.5} className='text-primary' />,
		title: 'AI-Powered Analytics',
		description:
			'Get actionable insights to optimize your sales strategy and inventory.',
	},
];

export default function Home() {
	return (
		<main className='min-h-screen bg-bg-base'>
			{/* Hero Section */}
			<HeroSection />

			{/* Features Section */}
			<FeaturesSection />

			{/* CTA Section */}
			<CTASection />
		</main>
	);
}

function HeroSection() {
	return (
		<section className='container mx-auto px-4 py-24 text-center'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<h1 className='text-3xl md:text-4xl font-display font-bold tracking-tight text-text-base mb-6'>
					Welcome to Nexcart Velocity
				</h1>
				<p className='text-lg text-text-muted max-w-3xl mx-auto mb-10'>
					Accelerating your e-commerce experience with cutting-edge performance
				</p>
				<div className='flex flex-col sm:flex-row justify-center gap-4'>
					<Link
						href='/dashboard'
						className='btn focus-ring bg-primary text-text-inverted hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0'
					>
						<LayoutTemplate size={20} />
						Go to Dashboard
					</Link>
					<Link
						href='/_auth/login'
						className='btn focus-ring bg-bg-base text-primary border border-border hover:bg-bg-alt'
					>
						<Zap size={20} />
						Sign In
					</Link>
				</div>
			</motion.div>
		</section>
	);
}

function FeaturesSection() {
	return (
		<section className='py-20 bg-bg-alt'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: '-100px' }}
					className='text-center mb-16'
				>
					<h2 className='text-2xl md:text-3xl font-display font-bold text-text-base mb-4'>
						Powerful E-commerce Solutions
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto rounded-organic' />
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
					{FEATURES.map((feature, index) => (
						<FeatureCard
							key={index}
							index={index}
							feature={feature}
							isMiddleCard={index === 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
	index,
	feature,
	isMiddleCard,
}: {
	index: number;
	feature: (typeof FEATURES)[0];
	isMiddleCard: boolean;
}) {
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const card = cardRef.current;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--mouse-x', `${x}px`);
		card.style.setProperty('--mouse-y', `${y}px`);
	};

	return (
		<motion.div
			ref={cardRef}
			className={`card p-8 flex flex-col items-center hover-scale ${
				isMiddleCard ? 'card-no-radius' : ''
			}`}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			whileHover={{
				y: -5,
				rotate: isMiddleCard ? 0 : 0.5, // Only rotate if not middle card
			}}
			viewport={{ once: true, margin: '-50px' }}
			transition={{
				delay: index * 0.1,
				type: 'spring',
				stiffness: 100,
				damping: 15,
			}}
			onMouseMove={handleMouseMove}
		>
			<div className='text-primary mb-4 p-3 bg-bg-alt rounded-full'>
				{feature.icon}
			</div>
			<h3 className='text-xl font-semibold text-text-base mb-3 text-center'>
				{feature.title}
			</h3>
			<p className='text-text-muted text-center'>{feature.description}</p>
		</motion.div>
	);
}

function CTASection() {
	return (
		<section className='py-20 bg-gradient-to-r from-primary to-primary-hover text-text-inverted'>
			<div className='container mx-auto px-4 text-center'>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<h2 className='text-2xl md:text-3xl font-display font-bold mb-6'>
						Ready to boost your sales?
					</h2>
					<p className='text-text-inverted/80 max-w-2xl mx-auto mb-8 text-lg'>
						Join thousands of businesses already using Nexcart Velocity to grow
						their online presence.
					</p>
					<Link
						href='/_auth/register'
						className='btn focus-ring bg-bg-base text-primary hover:bg-bg-alt inline-flex items-center gap-2'
					>
						<Bolt size={20} />
						Get Started Free
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

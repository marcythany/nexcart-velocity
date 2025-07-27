'use client';

import { MotionConfig } from 'motion/react';

export default function MotionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MotionConfig
			transition={{
				ease: [0.32, 0.72, 0, 1],
				duration: 0.35,
			}}
		>
			{children}
		</MotionConfig>
	);
}

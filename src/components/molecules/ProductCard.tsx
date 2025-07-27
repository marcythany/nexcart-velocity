import { motion } from 'framer-motion';
import { Typography } from '../atoms/Typography';

export const ProductCard = () => (
	<motion.div
		className='card overflow-hidden organic-shape hover-scale'
		whileHover={{ y: -5 }}
		transition={{ type: 'spring', damping: 15 }}
	>
		<div className='bg-bg-alt p-6'>
			<div className='bg-gray-200 border-2 border-dashed rounded-organic w-full h-64' />
		</div>
		<div className='p-6'>
			<Typography variant='h3' className='mb-2'>
				Organic Cotton Shirt
			</Typography>
			<p className='text-text-muted mb-4'>
				Sustainable fabric with natural dye
			</p>
			<div className='flex justify-between items-center'>
				<span className='font-bold text-lg'>$49.99</span>
				<button className='btn bg-primary text-text-inverted'>
					Add to Cart
				</button>
			</div>
		</div>
	</motion.div>
);

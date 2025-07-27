const config = {
	plugins: {
		'@tailwindcss/postcss': {
			importMap: {
				'motion/react': 'motion/react/dist/motion.es.js',
			},
		},
	},
};

export default config;

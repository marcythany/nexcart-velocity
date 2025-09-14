import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div className='space-y-4'>
						<h3 className='text-lg font-bold'>NexCart Velocity</h3>
						<p className='text-gray-300 text-sm leading-relaxed'>
							Your trusted partner for modern e-commerce solutions. Fast
							shipping, secure payments, and exceptional service.
						</p>
						<div className='flex space-x-4'>
							<Link
								href='https://facebook.com/nexcartvelocity'
								aria-label='Follow us on Facebook'
								className='text-gray-400 hover:text-white transition-colors'
							>
								<Facebook size={20} />
							</Link>
							<Link
								href='https://twitter.com/nexcartvelocity'
								aria-label='Follow us on Twitter'
								className='text-gray-400 hover:text-white transition-colors'
							>
								<Twitter size={20} />
							</Link>
							<Link
								href='https://instagram.com/nexcartvelocity'
								aria-label='Follow us on Instagram'
								className='text-gray-400 hover:text-white transition-colors'
							>
								<Instagram size={20} />
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider mb-4'>
							Quick Links
						</h4>
						<nav>
							<ul className='space-y-2'>
								<li>
									<Link
										href='/'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href='/products'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										Products
									</Link>
								</li>
								<li>
									<Link
										href='/categories'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										Categories
									</Link>
								</li>
								<li>
									<Link
										href='/about'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										About Us
									</Link>
								</li>
							</ul>
						</nav>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider mb-4'>
							Customer Service
						</h4>
						<nav>
							<ul className='space-y-2'>
								<li>
									<Link
										href='/contact'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										Contact Us
									</Link>
								</li>
								<li>
									<Link
										href='/shipping'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										Shipping Info
									</Link>
								</li>
								<li>
									<Link
										href='/returns'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										Returns & Exchanges
									</Link>
								</li>
								<li>
									<Link
										href='/faq'
										className='text-gray-300 hover:text-white transition-colors text-sm'
									>
										FAQ
									</Link>
								</li>
							</ul>
						</nav>
					</div>

					{/* Newsletter */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wider mb-4'>
							Stay Updated
						</h4>
						<p className='text-gray-300 text-sm mb-4'>
							Subscribe to our newsletter for the latest deals and updates.
						</p>
						<form className='space-y-2'>
							<label htmlFor='footer-email' className='sr-only'>
								Email address
							</label>
							<input
								id='footer-email'
								type='email'
								placeholder='Enter your email'
								className='w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
							/>
							<button
								type='submit'
								className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium'
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
					<p className='text-gray-400 text-sm'>
						© {new Date().getFullYear()} NexCart Velocity. All rights reserved.
					</p>
					<div className='flex space-x-6 mt-4 md:mt-0'>
						<Link
							href='/privacy'
							className='text-gray-400 hover:text-white transition-colors text-sm'
						>
							Privacy Policy
						</Link>
						<Link
							href='/terms'
							className='text-gray-400 hover:text-white transition-colors text-sm'
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

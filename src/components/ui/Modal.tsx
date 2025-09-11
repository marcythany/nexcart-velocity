import clsx from 'clsx';
import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	closeOnOverlayClick?: boolean;
	closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	size = 'md',
	closeOnOverlayClick = true,
	closeOnEscape = true,
}) => {
	React.useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeOnEscape) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose, closeOnEscape]);

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center'
			role='dialog'
			aria-modal='true'
		>
			{/* Backdrop */}
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={closeOnOverlayClick ? onClose : undefined}
				aria-hidden='true'
			/>

			{/* Modal Content */}
			<div
				className={clsx(
					'relative mx-4 max-h-[90vh] overflow-auto rounded-lg bg-bg-card p-6 shadow-xl',
					{
						'max-w-sm': size === 'sm',
						'max-w-md': size === 'md',
						'max-w-lg': size === 'lg',
						'max-w-xl': size === 'xl',
						'max-w-full max-h-full': size === 'full',
					}
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute right-4 top-4 rounded-sm p-1 text-text-secondary hover:bg-bg-alt hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary'
					aria-label='Close modal'
				>
					<X size={20} />
				</button>

				{/* Modal Content */}
				{children}
			</div>
		</div>
	);
};

interface ModalHeaderProps {
	children: React.ReactNode;
	className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => (
	<div className={clsx('mb-4', className)}>
		<h2 className='text-lg font-semibold text-text-primary'>{children}</h2>
	</div>
);

interface ModalBodyProps {
	children: React.ReactNode;
	className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
	<div className={clsx('mb-6', className)}>{children}</div>
);

interface ModalFooterProps {
	children: React.ReactNode;
	className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
	<div className={clsx('flex justify-end space-x-2', className)}>
		{children}
	</div>
);

export { Modal, ModalBody, ModalFooter, ModalHeader };
export default Modal;

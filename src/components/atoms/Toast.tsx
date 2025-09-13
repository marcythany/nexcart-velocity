import clsx from 'clsx';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
	id: string;
	type: ToastType;
	message: string;
	duration?: number;
	onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
	const icons = {
		success: CheckCircle,
		error: XCircle,
		warning: AlertCircle,
		info: Info,
	};

	const Icon = icons[type];

	const bgColors = {
		success: 'bg-success/10 border-success/20',
		error: 'bg-error/10 border-error/20',
		warning: 'bg-warning/10 border-warning/20',
		info: 'bg-primary/10 border-primary/20',
	};

	const textColors = {
		success: 'text-success',
		error: 'text-error',
		warning: 'text-warning',
		info: 'text-primary',
	};

	const iconColors = {
		success: 'text-success',
		error: 'text-error',
		warning: 'text-warning',
		info: 'text-primary',
	};

	return (
		<div
			className={clsx(
				'flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg animate-in slide-in-from-right-2 fade-in duration-300',
				bgColors[type]
			)}
			role='alert'
			aria-live='assertive'
		>
			<Icon size={20} className={iconColors[type]} />
			<p className={clsx('flex-1 text-sm font-medium', textColors[type])}>
				{message}
			</p>
			<button
				onClick={() => onClose(id)}
				className='p-1 rounded-md hover:bg-black/10 transition-colors'
				aria-label='Close notification'
			>
				<X size={16} className={textColors[type]} />
			</button>
		</div>
	);
};

interface ToastContainerProps {
	toasts: Array<{
		id: string;
		type: ToastType;
		message: string;
		duration?: number;
	}>;
	onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
	if (toasts.length === 0) return null;

	return (
		<div className='fixed top-4 right-4 z-50 space-y-2 max-w-sm'>
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					id={toast.id}
					type={toast.type}
					message={toast.message}
					duration={toast.duration}
					onClose={onClose}
				/>
			))}
		</div>
	);
};

export { Toast, ToastContainer };
export type { ToastType };

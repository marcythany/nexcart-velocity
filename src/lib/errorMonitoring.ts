// Simple logging functions - replace with Sentry when available
const captureException = (error: Error, options?: Record<string, unknown>) => {
	console.error('Error captured:', error, options);
};

const captureMessage = (message: string, options?: Record<string, unknown>) => {
	console.log('Message captured:', message, options);
};

const withScope = (
	callback: (scope: {
		setLevel: (level: string) => void;
		setTag: (key: string, value: string) => void;
		setUser: (user: { id: string }) => void;
	}) => void
) => {
	const mockScope = {
		setLevel: (level: string) => console.log('Scope level:', level),
		setTag: (key: string, value: string) =>
			console.log('Scope tag:', key, value),
		setUser: (user: { id: string }) => console.log('Scope user:', user),
	};
	callback(mockScope);
};

// Error types for better categorization
export enum ErrorType {
	GRAPHQL_ERROR = 'graphql_error',
	NETWORK_ERROR = 'network_error',
	VALIDATION_ERROR = 'validation_error',
	AUTHENTICATION_ERROR = 'authentication_error',
	PERMISSION_ERROR = 'permission_error',
	UNKNOWN_ERROR = 'unknown_error',
}

// Error severity levels
export enum ErrorSeverity {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	CRITICAL = 'critical',
}

// Structured error interface
export interface AppError {
	type: ErrorType;
	severity: ErrorSeverity;
	message: string;
	code?: string;
	stack?: string;
	context?: Record<string, unknown>;
	userId?: string;
	url?: string;
	userAgent?: string;
	timestamp: string;
}

// Error monitoring service
export class ErrorMonitoring {
	private static instance: ErrorMonitoring;
	private isInitialized = false;

	private constructor() {}

	static getInstance(): ErrorMonitoring {
		if (!ErrorMonitoring.instance) {
			ErrorMonitoring.instance = new ErrorMonitoring();
		}
		return ErrorMonitoring.instance;
	}

	// Initialize error monitoring (call this in _app.tsx or layout.tsx)
	initialize() {
		if (this.isInitialized) return;

		// Global error handler for unhandled errors
		window.addEventListener('error', (event) => {
			this.captureError({
				type: ErrorType.UNKNOWN_ERROR,
				severity: ErrorSeverity.HIGH,
				message: event.message,
				stack: event.error?.stack,
				context: {
					filename: event.filename,
					lineno: event.lineno,
					colno: event.colno,
				},
			});
		});

		// Global handler for unhandled promise rejections
		window.addEventListener('unhandledrejection', (event) => {
			this.captureError({
				type: ErrorType.UNKNOWN_ERROR,
				severity: ErrorSeverity.HIGH,
				message: event.reason?.message || 'Unhandled promise rejection',
				stack: event.reason?.stack,
				context: {
					reason: event.reason,
				},
			});
		});

		this.isInitialized = true;
	}

	// Capture and report errors
	captureError(error: Partial<AppError> & { message: string }) {
		const fullError: AppError = {
			type: error.type || ErrorType.UNKNOWN_ERROR,
			severity: error.severity || ErrorSeverity.MEDIUM,
			message: error.message,
			code: error.code,
			stack: error.stack,
			context: error.context || {},
			userId: error.userId,
			url: typeof window !== 'undefined' ? window.location.href : undefined,
			userAgent:
				typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
			timestamp: new Date().toISOString(),
		};

		// Log to console in development
		if (process.env.NODE_ENV === 'development') {
			console.error('Error captured:', fullError);
		}

		// Send to Sentry or other monitoring service
		withScope((scope) => {
			scope.setLevel(fullError.severity);
			scope.setTag('error_type', fullError.type);
			scope.setTag('severity', fullError.severity);

			if (fullError.userId) {
				scope.setUser({ id: fullError.userId });
			}

			if (fullError.context) {
				Object.entries(fullError.context).forEach(([key, value]) => {
					scope.setTag(key, String(value));
				});
			}

			if (fullError.code) {
				scope.setTag('error_code', fullError.code);
			}

			captureException(new Error(fullError.message), {
				tags: {
					error_type: fullError.type,
					severity: fullError.severity,
				},
				extra: {
					...fullError.context,
					stack: fullError.stack,
					url: fullError.url,
					userAgent: fullError.userAgent,
				},
			});
		});

		// Store error locally for debugging (last 10 errors)
		this.storeErrorLocally(fullError);
	}

	// Capture user actions and events
	captureEvent(event: string, properties?: Record<string, unknown>) {
		if (process.env.NODE_ENV === 'development') {
			console.log('Event captured:', event, properties);
		}

		captureMessage(`Event: ${event}`, {
			level: 'info',
			tags: {
				event_type: 'user_action',
			},
			extra: properties,
		});
	}

	// Handle GraphQL errors specifically
	handleGraphQLError(
		error: {
			message?: string;
			graphQLErrors?: unknown[];
			networkError?: unknown;
			operation?: { operationName?: string };
		},
		operation?: string
	) {
		const graphQLError = {
			type: ErrorType.GRAPHQL_ERROR,
			severity: ErrorSeverity.MEDIUM,
			message: error.message || 'GraphQL operation failed',
			context: {
				operation,
				graphQLErrors: error.graphQLErrors,
				networkError: error.networkError,
				operationName: error.operation?.operationName,
			},
		};

		this.captureError(graphQLError);
	}

	// Handle network errors
	handleNetworkError(
		error: {
			message?: string;
			status?: number;
			statusText?: string;
			url?: string;
		},
		context?: Record<string, unknown>
	) {
		const networkError = {
			type: ErrorType.NETWORK_ERROR,
			severity: ErrorSeverity.HIGH,
			message: error.message || 'Network request failed',
			context: {
				...context,
				status: error.status,
				statusText: error.statusText,
				url: error.url,
			},
		};

		this.captureError(networkError);
	}

	// Store errors locally for debugging
	private storeErrorLocally(error: AppError) {
		if (typeof window === 'undefined') return;

		try {
			const stored = localStorage.getItem('app_errors');
			const errors: AppError[] = stored ? JSON.parse(stored) : [];

			// Keep only last 10 errors
			errors.unshift(error);
			if (errors.length > 10) {
				errors.splice(10);
			}

			localStorage.setItem('app_errors', JSON.stringify(errors));
		} catch (e) {
			// Ignore localStorage errors
		}
	}

	// Get stored errors for debugging
	getStoredErrors(): AppError[] {
		if (typeof window === 'undefined') return [];

		try {
			const stored = localStorage.getItem('app_errors');
			return stored ? JSON.parse(stored) : [];
		} catch (e) {
			return [];
		}
	}

	// Clear stored errors
	clearStoredErrors() {
		if (typeof window === 'undefined') return;
		localStorage.removeItem('app_errors');
	}
}

// Export singleton instance
export const errorMonitoring = ErrorMonitoring.getInstance();

// Utility functions for common error patterns
export const logError = (error: Partial<AppError> & { message: string }) => {
	errorMonitoring.captureError(error);
};

export const logEvent = (
	event: string,
	properties?: Record<string, unknown>
) => {
	errorMonitoring.captureEvent(event, properties);
};

export const logGraphQLError = (
	error: {
		message?: string;
		graphQLErrors?: unknown[];
		networkError?: unknown;
		operation?: { operationName?: string };
	},
	operation?: string
) => {
	errorMonitoring.handleGraphQLError(error, operation);
};

export const logNetworkError = (
	error: {
		message?: string;
		status?: number;
		statusText?: string;
		url?: string;
	},
	context?: Record<string, unknown>
) => {
	errorMonitoring.handleNetworkError(error, context);
};

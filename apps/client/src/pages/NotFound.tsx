import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                    <p className="text-gray-500 mb-8">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                        Go to Terminal
                    </Link>

                    <div className="text-sm text-gray-500">
                        or{' '}
                        <Link
                            to="/dashboard"
                            className="text-indigo-600 hover:text-indigo-500 underline">
                            visit the dashboard
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-xs text-gray-400">
                    Error 404 - The requested page could not be found.
                </div>
            </div>
        </div>
    );
}


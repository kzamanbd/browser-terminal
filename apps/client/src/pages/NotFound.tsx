import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NotFound() {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'bash: command not found: page';

    useEffect(() => {
        let currentIndex = 0;
        const timer = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="w-full max-w-2xl">
                {/* Terminal Window */}
                <div className="rounded-t-lg border border-gray-700 bg-gray-800 shadow-2xl">
                    {/* Terminal Header */}
                    <div className="flex items-center rounded-t-lg border-b border-gray-600 bg-gray-700 px-4 py-3">
                        <div className="flex space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-sm font-medium text-gray-300">
                                Terminal - 404 Error
                            </span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 font-mono text-sm">
                        <div className="mb-2 text-green-400">
                            user@browser-terminal:~${' '}
                            <span className="text-white">cd /requested-page</span>
                        </div>
                        <div className="mb-4 text-red-400">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </div>

                        <div className="mb-6 text-yellow-400">
                            <div className="mb-2">Available commands:</div>
                            <div className="ml-4 space-y-1 text-gray-300">
                                <div>• cd /terminal - Navigate to terminal</div>
                                <div>• cd /dashboard - Access dashboard</div>
                                <div>• help - Show help information</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="rounded-b-lg border border-t-0 border-gray-700 bg-gray-900 p-6 text-center">
                    <div className="mb-6">
                        <h1 className="mb-3 animate-pulse text-5xl font-bold text-red-400">404</h1>
                        <h2 className="mb-2 text-xl font-semibold text-gray-200">Path Not Found</h2>
                        <p className="text-gray-400">
                            The requested resource does not exist in this directory.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/"
                            className="group relative inline-flex transform items-center rounded-md bg-green-400 px-6 py-3 font-mono text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                            <span className="mr-2">{'>'}</span>
                            Launch Terminal
                            <span className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
                                _
                            </span>
                        </Link>

                        <Link
                            to="/dashboard"
                            className="group relative inline-flex transform items-center rounded-md border border-blue-400 bg-gray-800 px-6 py-3 font-mono text-sm font-medium text-blue-400 transition-all duration-200 hover:scale-105 hover:bg-blue-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                            <span className="mr-2">{'>'}</span>
                            Access Dashboard
                        </Link>
                    </div>

                    {/* Terminal-style footer */}
                    <div className="mt-8 font-mono text-xs text-gray-500">
                        <div className="border-t border-gray-700 pt-4">
                            Exit status: 404 | Process terminated: Page not found
                        </div>
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-ping rounded-full bg-green-400 opacity-20"></div>
                    <div className="absolute right-1/4 top-3/4 h-1 w-1 animate-pulse rounded-full bg-blue-400 opacity-30"></div>
                    <div className="absolute left-3/4 top-1/2 h-1.5 w-1.5 animate-bounce rounded-full bg-yellow-400 opacity-25"></div>
                </div>
            </div>
        </div>
    );
}

import { Link, LinkProps } from 'react-router-dom';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
} & LinkProps) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-primary-400 text-primary-700 bg-primary-50 focus:text-primary-800 focus:bg-primary-100 focus:border-primary-700'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800'
            } focus:outline-hidden text-base font-medium transition duration-150 ease-in-out ${className}`}>
            {children}
        </Link>
    );
}

import { Link, LinkProps } from 'react-router-dom';

export default function NavLink({
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
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-primary-400 text-gray-900 focus:border-primary-700 '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }>
            {children}
        </Link>
    );
}


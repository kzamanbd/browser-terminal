import { Link, LinkProps } from 'react-router-dom';

export default function LayoutLink({
    active = false,
    className = '',
    children,
    ...props
}: LinkProps & { className?: string; active?: boolean }) {
    return (
        <Link
            {...props}
            className={
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 ' +
                (active ? 'text-indigo-600 dark:text-indigo-400' : '') +
                className
            }>
            {children}
        </Link>
    );
}

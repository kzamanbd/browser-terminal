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
                'group text-gray-600 dark:text-gray-400 group flex hover:text-indigo-600 hover:dark:text-indigo-400 items-center px-3 py-2 text-sm font-medium rounded-md ' +
                (active ? 'text-indigo-600 dark:text-indigo-400 ' : '') +
                className
            }>
            {children}
        </Link>
    );
}


import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
};

export default function Button({
    className = '',
    disabled,
    children,
    variant = 'light',
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`btn btn-${variant} h-max ${disabled && 'opacity-25'} ${className}`}
            disabled={disabled}>
            {children}
        </button>
    );
}


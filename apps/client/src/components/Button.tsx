import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
};

export default function Button({
    className = 'btn-light',
    disabled,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`btn h-max ${disabled && 'opacity-25'} ${className}`}
            disabled={disabled}>
            {children}
        </button>
    );
}

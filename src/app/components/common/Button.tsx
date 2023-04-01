import { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

const Button = ({ disabled, children, className, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`border border-gray-200 hover:bg-gray-100 w-fit h-10 px-4 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  buttonStyle?: "primary" | "accent";
}

const Button = ({ disabled, children, buttonStyle, className, ...props }: ButtonProps) => {
  let style;

  switch (buttonStyle) {
    case "primary":
      style =
        "border border-gray-200 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed";
      break;

    case "accent":
      style =
        "bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60 disabled:cursor-not-allowed";
      break;

    default:
      style = "border border-gray-200 hover:bg-gray-100";
      break;
  }
  return (
    <button
      disabled={disabled}
      className={`w-fit h-10 px-4 transition-colors cursor rounded-lg ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

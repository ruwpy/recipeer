import { ReactNode } from "react";

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Main = ({ children, className, ...props }: MainProps) => {
  return (
    <div
      className={`relative px-4 max-w-7xl mx-auto mt-36 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Main;

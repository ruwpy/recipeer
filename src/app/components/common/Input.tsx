interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  children: string;
  max?: number;
}

const Input = ({ inputValue, setInputValue, children, max, ...props }: InputProps) => {
  return (
    <div className="relative w-full pt-4">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full"
        name={children}
        type="text"
        maxLength={max || 512}
        {...props}
      />
      <label className="absolute left-1 -top-1 text-xs opacity-80" htmlFor={children}>
        {children}
      </label>
    </div>
  );
};

export default Input;

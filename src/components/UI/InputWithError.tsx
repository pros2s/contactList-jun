import { ErrorMessage } from 'formik';
import { FC } from 'react';


interface InputProps {
  name: string;
  type: string;
  maxLength?: number;
  placeholder?: string;
  value?: string | number;
  className?: string;
  pattern?: string;
  min?: string;
  max?: string;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

const InputWithError: FC<InputProps> = ({
  name,
  type,
  maxLength,
  placeholder,
  value,
  min,
  max,
  className,
  pattern,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        maxLength={maxLength}
        type={type}
        min={min}
        max={max}
        name={name}
        pattern={pattern}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage component='p' name={name} data-testid={name} />
    </div>
  );
};


export default InputWithError;

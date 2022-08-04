import { ErrorMessage } from 'formik';
import { FC } from 'react';


interface InputProps {
  name: string;
  type: string;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  }
}

const InputWithError: FC<InputProps> = ({ name, type, maxLength, placeholder, value, className, onChange }) => {
  return (
    <div className={className}>
      <input
        maxLength={maxLength}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage component='div' name={name} />
    </div>
  );
};


export default InputWithError;

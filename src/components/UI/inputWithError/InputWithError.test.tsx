import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import InputWithError from './InputWithError';


const inputAttributes = {
  name: 'test name',
  type: 'test type',
  max: '200',
  maxLength: 50,
  min: '0',
  pattern: 'test pattern',
  placeholder: 'test placeholder',
  value: 'test value',
};

const { name, type, max, maxLength, min, pattern, placeholder, value } = inputAttributes;


describe('input with error', () => {
  it('input with error is inside the DOM', () => {
    render(
      <Formik initialValues={{ name }} onSubmit={jest.fn()}>
        <InputWithError
          name={name}
          type={type}
          max={max}
          maxLength={maxLength}
          min={min}
          pattern={pattern}
          placeholder={placeholder}
          value={value}
        />
      </Formik>,
    );
    expect(screen.getByTestId('inputWithError')).toBeInTheDocument();
  });

  it('input is inside the DOM', () => {
    render(
      <Formik initialValues={{ name }} onSubmit={jest.fn()}>
        <InputWithError
          name={name}
          type={type}
          max={max}
          maxLength={maxLength}
          min={min}
          pattern={pattern}
          placeholder={placeholder}
          value={value}
        />
      </Formik>,
    );
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('input attributes are inside the DOM', () => {
    render(
      <Formik initialValues={{ name }} onSubmit={jest.fn()}>
        <InputWithError
          name={name}
          type={type}
          max={max}
          maxLength={maxLength}
          min={min}
          pattern={pattern}
          placeholder={placeholder}
          value={value}
        />
      </Formik>,
    );
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('name', name);
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('type', type);
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('max', max);
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute(
      'maxLength',
      maxLength.toString(),
    );
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('min', min);
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('pattern', pattern);
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('value', value);
  });
});

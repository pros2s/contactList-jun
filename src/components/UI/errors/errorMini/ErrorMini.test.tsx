import { render, screen } from '@testing-library/react';
import ErrorMini from './ErrorMini';
import errorMini from '../../../../assets/errorMini.png';

const errorMiniMessage = 'error mini test message';

describe('mini error', () => {
  it('mini error is inside the DOM', () => {
    render(<ErrorMini message={errorMiniMessage} />);
    expect(screen.getByTestId('errorMini')).toBeInTheDocument();
  });

  it('mini error info is inside the DOM', () => {
    render(<ErrorMini message={errorMiniMessage} />);
    expect(screen.getByAltText(/error message/i)).toBeInTheDocument();
    expect(screen.getByAltText(/error message/i)).toHaveAttribute('src', errorMini);
    expect(screen.getByText(errorMiniMessage)).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../../testHelpers/renderWithRouter';
import Error from './Error';
import error from '../../../../assets/error.png';

const errorMessage = 'test error message';

describe('error', () => {
  it('error page is inside the DOM', () => {
    renderWithRouter(<Error message={errorMessage}/>);
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('error info is inside the DOM', () => {
    renderWithRouter(<Error message={errorMessage}/>);
    expect(screen.getByAltText(/error message/i)).toBeInTheDocument();
    expect(screen.getByAltText(/error message/i)).toHaveAttribute('src', error);
    expect(screen.getByRole('heading', { level: 1, name: errorMessage })).toBeInTheDocument();
    expect(screen.getByTestId('errorGoBack')).toBeInTheDocument();
    expect(screen.getByText(/You can go back to login page/i)).toBeInTheDocument();
    expect(screen.getByTestId('errorGoBackSVG')).toBeInTheDocument();
  })
});

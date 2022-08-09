import { render, screen } from '@testing-library/react';
import Loader from './Loader';


const loaderInfo = 'test loader info';
const width = '20';

describe('loader', () => {
  it('loader is inside the DOM', () => {
    render(<Loader info={loaderInfo} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('loader info is inside the DOM', () => {
    render(<Loader info={loaderInfo} width={width} />);
    expect(screen.getByTestId('rotating-lines-svg')).toBeInTheDocument();
    expect(screen.getByTestId('rotating-lines-svg')).toHaveAttribute('width', '20');
    expect(screen.getByRole('heading', { level: 3, name: `${loaderInfo}...` })).toBeInTheDocument();
  });
});

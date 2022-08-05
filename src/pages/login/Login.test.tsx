import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from '../../testHelpers/renderWithRouterAndProviders';
import Login from './Login';


describe('Login', () => {
  it('title inside the DOM', () => {
    renderWithRouterAndProviders(<Login />);
    expect(screen.getByRole('heading', { level: 1, name: /log in/i })).toBeInTheDocument();
  });

  describe('email input', () => {
    it('inside the DOM', () => {
      renderWithRouterAndProviders(<Login />);
      expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    });

    it('change value', async () => {
      renderWithRouterAndProviders(<Login />);

      const emailInput = screen.getByPlaceholderText(/your email/i);
      expect(emailInput).toHaveValue('');
      await userEvent.type(emailInput, 'testEmail@smth.ru');
      expect(emailInput).toHaveValue('testEmail@smth.ru');
    });

    it('validate', async () => {
      renderWithRouterAndProviders(<Login />);
      const emailInput = screen.getByPlaceholderText(/your email/i);
      const submitButton = screen.getByRole('button', { name: /let's go/i });

      expect(screen.queryByTestId('emailInput')).not.toBeInTheDocument();
      await userEvent.type(emailInput, 'd{backspace}');
      await userEvent.click(submitButton);
      expect(screen.getByTestId('emailInput')).toBeInTheDocument();
      expect(screen.getByTestId('emailInput')).toContainHTML('Not required');

      await userEvent.type(emailInput, 'someemail');
      await userEvent.click(submitButton);
      expect(screen.getByTestId('emailInput')).toBeInTheDocument();
      expect(screen.getByTestId('emailInput')).toContainHTML('Not valid email adress');

      await userEvent.type(emailInput, 'someemail@mail.ru');
      await userEvent.click(submitButton);
      expect(screen.queryByTestId('emailInput')).not.toBeInTheDocument();
    });
  });

  describe('password input', () => {
    it('inside the DOM', () => {
      renderWithRouterAndProviders(<Login />);
      expect(screen.getByPlaceholderText(/your password/i)).toBeInTheDocument();
    });

    it('change value', async () => {
      renderWithRouterAndProviders(<Login />);

      const passwordInput = screen.getByPlaceholderText(/your password/i);
      expect(passwordInput).toHaveValue('');
      await userEvent.type(passwordInput, 'somepassword');
      expect(passwordInput).toHaveValue('somepassword');
    });

    it('validate', async () => {
      renderWithRouterAndProviders(<Login />);
      const passwordInput = screen.getByPlaceholderText(/your password/i);
      const submitButton = screen.getByRole('button', { name: /let's go/i });

      expect(screen.queryByTestId('passwordInput')).not.toBeInTheDocument();
      await userEvent.type(passwordInput, 'd{backspace}');
      await userEvent.click(submitButton);
      expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
      expect(screen.getByTestId('passwordInput')).toContainHTML('Not required');

      await userEvent.type(passwordInput, 'som');
      await userEvent.click(submitButton);
      expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
      expect(screen.getByTestId('passwordInput')).toContainHTML('Minimum 4 symbols');

      await userEvent.type(passwordInput, 'somepassword');
      await userEvent.click(submitButton);
      expect(screen.queryByTestId('passwordInput')).not.toBeInTheDocument();
    });
  });

  it('button inside the DOM', () => {
    renderWithRouterAndProviders(<Login />);
    expect(screen.getByRole('button', { name: /let's go/i })).toBeInTheDocument();
  });

  // it('reset inputs value', async () => {
  //   renderWithRouterAndProviders(<Login />);

  //   await userEvent.type(screen.getByPlaceholderText(/your email/i), 'lksdjfl@ldsfk.ru');
  //   await userEvent.type(screen.getByPlaceholderText(/your password/i), 'somepassword');
  //   await userEvent.click(screen.getByRole('button', { name: /let's go/i }));

  //   expect(screen.getByPlaceholderText(/your email/i)).toHaveValue('');
  //   expect(screen.getByPlaceholderText(/your password/i)).toHaveValue('');
  // })
});

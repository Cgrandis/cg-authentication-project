import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('LoginForm', () => {
  const mockSignIn = signIn as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockSignIn.mockClear();
    mockPush.mockClear();
    global.alert = jest.fn();
  });

  it('renders email and password inputs', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields on submit', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    });
  });

  it('calls signIn and redirects on successful login', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', expect.any(Object));
      expect(mockPush).toHaveBeenCalledWith('/auth/redirect-by-role');
    });
  });

  it('shows an alert on failed login', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: false, error: 'Credenciais inválidas' });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Credenciais inválidas');
    });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('calls Google signIn on Google button click', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /entrar com google/i }));
    expect(mockSignIn).toHaveBeenCalledWith('google', { callbackUrl: '/auth/redirect-by-role' });
  });
});
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './useLoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('useLoginForm', () => {
  const mockSignIn = signIn as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    mockUseRouter.mockReturnValue({ push: pushMock });
    mockSignIn.mockClear();
    pushMock.mockClear();
    global.alert = jest.fn();
  });

  it('should initialize with default values and no errors', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.loading).toBe(false);
    expect(result.current.errors.email).toBeUndefined();
    expect(result.current.errors.password).toBeUndefined();
  });

  it('should set loading to true and then false after onSubmit', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({ email: 'test@example.com', password: 'password123' });
    });

    expect(result.current.loading).toBe(false);
  });

  it('should call signIn with correct credentials and redirect on success', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

    const { result } = renderHook(() => useLoginForm('/dashboard'));

    await act(async () => {
      await result.current.onSubmit({ email: 'test@example.com', password: 'password123' });
    });

    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: 'test@example.com',
      password: 'password123',
    });
    expect(pushMock).toHaveBeenCalledWith('/auth/redirect-by-role');
  });

  it('should show an alert and not redirect on failed login', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: false, error: 'Invalid credentials' });

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({ email: 'wrong@example.com', password: 'wrongpassword' });
    });

    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith('Invalid credentials');
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('should call handleGoogleLogin and redirect to /auth/redirect-by-role', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(() => {
      result.current.handleGoogleLogin();
    });

    expect(mockSignIn).toHaveBeenCalledWith('google', {
      callbackUrl: '/auth/redirect-by-role',
    });
  });
});
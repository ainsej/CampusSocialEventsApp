import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

function AuthConsumer() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="user">{user ?? 'no-user'}</span>
      <button onClick={() => login('kennedy')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  it('throws when useAuth is used outside the provider', () => {
    expect(() => render(<AuthConsumer />)).toThrow(
      'useAuth must be used within AuthProvider'
    );
  });

  it('starts with no user, logs in, and logs out', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('no-user');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByTestId('user')).toHaveTextContent('kennedy');

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });
});

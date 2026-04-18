import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@/components/Providers';

jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: any) => <div data-testid="session-provider">{children}</div>
}));

describe('Providers', () => {
  it('renders children inside SessionProvider', () => {
    const { getByText } = render(<Providers>Test Child</Providers>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});

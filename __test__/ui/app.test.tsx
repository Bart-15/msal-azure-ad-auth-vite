import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App component testing suite', () => {
  render(<App />);

  it('should app component render properly', () => {
    const actual = screen.getByRole('heading', {
      name: /Azure AD Auth Integration/i,
    });

    expect(actual).toBeInTheDocument();
  });
});

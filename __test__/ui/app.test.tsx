import { loginRequest } from '@/auth/auth.config';

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import App from '../../src/App';

const mockInstance = {
  getActiveAccount: jest.fn(),
  loginRedirect: jest.fn(),
  logoutRedirect: jest.fn(),
};

jest.mock('@azure/msal-react', () => ({
  useMsal: () => ({ instance: mockInstance }),
}));

describe('App component testing suite', () => {
  it('should app component render properly', () => {
    render(<App />);
    const actual = screen.getByRole('heading', {
      name: /Azure AD Auth Integration/i,
    });

    expect(actual).toBeInTheDocument();
  });

  describe('User is unauthenticated', () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    it('should display correct text for button, paragraph and correct image', () => {
      mockInstance.getActiveAccount.mockReturnValue(null);
      const { getByRole, getByText, getByAltText } = render(<App />);

      const btnActual = getByRole('button', {
        name: /Login/i,
      });

      const textActual = getByText('Hey there! 🌟 Please log in first :(');
      const imgActual = getByAltText('sad_cat');

      expect(btnActual).toBeInTheDocument();
      expect(textActual).toBeInTheDocument();
      expect(imgActual).toBeInTheDocument();
      expect(imgActual).toHaveAttribute('alt', 'sad_cat');

      console.log(mockInstance.getActiveAccount);

      expect(mockInstance.getActiveAccount()).toEqual(null);
    });

    it('should trigger loginRedirect on login button click', async () => {
      mockInstance.loginRedirect.mockResolvedValueOnce({
        ...loginRequest,
        prompt: 'create',
      });
      const { getByRole } = render(<App />);

      const actualBtn = getByRole('button', {
        name: 'Login',
      });

      fireEvent.click(actualBtn);

      expect(mockInstance.loginRedirect).toHaveBeenCalled();
    });
  });

  describe('User authenticated', () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    //----Reload page mock---////
    const { reload } = window.location;
    const reloadFn = () => {
      window.location.reload();
    };

    beforeAll(() => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { reload: jest.fn() },
      });
    });

    afterAll(() => {
      window.location.reload = reload;
    });
    //----End Reload page mock---////

    const authUser = {
      name: 'Bart Tabusao',
    };

    it('should display correct text for button, paragraph and correct image', async () => {
      mockInstance.getActiveAccount.mockReturnValue(authUser);

      const { getByRole, getByText, getByAltText } = render(<App />);

      const btnActual = getByRole('button', {
        name: /Logout/i,
      });

      fireEvent.click(btnActual);

      const textActual = getByText(
        'Welcome back! 🎉 You’re all set and authenticated. Let’s get started!'
      );
      const imgActual = getByAltText('happy_cat');

      await waitFor(() => {
        expect(btnActual).toBeInTheDocument();
        expect(textActual).toBeInTheDocument();
        expect(imgActual).toBeInTheDocument();
        expect(imgActual).toHaveAttribute('alt', 'happy_cat');

        console.log(mockInstance.getActiveAccount());

        expect(mockInstance.getActiveAccount()).toEqual(authUser);
      });
    });

    it('should trigger logoutRedirect and page reload on logout button click', async () => {
      mockInstance.logoutRedirect.mockResolvedValueOnce({
        postLogoutRedirectUri: '/',
      });
      const { getByRole } = render(<App />);

      const actualBtn = getByRole('button', {
        name: 'Logout',
      });

      fireEvent.click(actualBtn);

      expect(mockInstance.logoutRedirect).toHaveBeenCalled();

      //Listen on page reload;
      reloadFn();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});

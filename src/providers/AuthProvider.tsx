import {
  AuthenticationResult,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from 'src/auth/auth.config';

type AuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProvider) => {
  const msalInstance = new PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // Optional - This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    const authenticationResult = event.payload as AuthenticationResult;
    const account = authenticationResult?.account;

    if (event.eventType === EventType.LOGIN_SUCCESS && account) {
      msalInstance.setActiveAccount(account);
    }
  });

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default AuthProvider;

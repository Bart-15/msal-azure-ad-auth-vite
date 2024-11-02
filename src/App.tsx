import { SecondaryBtn } from '@/components/Button';
import CatImage from '@/components/CatImage';
import { useMsal } from '@azure/msal-react';

import './App.css';
import { loginRequest } from './auth/auth.config';

function App() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  function handleLoginRedirect() {
    instance.loginRedirect({
      ...loginRequest,
      prompt: 'create',
    });
  }

  function handleLogoutRedirect() {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
    window.location.reload();
  }

  return (
    <>
      <h1 className="text-5xl font-bold mb-10">Azure AD Auth Integration</h1>
      <div className="flex flex-col justify-center items-center gap-3">
        <CatImage isAuth={activeAccount === null ? false : true} />
        <p>
          {activeAccount
            ? 'Welcome back! 🎉 You’re all set and authenticated. Let’s get started!'
            : 'Hey there! 🌟 Please log in first :('}
        </p>

        {activeAccount ? (
          <SecondaryBtn onClick={handleLogoutRedirect}>Logout</SecondaryBtn>
        ) : (
          <SecondaryBtn onClick={handleLoginRedirect}>Login</SecondaryBtn>
        )}
      </div>
    </>
  );
}

export default App;

import { AuthProvider } from './AuthProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;

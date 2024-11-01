import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuthState';
import { PageLoadingState } from '@/components/loading/PageLoadingState';

interface AuthCheckProps {
  children: React.ReactNode;
}

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const { isAuthenticated, isLoading } = useAuthState();
  const location = useLocation();

  if (isLoading) {
    return <PageLoadingState />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
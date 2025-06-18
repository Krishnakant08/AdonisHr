import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import type { JSX } from 'react/jsx-runtime';

interface ProtectedRouteProps {
    children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const email = useUserStore((state) => state.email);

    if (!email) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;

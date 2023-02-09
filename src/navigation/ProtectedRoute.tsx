import * as React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useLocalStorage } from '../applicationState/hooks';
import { makeRoutes } from './routes';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
    const [jwt, _] = useLocalStorage('accessToken');
    const routes = makeRoutes();

    if (!jwt) {
        return (
            <Navigate to={routes.Root} replace />
        )
    }

    return (
        <Route {...props}/>
    );
};

export default ProtectedRoute;

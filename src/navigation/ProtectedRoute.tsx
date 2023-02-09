import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
    // const userProfile = useAppState(state => state.profile);
    // const routes = makeRoutes();

    // if (!userProfile) {
    //     return <Navigate to={routes.Login} replace />
    // }

    return (
        <Route {...props}/>
    );
};

export default ProtectedRoute;

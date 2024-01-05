import { Navigate, Route, RouteProps, Routes } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

type PrivateRouteProps = {
    roles?: string[];
} & RouteProps;

const PrivateRoute = ({
    children
}: any) => {
    const { hasRole, userInfo } = useAuth();



    console.log("PrivateRouteProps", userInfo);

    if (userInfo) {
        // if (!hasRole(roles)) {
        //     return <Navigate to={`/${process.env.PUBLIC_URL}/403`} />;
        // }
        // return <Route {...routeProps} />;
        return children;

    } else {
        return <Navigate to="/auth/sign-in" />;
    }
};

export default PrivateRoute;

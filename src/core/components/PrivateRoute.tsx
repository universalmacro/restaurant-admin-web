import { Navigate, Route, RouteProps, Routes } from "react-router";
// import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from 'react-redux';

type PrivateRouteProps = {
    roles?: string[];
} & RouteProps;

const PrivateRoute = ({
    children
}: any) => {
    // const { hasRole, userInfo } = useAuth();
    const { userToken } = useSelector((state: any) => state.auth) || {};


    if (userToken) {
        console.log("PrivateRouteProps", userToken);

        return children;

    } else {
        return <Navigate to="/auth/sign-in" />;
    }
};

export default PrivateRoute;
